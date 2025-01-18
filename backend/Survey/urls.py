from django.urls import path
from .views import *

urlpatterns = [
    path('addSurvey/' , AddSurveyView.as_view(), name='addSurvey'),
]