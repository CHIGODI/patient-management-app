"""
Serializers for the User model
"""
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


CustomUser = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model"""
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password',
                  'date_joined', 'id', 'phone', 'is_active', 'first_name',
                  'last_name', 'is_staff')

        extra_kwargs = {
            'password': {'write_only': True},
        }

    # overide default serializer create_user to hash password
    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserUpdateSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'phone', 'first_name', 'last_name']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom token serializer to include user"""
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add custom claims (user object)
        user_data = UserSerializer(self.user).data
        data['user'] = user_data

        return data
