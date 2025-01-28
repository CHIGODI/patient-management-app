"""
API CBV endpoints for user registration,
login, logout, and users listing
"""
from .serializers import UserSerializer, UserUpdateSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,  IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


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

class GetUserByEmailView(APIView):
    """
    GET user by their email
    Endpoint: /api/v1/account/user/
    """
    def get(self, request, email):
        user = get_object_or_404(CustomUser, email=email)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserUpdateView(APIView):
    """
    PUT a user's details (update)
    Endpoint: /api/v1/account/update/<int:id>/
    """
    permission_classes = [IsAuthenticated]

    def put(self, request, id):
        user = get_object_or_404(CustomUser, id=id)
        data = request.data
        data['password'] = user.password
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            updated_user = serializer.save()
            updated_user_serializer = UserSerializer(updated_user)
            return Response(updated_user_serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
