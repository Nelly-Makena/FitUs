from django.urls import path
from .views import home_view,training_view,nutrition_view,help_view

app_name = 'UI'

urlpatterns = [
    path('', home_view, name='home'),
    path('training/', training_view, name='training'),
    path('nutrition/',nutrition_view, name='nutrition'),
    path('help/',help_view,name='help'),

]