from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    USER_TYPES = [
        ('student', 'Student'),
        ('mentor', 'Mentor'),
        ('psychologist', 'Psychologist'),
        ('admin', 'Admin'),
    ]
    BADGE_LEVELS = [
        ('Bronze Sage', 'Bronze Sage'),
        ('Silver Guide', 'Silver Guide'),
        ('Gold Mentor', 'Gold Mentor'),
        ('Platinum Icon', 'Platinum Icon'),
    ]
    VERIFICATION_STATUS = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default='student')
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    linkedin_url = models.URLField(blank=True)

    # Mentor-specific
    years_experience = models.IntegerField(null=True, blank=True)
    last_organization = models.CharField(max_length=200, blank=True)
    education = models.TextField(blank=True)
    expertise_areas = models.JSONField(default=list, blank=True)
    verification_status = models.CharField(max_length=20, choices=VERIFICATION_STATUS, default='approved')
    badge_level = models.CharField(max_length=20, choices=BADGE_LEVELS, blank=True)
    karma_points = models.IntegerField(default=0)

    # Student-specific
    goals = models.TextField(blank=True)
    interests = models.JSONField(default=list, blank=True)
    education_level = models.CharField(max_length=50, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return f"{self.get_full_name()} ({self.user_type})"

    def get_badge_level(self):
        if self.user_type != 'mentor':
            return None
        count = self.enrollments_as_mentor.count()
        if count >= 500: return 'Platinum Icon'
        if count >= 100: return 'Gold Mentor'
        if count >= 20: return 'Silver Guide'
        return 'Bronze Sage'


class VerificationDocument(models.Model):
    DOC_TYPES = [
        ('degree', 'Educational Degree'),
        ('experience', 'Experience Proof'),
        ('certification', 'Additional Certification'),
    ]
    mentor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='verification_docs')
    document_type = models.CharField(max_length=20, choices=DOC_TYPES)
    file = models.FileField(upload_to='verification_docs/')
    original_filename = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    admin_notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.mentor.get_full_name()} - {self.document_type}"
