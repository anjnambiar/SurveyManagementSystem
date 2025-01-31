from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate


class CustomUserSerializer(serializers.Serializer) :
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField()
    name = serializers.CharField(max_length = 255)
    contactNum = serializers.IntegerField()
    password = serializers.CharField(write_only=True)
    is_active = serializers.BooleanField(default=True)
    is_staff = serializers.BooleanField(default=False)
    reward_points = serializers.IntegerField(default=0)

    def create(self, validated_data):
        #Create and return a new CustomUser instance using validated data
        user = CustomUser.objects.create_user(
            email = validated_data['email'] ,
            name = validated_data['name'],
            contactNum = validated_data['contactNum'],
            password = validated_data['password'],
            is_active = validated_data['is_active'],
            is_staff = validated_data['is_staff'],
            reward_points = validated_data['reward_points']
        )
        # Access the user.id after the user is created
        user_id = user.id
        return user

    def validate_password(self, value) :
        # Add password validation (length, complexity etc)
        if len(value) < 8 :
            raise serializers.ValidationError("Password must be atleast 8 characters")
        return value

