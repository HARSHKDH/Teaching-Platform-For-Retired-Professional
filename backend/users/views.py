from django.contrib.auth import get_user_model
from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, UserSerializer, CustomTokenObtainPairSerializer, MentorListSerializer
from .models import VerificationDocument

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'message': 'Registration successful',
            'user': UserSerializer(user).data,
        }, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PATCH'])
def profile_view(request):
    if request.method == 'GET':
        return Response(UserSerializer(request.user).data)
    serializer = UserSerializer(request.user, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


class MentorListView(generics.ListAPIView):
    serializer_class = MentorListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = User.objects.filter(user_type='mentor', verification_status='approved')
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        if category and category != 'All':
            qs = qs.filter(expertise_areas__contains=category)
        if search:
            qs = qs.filter(first_name__icontains=search) | qs.filter(last_name__icontains=search) | qs.filter(bio__icontains=search)
        return qs


class MentorDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return User.objects.filter(user_type='mentor', verification_status='approved')

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def recommended_mentors(request):
    user = request.user
    if user.user_type != 'student':
        return Response([])

    interests = set(user.interests) if user.interests else set()
    goals = user.goals.lower() if user.goals else ''

    mentors = User.objects.filter(user_type='mentor', verification_status='approved')
    scored_mentors = []

    for m in mentors:
        score = 0
        mentor_expertise = set(m.expertise_areas) if m.expertise_areas else set()
        
        # Match interests to expertise
        common = interests.intersection(mentor_expertise)
        score += len(common) * 2
        
        # Keyword matching in bio and goals
        if m.bio:
            bio_lower = m.bio.lower()
            if any(term in bio_lower for term in goals.split() if len(term) > 3):
                score += 1
                
        scored_mentors.append((score, m))

    scored_mentors.sort(key=lambda x: x[0], reverse=True)
    top_mentors = [m for s, m in scored_mentors][:3]
    
    return Response(MentorListSerializer(top_mentors, many=True).data)

# Admin views
@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def pending_mentors(request):
    mentors = User.objects.filter(user_type='mentor', verification_status='pending')
    data = []
    for m in mentors:
        docs = VerificationDocument.objects.filter(mentor=m)
        data.append({
            'id': m.id,
            'name': m.get_full_name(),
            'email': m.email,
            'expertise_areas': m.expertise_areas,
            'years_experience': m.years_experience,
            'last_organization': m.last_organization,
            'education': m.education,
            'verification_status': m.verification_status,
            'date_joined': m.date_joined,
            'docs': [{'type': d.document_type, 'filename': d.original_filename} for d in docs],
        })
    return Response(data)


@api_view(['POST'])
@permission_classes([permissions.IsAdminUser])
def approve_mentor(request, pk):
    try:
        mentor = User.objects.get(pk=pk, user_type='mentor')
        mentor.verification_status = 'approved'
        mentor.badge_level = 'Bronze Sage'
        mentor.save()
        return Response({'message': f'{mentor.get_full_name()} approved successfully'})
    except User.DoesNotExist:
        return Response({'error': 'Mentor not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([permissions.IsAdminUser])
def reject_mentor(request, pk):
    try:
        mentor = User.objects.get(pk=pk, user_type='mentor')
        mentor.verification_status = 'rejected'
        mentor.save()
        return Response({'message': f'{mentor.get_full_name()} rejected'})
    except User.DoesNotExist:
        return Response({'error': 'Mentor not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def platform_stats(request):
    return Response({
        'total_users': User.objects.count(),
        'total_students': User.objects.filter(user_type='student').count(),
        'total_mentors': User.objects.filter(user_type='mentor', verification_status='approved').count(),
        'pending_mentors': User.objects.filter(user_type='mentor', verification_status='pending').count(),
    })
