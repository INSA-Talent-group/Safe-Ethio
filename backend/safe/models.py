from django.db import models

class register(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    fullname = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    photo = models.ImageField(upload_to='id_photos/', null=True, blank=True)
    phone_number = models.CharField(max_length=15, unique=True)
    address = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_user = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    def __str__(self):
        return self.username
class alert(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(register, on_delete=models.CASCADE)
    photo1 = models.ImageField(upload_to='alert_photos/', null=True, blank=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.id} - {self.user.username}"
