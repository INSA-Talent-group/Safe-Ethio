from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import register, alert
from .serializers import RegisterSerializer, AlertSerializer

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = register.objects.all()
    serializer_class = RegisterSerializer

class AlertViewSet(viewsets.ModelViewSet):
    queryset = alert.objects.all()
    serializer_class = AlertSerializer