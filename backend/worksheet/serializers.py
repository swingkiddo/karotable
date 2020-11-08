from rest_framework import serializers
from .models import Client, Employee, Task
from django.contrib.auth.models import User

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('pk', 'name', 'address', 'phone_number')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class EmployeeSerializer(serializers.ModelSerializer):
    position = serializers.CharField(source="get_position_display")

    class Meta:
        model = Employee 
        fields = ('pk', 'position', 'name')
        depth = 1

class TaskSerializer(serializers.ModelSerializer):
    manager = EmployeeSerializer(read_only=True)
    driver = EmployeeSerializer(read_only=True)
    class Meta:
        model = Task
        fields = ('pk', 'manager', 'driver', 'task_date', 'description', 'client')
        depth = 1


