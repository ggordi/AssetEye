from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", views.CreateCustomUserView.as_view(), name='user-create'),  # POST
    path("token/", views.CustomTokenObtainPairView.as_view(), name='token-obtain'),  # GET
    path("token/refresh/", TokenRefreshView.as_view(), name='token-refresh'),  # GET

    path("stock-info/", views.stock_info, name='stock-info'),  # GET

    path("watchlist-add/", views.add_watchlist_stock, name="watchlist-add"), # POST
    path("watchlist-remove/", views.remove_watchlist_stock, name="watchlist-remove"), # POST
    path("watchlist-retrieve/", views.get_user_stocks, name="wathclist-retrieve"), # GET



    # DEPRACATE WHAT IS BELOW
    path('get-stock-info/', views.stock_info, name='get-stock-info'),  # GET
    path('get-trending-stocks/', views.get_trending_stocks, name='get-trending-stocks')
]