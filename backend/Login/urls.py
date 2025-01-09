from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register/', UserRegisterView.as_view() , name = 'user_register'),
    path('authenticate/', UserLoginAuthenticateView.as_view() , name = 'user_authenticate'),
    path('forgot-password/', ForgotPasswordView.as_view(), name = 'forgot_password'),
    path('password-reset/<uidb64>/<token>', auth_views.PasswordResetView.as_view(), name = 'password_reset'),
    path('password-reset/done/ ', auth_views.PasswordResetDoneView.as_view(), name = 'password_reset_done'),
    path('logout/', UserLogoutView.as_view() , name = 'user_logout'),
]