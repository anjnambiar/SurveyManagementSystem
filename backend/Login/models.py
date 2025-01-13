from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class CustomUserManager(BaseUserManager) :
    """ Custom user model manager where email is the unique
    identifier for authentication instead of username. """

    def create_user(self, email, password = None, **extra_fields) :
        #Create and save a user with the given email and password.
        if not email :
            return ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save(using = self.db)
        return user

    def create_superuser(self, email, password = None, **extra_fields) :
        #Create and save a SuperUser with the given email and password.
        extra_fields.setdefault('is_staff', True)
        return self.create_user(email, password, **extra_fields)


# Create your models here.
class CustomUser(AbstractBaseUser, PermissionsMixin) :
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    contactNum = models.IntegerField(max_length=20)
    password = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS=["name","contactNum","password"]
    objects = CustomUserManager()

    def has_perm(self, perm, obj = None):
        return True #return true if user has a specific permission
    
    def has_module_perms(self, app_label):
        return True # return true if the user has permission for the given app

    def __str__(self):
        return self.email
    

class PasswordResetModel(models.Model) :
    email = models.EmailField()
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email