from django.urls import path
from . import views

# Mentor URLs
urlpatterns = [
    path('', views.MentorListView.as_view(), name='mentor_list'),
    path('<int:pk>/', views.MentorDetailView.as_view(), name='mentor_detail'),
    path('stats/', views.MentorStatsView.as_view(), name='mentor_stats'),
    path('batches/', views.MentorBatchesView.as_view(), name='mentor_batches'),
]
