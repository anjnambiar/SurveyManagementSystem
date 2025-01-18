from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class AddSurveyView(APIView) :

    # def get(self, request) :
    #     survey = Survey.objects.all()
    #     serializer = SurveySerializer(survey, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs) :
        serializer = SurveySerializer(data = request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)