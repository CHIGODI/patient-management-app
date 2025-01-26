from django.contrib import admin
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

# Registering the models with the admin site
admin.site.register(CustomUser)