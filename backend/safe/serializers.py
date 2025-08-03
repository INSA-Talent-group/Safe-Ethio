from django.db import models
from rest_framework import serializers
from .models import register, alert

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = register
        fields = ['id', 'username', 'fullname', 'email', 'password', 'photo', 'phone_number', 'address', 'is_admin', 'is_user', 'is_superuser']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = register.objects.create_user(**validated_data)
        return user
class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = alert
        fields = ['id', 'user_id', 'photo1', 'description', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        alert_instance = alert.objects.create(**validated_data)
        return alert_instance
