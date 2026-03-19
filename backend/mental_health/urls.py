from django.urls import path
from . import views

urlpatterns = [
    path('mood/', views.log_mood, name='log_mood'),
    path('mood/history/', views.mood_history, name='mood_history'),
    path('sessions/', views.book_session, name='book_session'),
]
