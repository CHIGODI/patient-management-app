#!/usr/bin/env python

"""
This module contains the URL configuration for the accounts app.
"""
from django.urls import path
from .views import (RegisterView, LogoutView, LoginViewTokenObtain,
                    UserUpdateView, GetUserByEmailView)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginViewTokenObtain.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('update/<int:id>/', UserUpdateView.as_view(), name='logout'),
    path('user/<str:email>/', GetUserByEmailView.as_view(), name='get_user')
]
