from django.urls import path
from . import views

urlpatterns = [
    path('mentors/pending/', views.pending_mentors, name='pending_mentors'),
    path('mentors/<int:pk>/approve/', views.approve_mentor, name='approve_mentor'),
    path('mentors/<int:pk>/reject/', views.reject_mentor, name='reject_mentor'),
    path('stats/', views.platform_stats, name='platform_stats'),
]
