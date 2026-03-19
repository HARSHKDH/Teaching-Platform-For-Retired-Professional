from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MoodCheck, PsychologistSession


@api_view(['POST'])
def log_mood(request):
    score = request.data.get('mood_score')
    notes = request.data.get('notes', '')
    if not score or not (1 <= int(score) <= 5):
        return Response({'error': 'mood_score must be 1-5'}, status=400)
    mood = MoodCheck.objects.create(student=request.user, mood_score=score, notes=notes)
    return Response({'id': mood.id, 'mood_score': mood.mood_score, 'timestamp': mood.timestamp})


@api_view(['GET'])
def mood_history(request):
    moods = MoodCheck.objects.filter(student=request.user)[:30]
    data = [{'mood_score': m.mood_score, 'notes': m.notes, 'timestamp': m.timestamp} for m in moods]
    return Response(data)


@api_view(['POST'])
def book_session(request):
    scheduled_time = request.data.get('scheduled_time')
    is_anon = request.data.get('is_anonymous', False)
    if not scheduled_time:
        return Response({'error': 'scheduled_time required'}, status=400)
    session = PsychologistSession.objects.create(
        student=request.user,
        scheduled_time=scheduled_time,
        is_anonymous=is_anon
    )
    return Response({'id': session.id, 'status': session.status, 'scheduled_time': session.scheduled_time})
