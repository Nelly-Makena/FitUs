# accounts/signals.py
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver
from django.contrib import messages
print("hello bitch !")
@receiver(user_logged_in)
def on_login(sender, request, user, **kwargs):
    print("SIGNAL FIRED 🚀")
    name = user.get_full_name() or user.username
    messages.success(request, f"Successfully logged in as {name} ✅")


@receiver(user_logged_out)
def on_logout(sender, request, user, **kwargs):
    messages.info(request, "You have logged out 👋")
