from django.urls import path
from .views import *

urlpatterns = [
    path('register/', UserRegisterView.as_view() , name = 'user_register'),
    path('authenticate/', UserLoginAuthenticateView.as_view() , name = 'user_authenticate'),
    path('forgot-password/', ForgotPasswordView.as_view(), name = 'forgot_password'),
    path('password-reset/<str:token>', PasswordResetView.as_view(), name = 'password_reset'),
    path('logout/', UserLogoutView.as_view() , name = 'user_logout'),
]