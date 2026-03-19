from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Batch, Content, Enrollment, Progress

User = get_user_model()


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = ['id', 'title', 'description', 'video_url', 'order', 'duration_minutes', 'is_preview']


class BatchSerializer(serializers.ModelSerializer):
    mentor_name = serializers.SerializerMethodField()
    mentor_badge = serializers.SerializerMethodField()
    enrolled_count = serializers.ReadOnlyField()
    average_rating = serializers.ReadOnlyField()

    class Meta:
        model = Batch
        fields = ['id', 'title', 'description', 'category', 'price', 'start_date',
                  'duration_weeks', 'max_students', 'is_published', 'thumbnail',
                  'mentor_name', 'mentor_badge', 'enrolled_count', 'average_rating', 'created_at']

    def get_mentor_name(self, obj):
        return obj.mentor.get_full_name()

    def get_mentor_badge(self, obj):
        return obj.mentor.badge_level


class BatchDetailSerializer(BatchSerializer):
    contents = ContentSerializer(many=True, read_only=True)

    class Meta(BatchSerializer.Meta):
        fields = BatchSerializer.Meta.fields + ['contents']


class EnrollmentSerializer(serializers.ModelSerializer):
    batch_title = serializers.SerializerMethodField()
    batch_category = serializers.SerializerMethodField()

    class Meta:
        model = Enrollment
        fields = ['id', 'batch', 'batch_title', 'batch_category', 'payment_status',
                  'enrolled_at', 'completion_percentage', 'certificate_issued']
        read_only_fields = ['id', 'enrolled_at', 'completion_percentage', 'certificate_issued']

    def get_batch_title(self, obj):
        return obj.batch.title

    def get_batch_category(self, obj):
        return obj.batch.category
