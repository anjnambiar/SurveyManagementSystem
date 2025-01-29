from django.urls import path
from .views import *

urlpatterns = [
    path('addSurvey/' , AddSurveyView.as_view(), name='addSurvey'),
    path('surveyDetail/<int:pk>/' , SurveyDetailView.as_view(), name='surveyDetail'),
    path('surveySubmit/', SurveySubmitView.as_view(), name='surveySubmit'),
    path('participantList/<int:pk>/', SurveyParticipantView.as_view(), name='surveyParticipants'),
    path('surveyResponse/<int:survey_id>/<int:user_id>/', SurveyResponse.as_view(), name='surveyResponse'),
]