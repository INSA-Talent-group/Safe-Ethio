from django.db import models
from rest_framework import serializers
from .models import register, Alert, Trustedcontact, Report, LocationTracking, Message, ChatChannel

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


class TrustedContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trustedcontact
 
        fields = ['id', 'user_id', 'contact_name', 'contact_phone_number', 'contact_email']
        read_only_fields = ['id']

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields ='__all__'
        read_only_fields = ['created_at']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ['created_at']
        
class LocationTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationTracking
        fields = '__all__'
        read_only_fields = ['created_at']
        
class ChatChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatChannel
        fields = '__all__'
        read_only_fields = ['created_at']