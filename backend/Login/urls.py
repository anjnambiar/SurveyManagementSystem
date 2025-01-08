from django.urls import path
from .views import *

urlpatterns = [
    path('register/', UserRegisterView.as_view() , name = 'user_register'),
    path('authenticate/', UserLoginAuthenticateView.as_view() , name = 'user_authenticate'),
    path('logout/', UserLogoutView.as_view() , name = 'user_logout'),
]