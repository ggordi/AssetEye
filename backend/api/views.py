from django.shortcuts import render
from django.http import JsonResponse
from .models import CustomUser
from rest_framework import generics
from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

import stocks

import scrape  # DEPRACATE THIS

# Create your views here.
class CreateCustomUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


def stock_info(request):
    ticker = request.GET.get('input')
    return JsonResponse({'info': stocks.stock_info(ticker)})


def get_trending_stocks(request):
    return JsonResponse({"trending stocks": scrape.get_trending_stocks()})

