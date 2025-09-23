# accounts/signals.py
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect
from allauth.socialaccount.signals import pre_social_login
from django.dispatch import receiver

User = get_user_model()

@receiver(pre_social_login)
def check_existing_user(sender, request, sociallogin, **kwargs):
    email = sociallogin.account.extra_data.get("email")
    print("🔴 Google returned:", sociallogin.account.extra_data)
    print("🔴 Extracted email:", email)

    if email:
        try:
            # If user already exists, connect the Google login
            user = User.objects.get(email=email)
            sociallogin.connect(request, user)
            return  # ✅ existing user can log in normally
        except User.DoesNotExist:
            # ❌ Block new signup, redirect back to login page
            messages.error(request, "This email already exists. Please log in instead.")
            return HttpResponseRedirect("/login/")  #redirect
