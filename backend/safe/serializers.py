from django.db import models
from rest_framework import serializers
from .models import register, Alert

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = register
        fields = ['id', 'username', 'fullname', 'email', 'password', 'photo', 'phone_number', 'address', 'is_admin', 'is_user', 'is_superuser']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return register.objects.create_user(**validated_data)

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'
        read_only_fields = ['created_at']