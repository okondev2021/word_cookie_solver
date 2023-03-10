from django.urls import path
from .views import cookie_solver

urlpatterns = [
    path("",cookie_solver.index,name="index"),
    path("Solution",cookie_solver.solution,name="solution"),
    path("About",cookie_solver.about,name="about"),
    path("Search",cookie_solver.search,name= "search"),

    # api
    path('getUserInput',cookie_solver.getUserInput,name="getUserInput"),
    path('incrementSearchCount',cookie_solver.increment_Search_Count,name="incrementSearchCount")
]