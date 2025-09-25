from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import logout
from django.shortcuts import redirect

def logout_view(request):
    logout(request)
    return redirect('accounts:post_logout')

def post_logout(request):
    messages.info(request, "You have logged out, see you soon!!")
    return redirect('UI:home')


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



