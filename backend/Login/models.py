from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class CustomUser(AbstractBaseUser) :
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    contactNum = models.IntegerField(max_length=20)
    password = models.CharField(max_length=50)
    is_Admin = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS=["name","contactNum","password"]
    objects = models.CustomUserManager()

    def __str__(self):
        return self.email



class CustomUserManager(BaseUserManager) :
    """Custom user model manager where email is the unique
    identifier for authentication instead of username."""

    def createUser(self, email, password = None, **extra_fields) :
        """Create and save a user with the given email and password."""
        if not email :
            return ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)
        user.setPassword(password)
        user.save(using = self.db)
        return user

    def createSuperUser(self, email, password = None, **extra_fields) :
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_superUser', True)
        return self.createUser(email, password, **extra_fields)
