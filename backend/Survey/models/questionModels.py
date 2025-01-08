from django.db import models
from .surveyModels import Survey

class Question(models.Model) :
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    question_title = models.CharField(max_length=255)
    question_type = models.CharField(max_length=5, choices='QUESTION_TYPES')

    QUESTION_TYPES = [
        ('MCQ', 'Multpile choice'),
        ('QA', 'Question and Answer')
    ]

    def __str__(self):
        return self.question_title