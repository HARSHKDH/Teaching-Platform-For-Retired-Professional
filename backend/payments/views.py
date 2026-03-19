from rest_framework.decorators import api_view
from rest_framework.response import Response
from courses.models import Batch, Enrollment
import hmac
import hashlib
import os


@api_view(['POST'])
def create_order(request):
    batch_id = request.data.get('batch_id')
    try:
        batch = Batch.objects.get(pk=batch_id, is_published=True)
    except Batch.DoesNotExist:
        return Response({'error': 'Batch not found'}, status=404)

    # Razorpay integration
    # In production: import razorpay; client = razorpay.Client(auth=(KEY_ID, KEY_SECRET))
    # For dev, return a mock order
    amount_paise = int(float(batch.price) * 100)
    mock_order = {
        'id': f'order_mock_{batch_id}_{request.user.id}',
        'amount': amount_paise,
        'currency': 'INR',
        'batch_id': batch_id,
        'batch_title': batch.title,
        'key': os.environ.get('RAZORPAY_KEY_ID', 'rzp_test_placeholder'),
    }
    return Response(mock_order)


@api_view(['POST'])
def verify_payment(request):
    """Verify Razorpay payment signature and activate enrollment."""
    order_id = request.data.get('razorpay_order_id')
    payment_id = request.data.get('razorpay_payment_id')
    signature = request.data.get('razorpay_signature')
    batch_id = request.data.get('batch_id')

    key_secret = os.environ.get('RAZORPAY_KEY_SECRET', '')

    # Verify signature (in production with real keys)
    if key_secret:
        message = f"{order_id}|{payment_id}"
        expected = hmac.new(key_secret.encode(), message.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(expected, signature):
            return Response({'error': 'Invalid signature'}, status=400)

    # Activate enrollment
    try:
        batch = Batch.objects.get(pk=batch_id)
        enrollment, _ = Enrollment.objects.get_or_create(student=request.user, batch=batch)
        enrollment.payment_status = 'completed'
        enrollment.payment_id = payment_id
        enrollment.razorpay_order_id = order_id
        enrollment.save()
        return Response({'message': 'Payment verified! You are now enrolled.', 'enrollment_id': enrollment.id})
    except Batch.DoesNotExist:
        return Response({'error': 'Batch not found'}, status=404)
