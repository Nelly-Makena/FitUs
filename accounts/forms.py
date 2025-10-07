# forms.py
from django import forms
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from .models import Contact

User = get_user_model()

class EmailRegistrationForm(forms.Form):
    email = forms.EmailField(label="Email")
    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(label="Confirm Password", widget=forms.PasswordInput)

    def clean_email(self):
        email = self.cleaned_data['email'].lower()
        if User.objects.filter(email=email).exists():
            raise ValidationError("This email is already registered.")
        return email

    def clean(self):
        cleaned_data = super().clean()
        p1 = cleaned_data.get("password1")
        p2 = cleaned_data.get("password2")
        if p1 and p2 and p1 != p2:
            raise ValidationError("Passwords do not match.")
        if p1 and len(p1) < 8:
            raise ValidationError("Password must be at least 8 characters.")
        return cleaned_data

    def save(self):
        email = self.cleaned_data['email'].lower()
        password = self.cleaned_data['password1']
        user = User.objects.create_user(username=email, email=email, password=password)
        return user


class EmailLoginForm(forms.Form):
    email = forms.EmailField(label="Email")
    password = forms.CharField(label="Password", widget=forms.PasswordInput)


class ContactForm(forms.ModelForm):
    terms = forms.BooleanField(
        required=True,
        error_messages={'required': 'You must agree to the terms and privacy policy.'},
        widget=forms.CheckboxInput(attrs={
            'id': 'terms',
        })
    )

    class Meta:
        model = Contact
        fields = ['name', 'email', 'phone', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Your Name',
                'id': 'name',
            }),
            'email': forms.EmailInput(attrs={
                'placeholder': 'your@email.com',
                'id': 'email',
            }),
            'phone': forms.TextInput(attrs={
                'placeholder': '+254-737-000-987',
                'id': 'phone',
            }),
            'message': forms.Textarea(attrs={
                'placeholder': 'Your message',
                'id': 'message',
            }),
        }
        labels = {
            'name': 'Your name *',
            'email': 'Your email *',
            'phone': 'Phone number *',
            'message': 'Message *',
        }

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if phone and len(phone) < 10:
            raise ValidationError("Please enter a valid phone number.")
        return phone