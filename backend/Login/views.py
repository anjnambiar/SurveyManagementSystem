from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, logout


# Create your views here.

#View to register a new user manually
class UserRegisterView(APIView) :
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
        serializer = LoginSerializer(data = request.data) #deserialize the incoming data
        if(serializer.is_valid()) : # check if serializer is valid
            user = serializer.validated_data #authenticate the email and password LoginSerializer > validate
            if user is not None :
                login(request, user) #login successfully if user is valid
                response_data = {
                "id" : user.id,
                "email" : user.email,
                "name" : user.name,
                "contactNum" : user.contactNum,
                "is_active" : user.is_active
                }
                return Response(response_data , status=status.HTTP_200_OK)
        return Response({"error":"user authentication failed"}, status=status.HTTP_401_UNAUTHORIZED) #authentication failed message



# view to logout user
class UserLogoutView(APIView) :
    def post(self, request) :
        logout(request)
        return Response(status=status.HTTP_200_OK)
