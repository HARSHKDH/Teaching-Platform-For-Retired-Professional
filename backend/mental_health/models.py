from django.db import models
from django.conf import settings


class MoodCheck(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='mood_checks')
    mood_score = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    notes = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.student.get_full_name()} - Mood {self.mood_score}"


class PsychologistSession(models.Model):
    STATUS = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='psych_sessions_as_student')
    psychologist = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='psych_sessions_as_psychologist')
    scheduled_time = models.DateTimeField()
    is_anonymous = models.BooleanField(default=False)
    session_notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS, default='scheduled')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        name = "Anonymous" if self.is_anonymous else self.student.get_full_name()
        return f"Session: {name} at {self.scheduled_time}"


class VentRoomMessage(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    is_anonymous = models.BooleanField(default=True)
    is_moderated = models.BooleanField(default=False)
    ai_flagged = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
