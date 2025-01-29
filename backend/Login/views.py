from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, logout, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
#from rest_framework.permissions import IsAuthenticated
from .models import CustomUser, PasswordResetModel
from django.conf import settings
from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model


# Create your views here.

#View to register a new user manually
class UserRegisterView(APIView) :
    #permission_classes = [IsAuthenticated]
    def post(self, request) :
        serializer = CustomUserSerializer(data = request.data) #deserialize the incoming data
        if serializer.is_valid() :  #validate and create the user
            user = serializer.save() #create a new user
             #return a success message with user data except password
            response_data = {
                "id" : user.id,
                "email" : user.email,
                "name" : user.name,
                "contactNum" : user.contactNum,
                "is_active" : user.is_active
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) #if validation fails



#View to authenticate user login
class UserLoginAuthenticateView(APIView) :
    def post(self, request) :
        print("user", request)
        user = authenticate(email=request.data['email'], password=request.data['password'])
        if user and user.is_active :
            login(request, user) #login successfully if user is valid
            # Create the refresh token and access token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            response_data = {
            "id" : user.id,
            "email" : user.email,
            "name" : user.name,
            "contactNum" : user.contactNum,
            "is_active" : user.is_active,
            "is_staff" : user.is_staff,
            "acess_token" : access_token,
            "refresh_token" : str(refresh)
            }
            return Response(response_data , status=status.HTTP_200_OK)
        return Response({"error":"user authentication failed"}, status=status.HTTP_401_UNAUTHORIZED) #authentication failed message



#view for forgot password
class ForgotPasswordView(APIView):

    def sendEmail(self, recipient_email, recipient_name, token) :
        subject = "Forgot Password Email"
        message = f"""\
        Hello {recipient_name},

        A request to reset your password was received.
        Please click the link to reset your password : http://localhost:3000/password-reset/{token}/
        If you are not able to click the link, please copy and paste the url in your browser.
        \n
        Regards
        Survey Management Team """
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [recipient_email]
        send_mail(subject, message, email_from, recipient_list)
        return "Email send successfully"

    def post(self, request) :
        try:
            user = CustomUser.objects.get(email = request.data['email'])
        except CustomUser.DoesNotExist :
            user = None
        if(user is not None and user.is_active) :
                token = default_token_generator.make_token(user)
                pass_reset_entry = PasswordResetModel(email = request.data['email'], token = token)
                pass_reset_entry.save()
                self.sendEmail(user.email, user.name, token)
                response_data = {
                    "email" : user.email,
                    "message" : "Password reset send to the registered email address"
                }
                return Response(response_data, status=status.HTTP_200_OK)
        return Response({"error":"Email is not registered"}, status=status.HTTP_404_NOT_FOUND)



#user resetting the password
class PasswordResetView(APIView) :
    def post(self, request, token) :
        try:
            email = PasswordResetModel.objects.get(token = token) #get email from model
            user = CustomUser.objects.get(email = email) #get user from model
        except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
            user = None

        if user is not None:
            user.set_password(request.data['password'])
            user.save()
            return Response(status=status.HTTP_200_OK)
        return Response({"error":"Password could not be reset"}, status=status.HTTP_400_BAD_REQUEST)




# view to logout user
class UserLogoutView(APIView) :
    def post(self, request) :
        logout(request)
        return Response(status=status.HTTP_200_OK)
