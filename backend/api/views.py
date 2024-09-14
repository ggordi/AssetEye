from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from .models import CustomUser, Stock
from rest_framework import generics, status
from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer, StockSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_stocks(request):
    stocks = request.user.watchlist.all()
    serializer = StockSerializer(stocks, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def stock_in_watchlist(request):
    ticker = request.data.get('ticker')
    return Response({"is_in_watchlist": request.user.watchlist.filter(ticker=ticker).exists()}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_watchlist_stock(request):
    ticker = request.data.get('ticker')
    name = request.data.get('name')

    stock, created = Stock.objects.get_or_create(ticker=ticker, defaults={'name': name})
    request.user.watchlist.add(stock)

    return Response("sucess", status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_watchlist_stock(request):
    ticker = request.data.get('ticker')

    stock = Stock.objects.get(ticker=ticker)

    request.user.watchlist.remove(stock)

    return Response("success", status=status.HTTP_200_OK)
