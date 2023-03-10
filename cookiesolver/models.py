from django.db import models

# Create your models here.
class COOKIE_COUNT(models.Model):
    SEARCH_COUNT = models.IntegerField(default = 0)
