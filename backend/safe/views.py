from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from twilio.rest import Client
from .models import register, Alert
from .serializers import RegisterSerializer, AlertSerializer, TrustedContactSerializer, ReportSerializer, LocationTrackerSerializer, ChatChannelSerializer, MessageSerializer
from .models import Trustedcontact, Report, LocationTracking, Message, ChatChannel

# Twilio Config (put real values in settings.py or .env)
TWILIO_SID = 'your_sid'
TWILIO_TOKEN = 'your_token'
TWILIO_NUMBER = '+1234567890'

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = register.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user:
            login(request, user)
            return Response({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "fullname": user.fullname,
                    "phone_number": user.phone_number,
                    "address": user.address,
                    "is_admin": user.is_admin,
                },
                "success": True,
                "status": status.HTTP_200_OK,
                "error": None
            })
        return Response({
            "message": "Invalid credentials",
            "success": False,
            "status": status.HTTP_401_UNAUTHORIZED,
            "error": "Authentication failed"
        }, status=status.HTTP_401_UNAUTHORIZED)
    
class LogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"})


class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        instance = serializer.save()
        self.send_alert(instance)

    def send_alert(self, instance):
        users = register.objects.filter(is_user=True)
        for user in users:
            if user.email:
                self.send_email(user.email, instance.description)
            if user.phone_number:
                self.send_sms(user.phone_number, instance.description)

    def send_email(self, to_email, message):
        send_mail(
            subject="New Alert Notification",
            message=message,
            from_email="ethiomiracle2017@gmail.com",
            recipient_list=[to_email],
            fail_silently=False,

        )

    def send_sms(self, to_number, message):
        client = Client(TWILIO_SID, TWILIO_TOKEN)
        client.messages.create(
            body=message,
            from_=TWILIO_NUMBER,
            to=to_number
        )
class TrustedContactViewSet(viewsets.ModelViewSet):
    queryset = Trustedcontact.objects.all()
    serializer_class = TrustedContactSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Trustedcontact.objects.filter(user_id=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user) # Assuming the serializer has a 'user' field
class LocationTrackingViewSet(viewsets.ModelViewSet):
    queryset = LocationTracking.objects.all()
    serializer_class = LocationTrackerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return LocationTracking.objects.filter(user_id=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)  # Assuming the serializer has a 'user_id' field
class MessageViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(user_id=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)  # Assuming the serializer has a 'user_id' field

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Report.objects.filter(user_id=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)  # Assuming the serializer has a 'user_id' field

class ChatChannelViewSet(viewsets.ModelViewSet):
    queryset = ChatChannel.objects.all()
    serializer_class = ChatChannelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ChatChannel.objects.filter(user_id=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)  # Assuming the serializer has a 'user_id' field