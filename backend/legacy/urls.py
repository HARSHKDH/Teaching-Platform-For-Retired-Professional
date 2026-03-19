from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_projects, name='legacy_list'),
    path('<int:pk>/', views.project_detail, name='legacy_detail'),
    path('<int:pk>/submit/', views.submit_project, name='project_submit'),
]
