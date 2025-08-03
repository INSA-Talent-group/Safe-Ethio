# This file is part of SafeEthio project.
# It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution.
# This file is also available at       
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('safe.urls')),
]
