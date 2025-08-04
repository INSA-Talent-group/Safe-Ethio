from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import register, alert
from .serializers import RegisterSerializer, AlertSerializer
from .views.decorators import login, logout
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def RegisterViewSet(request):
    """Step 1: Verify username and password are registered"""
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return JsonResponse({'error': 'Username and password required.'}, status=400)
        
        # Check if user exists and credentials are correct
        user = authenticate(username=username, password=password)
        if user is None:
            return JsonResponse({
                'verified': False, 
                'error': 'Invalid username or password.',
                'step': 'credentials_failed'
            }, status=401)
        # Check if user is blocked
        try:
            profile = register.objects.get(user=user)
            if profile.blocked:
                return JsonResponse({'verified': False, 'error': 'User is blocked by supervisor.', 'step': 'blocked'}, status=403)
            
            has_face = profile.face_encoding is not None
            has_iris = profile.iris_encoding is not None
            has_fingerprint = profile.fingerprint_encoding is not None
            
            return JsonResponse({
                'verified': True,
                'username': username,
                'step': 'credentials_verified',
                'message': 'Credentials verified. Please provide biometric data.',
                'available_biometrics': {
                    'face': has_face,
                    'iris': has_iris,
                    'fingerprint': has_fingerprint
                }
            })
        except register.DoesNotExist:
            return JsonResponse({
                'verified': False,
                'error': 'User profile not found. Please register biometric data.',
                'step': 'no_profile'
            }, status=404)
    
    return JsonResponse({'error': 'Invalid request method.'}, status=405)

class AlertViewSet(viewsets.ModelViewSet):
    queryset = alert.objects.all()
    serializer_class = AlertSerializer
class loginViewSet(viewsets.ViewSet):
    def login(self, request):
        return HttpResponse("Login successful")
    def logout(self, request):
        return HttpResponse("Logout successful")
    
    
    
    
    