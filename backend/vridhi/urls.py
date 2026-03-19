from django.urls import path, include

urlpatterns = [
    path('api/auth/', include('users.urls')),
    path('api/mentors/', include('courses.mentor_urls')),
    path('api/batches/', include('courses.urls')),
    path('api/enrollments/', include('courses.enrollment_urls')),
    path('api/wellness/', include('mental_health.urls')),
    path('api/legacy/', include('legacy.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/admin/', include('users.admin_urls')),
]
