from django.shortcuts import render
def home_view(request):
    context = {}
    return render(request, 'home.html', context)

def training_view(request):
    context = {}
    return render(request, 'training.html', context)


def nutrition_view(request):
    context = {}
    return render(request, 'nutrition.html', context)

def help_view(request):
    context = {}
    return render(request, 'help.html', context)

def shop_view(request):
    context = {}
    return render(request, 'shop.html', context)