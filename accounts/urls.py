from django.urls import path
from .views import login_view,shop_view,get_view,reg_view,logout_view

app_name = 'accounts'

urlpatterns = [
    path('shop/',shop_view,name='shop'),
    path('get/',get_view,name='get'),
    path('login/',login_view,name='login'),
    path('reg/',reg_view,name='reg'),
    path('logout/', logout_view, name='logout'),

]