from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class User(models.Model) :
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    contactNum = models.IntegerField(max_length=20)
    password = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    is_Admin = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS=["name","contactNum","password","date_of_birth"]
    objects = models.CustomUserManager()

class CustomUserManager(BaseUserManager) :
    def createUser(self, email, password = None, **extra_fields) :
        if not email :
            return ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)
        user.setPassword(password)
        user.save(using = self.db)
        return user

    def createSuperUser(self, email, password = None, **extra_fields) :
        extra_fields.setdefault('is_superUser', True)
        return self.creareUser(email, password, **extra_fields)
