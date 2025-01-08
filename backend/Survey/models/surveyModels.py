from django.db import models

# Create your models here.
class Survey(models.Model) :
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    reward_points = models.IntegerField()
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
