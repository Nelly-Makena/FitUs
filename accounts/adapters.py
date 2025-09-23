from django.contrib import messages
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth import get_user_model
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.exceptions import ImmediateHttpResponse

User = get_user_model()

class MySocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        if request.user.is_authenticated:
            return

        email = getattr(sociallogin.user, "email", None)
        if not email and getattr(sociallogin, "account", None):
            email = sociallogin.account.extra_data.get("email")

        if not email:
            return

        if User.objects.filter(email__iexact=email).exists():
            # add the error first
            messages.error(
                request,
                "An account with this email already exists. Please log in instead."
            )
            # redirect properly
            response = redirect(reverse("account_login"))
            raise ImmediateHttpResponse(response)
