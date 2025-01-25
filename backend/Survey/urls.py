from django.urls import path
from .views import *

urlpatterns = [
    path('addSurvey/' , AddSurveyView.as_view(), name='addSurvey'),
    path('surveyDetail/<int:pk>/' , SurveyDetailView.as_view(), name='surveyDetail'),
]