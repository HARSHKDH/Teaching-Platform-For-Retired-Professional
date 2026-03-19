from django.urls import path
from users import views as user_views

urlpatterns = [
    path('', user_views.MentorListView.as_view(), name='mentor_list'),
    path('<int:pk>/', user_views.MentorDetailView.as_view(), name='mentor_detail'),
]
