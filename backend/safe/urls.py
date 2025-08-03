from .import views
from django.urls import path, include
from .views import RegisterViewSet, AlertViewSet
from rest_framework import routers

router= routers.DefaultRouter()
router.register(r'register', RegisterViewSet)       
router.register(r'alert', AlertViewSet)
urlpatterns = [
    path('', include(router.urls)),
]