from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import logout, login, authenticate
from django.core.mail import send_mail
from django.conf import settings

from .forms import EmailRegistrationForm, EmailLoginForm

def logout_view(request):
    logout(request)
    return redirect('accounts:post_logout')

def post_logout(request):
    messages.info(request, "You have logged out, see you soon!!")
    return redirect('UI:home')
def login_view(request):
    context = {}
    return render(request, 'login.html', context)
def register_view(request):
    if request.method == "POST":
        form = EmailRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # send welcome email
            send_mail(
                "Welcome to FitUs",
                f"Hello {user.username}, thanks for joining our fitness community "
                f".Feel free to reach out to support for any assistance !",
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
            # auto login after registration
            user = authenticate(request, username=user.username, password=form.cleaned_data['password1'])
            if user:
                login(request, user)
                messages.success(request, "Account created successfully.")
                return redirect("UI:home")  # replace with your page
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = EmailRegistrationForm()
    return render(request, "register.html", {"form": form})


def email_login_view(request):
    if request.method == "POST":
        form = EmailLoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email'].lower()
            password = form.cleaned_data['password']
            user = authenticate(request, username=email, password=password)
            if user:
                login(request, user)
                messages.success(request, "Logged in successfully.")
                return redirect("UI:home")
            else:
                messages.error(request, "Invalid email or password.")
    else:
        form = EmailLoginForm()
    return render(request, "email_login.html", {"form": form})


@login_required
def shop_view(request):
    context = {}
    return render(request, 'shop.html', context)

@login_required
def get_view(request):
    context = {}
    return render(request, 'get.html', context)

def reg_view(request):
    context = {}
    return render(request, 'reg.html', context)



