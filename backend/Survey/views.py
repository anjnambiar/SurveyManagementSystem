from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import status



class AddSurveyView(APIView) :

    def get(self, request) : #get all the surveys
        try :
            survey = Survey.objects.all()
        except Survey.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = SurveySerializer(survey, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs) :
        serializer = SurveySerializer(data = request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class SurveyDetailView(APIView):

    def get(self, request, pk) : #get a particular survey
        try:
            survey = Survey.objects.get(pk=pk)
        except Survey.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = SurveySerializer(survey)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk) : #only change status to false to delete survey
        try :
            survey = Survey.objects.get(pk=pk)
        except Survey.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
        survey.status = False
        survey.save()
        return Response(status=status.HTTP_200_OK)


