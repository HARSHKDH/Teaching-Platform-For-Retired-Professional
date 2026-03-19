from django.db import models
from django.conf import settings


class Batch(models.Model):
    CATEGORIES = [
        ('tech', 'Technology & AI'),
        ('civil_services', 'Civil Services'),
        ('life_skills', 'Life Skills'),
        ('business', 'Business & Finance'),
        ('arts', 'Arts & Culture'),
        ('wellness', 'Mental Wellness'),
        ('science', 'Science & Research'),
        ('education', 'Education'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    mentor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='batches')
    category = models.CharField(max_length=20, choices=CATEGORIES)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=100.00)
    start_date = models.DateField(null=True, blank=True)
    duration_weeks = models.IntegerField(default=8)
    max_students = models.IntegerField(default=40)
    is_published = models.BooleanField(default=False)
    thumbnail = models.ImageField(upload_to='batch_thumbnails/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    @property
    def enrolled_count(self):
        return self.enrollments.filter(payment_status='completed').count()

    @property
    def average_rating(self):
        reviews = self.reviews.all()
        if not reviews.exists():
            return None
        return round(sum(r.rating for r in reviews) / reviews.count(), 1)


class Content(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='contents')
    title = models.CharField(max_length=200)
    video_url = models.CharField(max_length=500, blank=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    duration_minutes = models.IntegerField(default=0)
    supporting_materials = models.JSONField(default=list, blank=True)
    is_preview = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.batch.title} - {self.title}"


class Enrollment(models.Model):
    PAYMENT_STATUS = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollments')
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='enrollments')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    payment_id = models.CharField(max_length=100, blank=True)
    razorpay_order_id = models.CharField(max_length=100, blank=True)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completion_percentage = models.IntegerField(default=0)
    certificate_issued = models.BooleanField(default=False)

    class Meta:
        unique_together = ['student', 'batch']

    def __str__(self):
        return f"{self.student.get_full_name()} → {self.batch.title}"


class Progress(models.Model):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name='progress_items')
    content = models.ForeignKey(Content, on_delete=models.CASCADE)
    watched_percentage = models.IntegerField(default=0)
    completed = models.BooleanField(default=False)
    last_watched = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['enrollment', 'content']


class BatchReview(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='reviews')
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['batch', 'student']


class LiveSession(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='live_sessions')
    title = models.CharField(max_length=200)
    scheduled_at = models.DateTimeField()
    duration_minutes = models.IntegerField(default=60)
    meeting_url = models.URLField(blank=True)
    is_recorded = models.BooleanField(default=False)
    recording_url = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.batch.title} - Live: {self.title}"
