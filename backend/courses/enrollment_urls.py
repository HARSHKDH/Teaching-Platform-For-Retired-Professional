from django.urls import path
from . import views

urlpatterns = [
    path('', views.MyEnrollmentsView.as_view(), name='my_enrollments'),
]
