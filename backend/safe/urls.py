from .import views
from django.urls import path, include
from .views import RegisterViewSet, AlertViewSet, LoginAPIView, LogoutAPIView, TrustedContactViewSet, ReportViewSet, LocationTrackingViewSet, ChatViewSet
from rest_framework.routers import DefaultRouter
from rest_framework import routers


urlpatterns = [
    path('register/', RegisterViewSet.as_view({'get': 'list', 'post': 'create'}), name='register-list'),
    path('LoginAPIView/', LoginAPIView.as_view(), name='login'),
    path('alerts/', AlertViewSet.as_view({'get': 'list', 'post': 'create'}), name='alert-list'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path("trusted_contacts/", views.TrustedContactViewSet.as_view({'get': 'list', 'post': 'create'}), name='trusted-contact-list'),
    path("reports/", views.ReportViewSet.as_view({'get': 'list', 'post': 'create'}), name='report-list'),
    path("location_tracking/", views.LocationTrackingViewSet.as_view({'get': 'list', 'post': 'create'}), name='location-tracking-list'),
    path("chat/", views.ChatViewSet.as_view({'get': 'list', 'post': 'create'}), name='chat-list'),
]