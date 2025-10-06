from django.urls import path
from .views import login_view,shop_view,get_view,reg_view,logout_view,post_logout,register_view,email_login_view,help_view

app_name = 'accounts'

urlpatterns = [
    path('shop/',shop_view,name='shop'),
    path('get/',get_view,name='get'),
    path('login/',login_view,name='login'),
    path('reg/',reg_view,name='reg'),
    path('logout/', logout_view, name='logout'),
    path("post-logout/", post_logout, name="post_logout"),
    path("register/", register_view, name="register"),
    path("email-login/", email_login_view, name="email_login"),
    path('help/', help_view, name='help'),

]