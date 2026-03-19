from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import LegacyProject, ProjectSubmission


@api_view(['GET'])
@permission_classes([AllowAny])
def list_projects(request):
    projects = LegacyProject.objects.filter(is_active=True).select_related('mentor')
    data = [{
        'id': p.id,
        'title': p.title,
        'description': p.description,
        'difficulty_level': p.difficulty_level,
        'category': p.category,
        'mentor': p.mentor.get_full_name(),
        'deadline': p.deadline,
        'submission_count': p.submissions.count(),
    } for p in projects]
    return Response(data)


@api_view(['GET'])
@permission_classes([AllowAny])
def project_detail(request, pk):
    try:
        p = LegacyProject.objects.get(pk=pk)
        return Response({
            'id': p.id, 'title': p.title, 'description': p.description,
            'problem_statement': p.problem_statement, 'industry_context': p.industry_context,
            'difficulty_level': p.difficulty_level, 'category': p.category,
            'mentor': p.mentor.get_full_name(),
        })
    except LegacyProject.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)


@api_view(['POST'])
def submit_project(request, pk):
    try:
        project = LegacyProject.objects.get(pk=pk)
    except LegacyProject.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)
    sub, created = ProjectSubmission.objects.get_or_create(
        project=project, student=request.user,
        defaults={'description': request.data.get('description', ''), 'submission_url': request.data.get('submission_url', '')}
    )
    if not created:
        return Response({'error': 'Already submitted'}, status=400)
    return Response({'id': sub.id, 'message': 'Submitted! Mentor will review shortly.'}, status=201)
