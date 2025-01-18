from django.db import models
from Login.models import CustomUser

# model for Survey
class Survey(models.Model) :

    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    reward_points = models.IntegerField()
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


#model for survey questions
class Question(models.Model) :

    QUESTION_TYPES = [
        ('MCQ', 'Multpile choice'),
        ('QA', 'Question and Answer')
    ]

    survey = models.ForeignKey(Survey, related_name="questions", on_delete=models.CASCADE)
    question_title = models.CharField(max_length=255)
    question_type = models.CharField(max_length=5, choices=QUESTION_TYPES)

    def __str__(self):
        return self.question_title


class Option(models.Model) :
    question = models.ForeignKey(Question, related_name="options", on_delete=models.CASCADE)
    option_name = models.CharField(max_length=255)

    def __str__(self):
        return self.option_name


class Response(models.Model) :
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null = True)
    answer = models.CharField(max_length=255)

    def __str__(self):
        return self.answer