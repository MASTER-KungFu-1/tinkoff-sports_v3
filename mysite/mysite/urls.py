"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from backend_api.views import TeamView, CreateUserView, LoginView, GetUserViews, LogoutView
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api', schema_view),
    path('api/getTeam',TeamView.as_view(), name='Team'),
    path('api/createUser', CreateUserView.as_view()),
    path('api/login',LoginView.as_view(), name='login'),
    path('api/logout', LogoutView.as_view(), name='logout'),
    path('api/getUser',GetUserViews.as_view())
]