from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", views.CreateCustomUserView.as_view(), name='user-create'),  # POST
    path("token/", views.CustomTokenObtainPairView.as_view(), name='token-obtain'),  # GET
    path("token/refresh/", TokenRefreshView.as_view(), name='token-refresh'),  # GET
]