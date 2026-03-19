from django.db import models
from django.conf import settings


class LegacyProject(models.Model):
    DIFFICULTY = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    mentor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='legacy_projects')
    title = models.CharField(max_length=200)
    description = models.TextField()
    problem_statement = models.TextField()
    industry_context = models.TextField(blank=True)
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY)
    category = models.CharField(max_length=50)
    deadline = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class ProjectSubmission(models.Model):
    project = models.ForeignKey(LegacyProject, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='project_submissions')
    submission_url = models.URLField(blank=True)
    description = models.TextField()
    mentor_review = models.TextField(blank=True)
    rating = models.IntegerField(null=True, blank=True, choices=[(i, i) for i in range(1, 6)])
    certificate_issued = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ['project', 'student']


class StudentTutorial(models.Model):
    """Reverse Mentoring: Students teach mentors digital skills."""
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tutorials_created')
    title = models.CharField(max_length=200)
    description = models.TextField()
    content_url = models.CharField(max_length=500, blank=True)
    category = models.CharField(max_length=100)
    enrolled_mentors = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='reverse_tutorials', blank=True)
    scholarship_points_earned = models.IntegerField(default=0)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
