from django.urls import path
from .views import *

urlpatterns = [
    path('clients/', ClientsListView.as_view()),
    path('clients/<int:pk>/', ClientDetailView.as_view()),
    path('employees/', EmployeesListView.as_view()),
    path('tasks/', TasksListView.as_view()),
    path('tasks/<int:pk>/', TaskDetailView.as_view()),
]