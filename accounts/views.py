from django.shortcuts import render

# Create your views here.
def login_view(request):
    context = {}
    return render(request, 'login.html', context)


def shop_view(request):
    context = {}
    return render(request, 'shop.html', context)

def get_view(request):
    context = {}
    return render(request, 'get.html', context)

def reg_view(request):
    context = {}
    return render(request, 'reg.html', context)

