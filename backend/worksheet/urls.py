from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('clients/', ClientsListView.as_view()),
    path('clients/<int:pk>/', ClientDetailView.as_view()),
    path('employees/', EmployeesListView.as_view()),
    path('tasks/', TasksListView.as_view()),
    path('tasks/<int:pk>/', TaskDetailView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('current-user/', CurrentUser.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]