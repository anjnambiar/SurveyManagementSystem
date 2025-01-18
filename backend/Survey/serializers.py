from rest_framework import serializers
from .models import *


class OptionSerializer(serializers.ModelSerializer) :

    class Meta :
        model = Option
        fields =['id', 'option_name']



class QuestionSerializer(serializers.ModelSerializer) :
    options = OptionSerializer(many=True)

    class Meta :
        model = Question
        fields = ['id', 'question_title', 'question_type', 'options']



class SurveySerializer(serializers.ModelSerializer) :
    questions = QuestionSerializer(many=True)

    class Meta :
        model = Survey
        fields = ['id', 'title', 'description', 'reward_points', 'status', 'created_at', 'questions']

    def create(self, validated_data) :

        questions_data = validated_data.pop('questions',[])
        survey = Survey.objects.create(**validated_data)

        for question_data in questions_data :
            options_data = question_data.pop('options',[])
            question = Question.objects.create(survey = survey, **question_data)

            for option_data in options_data :
                option = Option.objects.create(question=question, **option_data)

        return survey

