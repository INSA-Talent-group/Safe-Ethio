from django.contrib import admin
from .models import register, Alert, Report, Trustedcontact, LocationTracking, Chat

admin.site.site_header = "Safe Admin"
admin.site.site_title = "Safe Admin Portal"
admin.site.index_title = "Welcome to Safe Admin Portal"

@admin.register(register)
class RegisterAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'fullname', 'email', 'phone_number', 'is_admin', 'is_user', 'is_superuser')
    search_fields = ('username', 'email')
    list_filter = ('is_admin', 'is_user', 'is_superuser')
    ordering = ('-created_at',)


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'description', 'created_at', 'photo1', 'photo2')
    search_fields = ('user_id__username', 'description')
    list_filter = ('created_at',)
    ordering = ('-created_at',)
# Register your models here.
@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'description', 'created_at')
    search_fields = ('user_id__username', 'description')
    list_filter = ('created_at',)
    ordering = ('-created_at',)

@admin.register(Trustedcontact)
class TrustedContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'contact_name', 'contact_phone_number', 'contact_email', 'created_at')
    search_fields = ('user_id__username', 'contact_name', 'contact_email')
    list_filter = ('created_at',)
    ordering = ('-created_at',)

@admin.register(LocationTracking)
class LocationTrackingAdmin(admin.ModelAdmin):      
    list_display = ('id', 'user_id', 'latitude', 'longitude', 'speed', 'accuracy', 'created_at')
    search_fields = ('user_id__username',)
    list_filter = ('created_at',)
    ordering = ('-created_at',)
@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'message', 'created_at')
    search_fields = ('user_id__username', 'message')
    list_filter = ('created_at',)
    ordering = ('-created_at',)


