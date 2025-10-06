from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Contact
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


@login_required
def help_view(request):
    if request.method == 'POST':
        # Get form data
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        phone = request.POST.get('phone', '').strip()
        message = request.POST.get('message', '').strip()
        terms = request.POST.get('terms')

        # Validate required fields
        if not all([name, email, phone, message, terms]):
            messages.error(request, 'Please fill in all required fields and accept the terms.')
            return render(request, 'help.html')

        # Basic email validation
        if '@' not in email or '.' not in email.split('@')[-1]:
            messages.error(request, 'Please enter a valid email address.')
            return render(request, 'help.html')

        try:
            # Save to database
            Contact.objects.create(
                name=name,
                email=email,
                phone=phone,
                message=message
            )

            # Send confirmation email to user (optional but recommended)
            try:
                send_mail(
                    "We received your message - FitUs Support",
                    f"Hello {name},\n\n"
                    f"Thank you for contacting FitUs support. We have received your message:\n\n"
                    f"{message}\n\n"
                    f"Our team will get back to you shortly at {email}.\n\n"
                    f"Best regards,\n"
                    f"FitUs Support Team",
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Email sending failed: {e}")

            messages.success(request, 'Thank you! Your message has been sent. You will hear back shortly.')
            return redirect('accounts:help')

        except Exception as e:
            print(f"Database error: {e}")
            messages.error(request, 'An error occurred while sending your message. Please try again.')
            return render(request, 'help.html')

    return render(request, 'help.html')