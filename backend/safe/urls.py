from .import views
from django.urls import path, include
from .views import RegisterViewSet, AlertViewSet, LoginAPIView, LogoutAPIView
from rest_framework import routers


urlpatterns = [
    path('register/', RegisterViewSet.as_view({'get': 'list', 'post': 'create'}), name='register-list'),
     path('LoginAPIView/', LoginAPIView.as_view(), name='login'),
    path('alerts/', AlertViewSet.as_view({'get': 'list', 'post': 'create'}), name='alert-list'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    
]