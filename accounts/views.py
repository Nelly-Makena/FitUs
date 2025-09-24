from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import logout
from django.shortcuts import redirect

def logout_view(request):
    logout(request)  # clears the session
    return redirect('UI:home')  # redirect to home page
def login_view(request):
    context = {}
    return render(request, 'login.html', context)

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



