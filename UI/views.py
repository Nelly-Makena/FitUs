from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib import messages


def home_view(request):
    messages.info(request, "Test message 👋")
    context = {}
    return render(request, 'home.html', context)

@login_required
def training_view(request):
    context = {}
    return render(request, 'training.html', context)

@login_required
def nutrition_view(request):
    context = {}
    return render(request, 'nutrition.html', context)
@login_required
def help_view(request):
    context = {}
    return render(request, 'help.html', context)

@login_required
def progress_view(request):
    context = {}
    return render(request, 'progress.html', context)
@login_required
def survey_view(request):
    context = {}
    return render(request, 'survey.html', context)
@login_required
def results_view(request):
    context = {}
    return render(request, 'results.html', context)





