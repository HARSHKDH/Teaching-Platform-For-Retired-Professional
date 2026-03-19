from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from .models import Batch, Content, Enrollment, Progress
from .serializers import BatchSerializer, BatchDetailSerializer, EnrollmentSerializer

import io
try:
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import landscape, letter
    from reportlab.lib.units import inch
except ImportError:
    canvas = None

User = get_user_model()


class BatchListView(generics.ListCreateAPIView):
    serializer_class = BatchSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        qs = Batch.objects.filter(is_published=True)
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        if category: qs = qs.filter(category=category)
        if search: qs = qs.filter(title__icontains=search)
        return qs.select_related('mentor')

    def perform_create(self, serializer):
        serializer.save(mentor=self.request.user)


class BatchDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BatchDetailSerializer
    queryset = Batch.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


@api_view(['POST'])
def enroll_batch(request, pk):
    """Enroll a student in a batch (post-payment)."""
    try:
        batch = Batch.objects.get(pk=pk, is_published=True)
    except Batch.DoesNotExist:
        return Response({'error': 'Batch not found'}, status=status.HTTP_404_NOT_FOUND)

    enrollment, created = Enrollment.objects.get_or_create(
        student=request.user,
        batch=batch,
        defaults={'payment_status': 'pending'}
    )
    if not created:
        return Response({'error': 'Already enrolled'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(EnrollmentSerializer(enrollment).data, status=status.HTTP_201_CREATED)


class MyEnrollmentsView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        return Enrollment.objects.filter(student=self.request.user).select_related('batch')


class MentorStatsView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        batches = request.user.batches.all()
        total_students = sum(b.enrolled_count for b in batches)
        total_earned = sum((b.enrolled_count * float(b.price)) for b in batches)
        return Response({
            'total_students': total_students,
            'total_batches': batches.count(),
            'total_earned': total_earned,
            'mentor_share': total_earned * 0.7,
            'karma_points': request.user.karma_points,
            'badge_level': request.user.badge_level,
        })


class MentorBatchesView(generics.ListAPIView):
    serializer_class = BatchSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Batch.objects.filter(mentor=self.request.user)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def download_certificate(request, pk):
    try:
        enrollment = Enrollment.objects.get(pk=pk, student=request.user)
    except Enrollment.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)
        
    # Mark as completed for demo purposes
    enrollment.certificate_issued = True
    enrollment.completion_percentage = 100
    enrollment.save()
    
    if not canvas:
        return Response({'error': 'PDF generation not available'}, status=500)
        
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=landscape(letter))
    
    # Draw certificate
    c.rect(0.5*inch, 0.5*inch, 10*inch, 7.5*inch)
    c.rect(0.6*inch, 0.6*inch, 9.8*inch, 7.3*inch)

    c.setFont("Helvetica-Bold", 36)
    c.drawCentredString(5.5*inch, 6*inch, "Certificate of Completion")
    
    c.setFont("Helvetica", 20)
    c.drawCentredString(5.5*inch, 4.5*inch, "This is to certify that")
    
    name = request.user.get_full_name() or request.user.email
    c.setFont("Helvetica-Bold", 28)
    c.drawCentredString(5.5*inch, 3.5*inch, name)
    
    c.setFont("Helvetica", 20)
    c.drawCentredString(5.5*inch, 2.5*inch, "has successfully completed the batch")
    
    c.setFont("Helvetica-Bold", 24)
    c.drawCentredString(5.5*inch, 1.5*inch, enrollment.batch.title)
    
    c.setFont("Helvetica", 14)
    mentor_name = enrollment.batch.mentor.get_full_name() or enrollment.batch.mentor.email
    c.drawString(1*inch, 0.5*inch, f"Mentor: {mentor_name}")
    c.drawRightString(10*inch, 0.5*inch, "Vridhi Platform")
    
    c.showPage()
    c.save()
    
    buffer.seek(0)
    response = HttpResponse(buffer.getvalue(), content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="vridhi_cert_{enrollment.id}.pdf"'
    return response
