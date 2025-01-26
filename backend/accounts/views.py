"""
API CBV endpoints for user registration,
login, logout, and users listing
"""
from .serializers import UserSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,  IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer


CustomUser = get_user_model()


class RegisterView(generics.CreateAPIView):
    """
    POST method to create new user
    Endpoint: /api/v1/account/register/
    """
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class LoginViewTokenObtain(TokenObtainPairView):
    """
    POST: method to login user
    Endpoint: /api/v1/account/login/
    """
    serializer_class = MyTokenObtainPairSerializer
    permission_classes = [AllowAny]


class LogoutView(generics.GenericAPIView):
    """
    POST: method to logout user
    Endpoint: /api/v1/account/logout/
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Handles the token blacklisting to ensure user logged out
        """
        try:
            refresh_token = request.data.get("refresh")
            print(refresh_token)

            if not refresh_token:
                return Response({"detail": "Refresh token is required."},
                                status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"detail": "Successfully logged out."},
                            status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"detail": str(e)},
                            status=status.HTTP_400_BAD_REQUEST)


class UserList(generics.ListCreateAPIView):
    """
    GET list all system users
    Endpoint: /api/v1/account/users/
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
