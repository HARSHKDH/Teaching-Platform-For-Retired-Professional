from django.urls import path
from . import views
from users import views as user_views

urlpatterns = [
    path('', views.BatchListView.as_view(), name='batch_list'),
    path('<int:pk>/', views.BatchDetailView.as_view(), name='batch_detail'),
    path('<int:pk>/enroll/', views.enroll_batch, name='enroll_batch'),
]
