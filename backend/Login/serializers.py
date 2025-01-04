from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer) : 
    class Meta :
        model = CustomUser
        fields = ('id','email','name','contactNum','password','is_Admin')
