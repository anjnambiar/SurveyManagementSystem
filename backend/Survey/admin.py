from django.contrib import admin
from .models import Survey, Question, Option, Responses

# Register your models here.
admin.site.register(Survey)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(Responses)