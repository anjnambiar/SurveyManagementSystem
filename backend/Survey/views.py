from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from .surveyPagination import SurveyPagination
from django.db.models import Q
from Login.serializers import CustomUserSerializer


# add a new survey
class AddSurveyView(APIView) :

    def get(self, request) : #get all the surveys
        try :
            survey = Survey.objects.all()
        except Survey.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
        #search functionality
        search_query = request.GET.get("search", None)
        if search_query :
            survey = survey.filter(Q(title__icontains=search_query)
                                   | Q(description__icontains=search_query))
       # pagination functionality
        pagination = SurveyPagination()
        page = pagination.paginate_queryset(survey, request)
        serializer = SurveySerializer(page, many=True)
        return pagination.get_paginated_response(serializer.data)


    def post(self, request, *args, **kwargs) :
        serializer = SurveySerializer(data = request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Get details of a survey from model
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



# Response of a survey
class SurveySubmitView(APIView) :

    def post(self, request) :
        serializer = ResponsesSerializer(data = request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Get all users responded to a survey
class SurveyParticipantView(APIView) :

    def get(self, request, pk) :
        if not Survey.objects.filter(id=pk).exists():
            return Response({"error": "Survey not found."}, status=status.HTTP_204_NO_CONTENT)
        users = CustomUser.objects.filter(responses__survey_id = pk).distinct()
        if not users.exists():
            return Response([], status=status.HTTP_200_OK)
        search_query = request.GET.get("search", None)
        if search_query :
            users = users.filter(Q(name__icontains=search_query)
                                   | Q(email__icontains=search_query)
                                   | Q(contactNum__icontains=search_query))

        pagination = SurveyPagination()
        page = pagination.paginate_queryset(users, request)
        serializer = CustomUserSerializer(page, many=True)
        return pagination.get_paginated_response(serializer.data)



# get response of a survey by a user
class SurveyResponse(APIView) :

    def get(self, request, survey_id, user_id):
        responses = Responses.objects.filter(survey_id=survey_id, user_id=user_id)
        if not responses.exists():
            return Response({"error" : "No responses found"}, status=status.HTTP_204_NO_CONTENT)
        serializer = ResponsesSerializer(responses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



# get all survey participated by a user
class UserParticipatedView(APIView) :

    def get(self, request, pk) :
        if not CustomUser.objects.filter(id=pk).exists():
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        surveys = Survey.objects.filter(responses__user_id = pk).distinct()
        if not surveys.exists():
            return Response([], status=status.HTTP_200_OK)
        #search functionality
        search_query = request.GET.get("search", None)
        if search_query :
            surveys = surveys.filter(Q(title__icontains=search_query)
                                   | Q(description__icontains=search_query))
       # pagination functionality
        pagination = SurveyPagination()
        page = pagination.paginate_queryset(surveys, request)
        serializer = SurveySerializer(page, many=True)
        return pagination.get_paginated_response(serializer.data)
