from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Contact
from django.contrib.auth import logout, login, authenticate
from django.core.mail import send_mail
from django.conf import settings

from .forms import EmailRegistrationForm, EmailLoginForm, ContactForm

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
                # Show error on the SAME page
                messages.error(request, "Invalid email or password.")
                # Stay on email_login.html, not redirect
        else:
            # Show form validation errors
            messages.error(request, "Please correct the errors below.")
    else:
        form = EmailLoginForm()

    # Always render email_login.html (with messages if any)
    return render(request, "email_login.html", {"form": form})




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
        form = ContactForm(request.POST)
        if form.is_valid():
            try:
                # Save the contact form
                contact = form.save()

                # Send confirmation email to user
                try:
                    send_mail(
                        "We received your message - FitUs Support",
                        f"Hello {contact.name},\n\n"
                        f"Thank you for contacting FitUs support. We have received your message:\n\n"
                        f"{contact.message}\n\n"
                        f"Our team will get back to you shortly at {contact.email}.\n\n"
                        f"Best regards,\n"
                        f"FitUs Support Team",
                        settings.DEFAULT_FROM_EMAIL,
                        [contact.email],
                        fail_silently=True,
                    )
                except Exception as e:
                    print(f"Email sending failed: {e}")

                messages.success(request, 'Thank you! Your message has been sent. You will hear back shortly.')
                return redirect('accounts:help')

            except Exception as e:
                print(f"Database error: {e}")
                messages.error(request, 'An error occurred while sending your message. Please try again.')
        else:
            # Display form validation errors
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{error}")
    else:
        form = ContactForm()

    return render(request, 'help.html', {'form': form})