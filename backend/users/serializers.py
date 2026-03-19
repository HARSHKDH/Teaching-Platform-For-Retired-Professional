from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'full_name', 'user_type',
                  'bio', 'phone', 'location', 'linkedin_url', 'profile_picture',
                  'years_experience', 'last_organization', 'education', 'expertise_areas',
                  'verification_status', 'badge_level', 'karma_points',
                  'goals', 'interests', 'education_level', 'date_joined']
        read_only_fields = ['id', 'date_joined', 'verification_status', 'karma_points']

    def get_full_name(self, obj):
        return obj.get_full_name()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'confirm_password',
                  'user_type', 'phone', 'bio', 'years_experience', 'last_organization',
                  'education', 'expertise_areas', 'goals', 'interests', 'education_level', 'location']

    def validate(self, data):
        if data['password'] != data.pop('confirm_password'):
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match'})
        if data.get('user_type') == 'mentor':
            if not data.get('years_experience'):
                raise serializers.ValidationError({'years_experience': 'Required for mentors'})
            if not data.get('education'):
                raise serializers.ValidationError({'education': 'Required for mentors'})
        return data

    def create(self, validated_data):
        user_type = validated_data.get('user_type', 'student')
        password = validated_data.pop('password')
        # Mentors require verification
        if user_type == 'mentor':
            validated_data['verification_status'] = 'pending'
        else:
            validated_data['verification_status'] = 'approved'
        # Auto-generate username from email
        email = validated_data['email']
        validated_data['username'] = email.split('@')[0] + str(User.objects.count())
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_type'] = user.user_type
        token['verification_status'] = user.verification_status
        token['full_name'] = user.get_full_name()
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['user'] = UserSerializer(user).data
        return data


class MentorListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for mentor listing."""
    rating = serializers.SerializerMethodField()
    student_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'bio', 'profile_picture',
                  'years_experience', 'last_organization', 'expertise_areas',
                  'badge_level', 'karma_points', 'rating', 'student_count', 'location']

    def get_rating(self, obj):
        reviews = []
        for batch in obj.batches.all():
            reviews.extend(batch.reviews.values_list('rating', flat=True))
        return round(sum(reviews) / len(reviews), 1) if reviews else None

    def get_student_count(self, obj):
        return sum(b.enrolled_count for b in obj.batches.all())
