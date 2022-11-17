from django.urls import path
from . import views

urlpatterns = [
    path("",views.index,name="index"),
    path("Solution",views.solution,name="solution"),
    path("About",views.about,name="about"),
    path("FeedBack",views.feedback,name="feedback"),
    path('Cookieadmin',views.adminpage,name="adminpage"),


    # api
    path('getUserInput',views.getUserInput,name="getUserInput"),
]