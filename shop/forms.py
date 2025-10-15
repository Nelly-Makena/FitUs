from django import forms

class CheckoutForm(forms.Form):
    full_name = forms.CharField(max_length=200)
    email = forms.EmailField()
    address = forms.CharField(max_length=255)
    phone = forms.CharField(max_length=15)
