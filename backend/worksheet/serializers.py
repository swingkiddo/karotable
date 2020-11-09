from rest_framework import serializers, status
from rest_framework.response import Response 
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
    manager = serializers.StringRelatedField()
    driver = serializers.StringRelatedField()
    client = ClientSerializer(read_only=True)

    class Meta:
        model = Task
        fields = ('pk', 'manager', 'driver', 'task_date', 'description', 'client')
        depth = 1

    def create(self, data):
        request = self.context['request']
        manager = Employee.objects.get(pk=request.data.get('manager'))
        driver = Employee.objects.get(pk=request.data.get('driver'))
        client = Client.objects.get(pk=request.data.get('client'))
        new_task = Task.objects.create(manager=manager, driver=driver, client=client, **data)
        return new_task