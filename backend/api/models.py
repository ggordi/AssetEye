from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Stock(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=200)

class CustomUser(AbstractUser):  # need a custom user model for email and first_name fields
    email = models.EmailField(max_length=100, unique=True)
    watchlist = models.ManyToManyField('Stock', related_name='users')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


# need to switch AUTH_USER_MODEL to our custom user in settings.py