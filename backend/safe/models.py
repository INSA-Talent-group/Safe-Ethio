from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class RegisterManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)

class register(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    fullname = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    photo = models.ImageField(upload_to='id_photos/', null=True, blank=True)
    phone_number = models.CharField(max_length=15, unique=True)
    address = models.TextField(null=True, blank=True)
    is_admin = models.BooleanField(default=False)
    is_user = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = RegisterManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    @property
    def is_staff(self):
        return self.is_admin

class Alert(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(register, on_delete=models.CASCADE)
    photo1 = models.ImageField(upload_to='alert_photos/', null=True, blank=True)
    photo2 = models.ImageField(upload_to='alert_photos/', null=True, blank=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    locarion_id = models.ForeignKey('location', on_delete=models.CASCADE, null=True, blank=True)
   
    
 
    def __str__(self):
        return f"Alert by {self.user_id} at {self.created_at}"
    
class location(models.Model):
    id = models.AutoField(primary_key=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    speed = models.FloatField(null=True, blank=True)
    accuracy = models.FloatField(null=True, blank=True)
    altitude = models.FloatField(null=True, blank=True)
    heading = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    altitude_accuracy = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user_id.username} - {self.latitude}, {self.longitude}"

class Trustedcontact(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(register, on_delete=models.CASCADE)
    contact_name = models.CharField(max_length=150)
    contact_email = models.EmailField()
    contact_phone_number = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.contact_name} - {self.contact_phone_number}"

class Report(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(register, on_delete=models.CASCADE)
    report_type = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Report by {self.user_id} - {self.report_type}"

# tracking the location
class LocationTracking(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(register, on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()
    speed = models.FloatField(null=True, blank=True)
    accuracy = models.FloatField(null=True, blank=True)
    altitude = models.FloatField(null=True, blank=True)
    heading = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Location of {self.user_id} at {self.timestamp}"


# chat model
class ChatChannel(models.Model):
    user =models.ForeignKey(register, on_delete=models.CASCADE , related_name='chat_channel')
    admin = models.ForeignKey(register, on_delete=models.CASCADE, related_name='admin_channel', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
# class Message(models.Model):
    def __str__(self):
        return f"Channel {self.id} for {self.user.username}"


class Message(models.Model):
    channel = models.ForeignKey(ChatChannel, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(register, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    def __str__(self):
        return f"Message from {self.sender} in channel {self.channel.id} at {self.timestamp}"