from rest_framework import serializers, status
from rest_framework.response import Response 

from .models import Client, Employee, Task
from django.contrib.auth import authenticate
from django.contrib.auth.models import User, update_last_login


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('pk', 'name', 'address', 'city', 'street', 'building', 'phone', 'email', 'manager')


class EmployeeSerializer(serializers.ModelSerializer):
    position = serializers.CharField(source="get_position_display")
    clients = serializers.PrimaryKeyRelatedField(
        many=True, 
        source='client_set', 
        read_only=True
    )

    class Meta:
        model = Employee 
        fields = ('pk', 'position', 'name', 'clients')
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()

    class Meta:
        model = User
        fields = ('username', 'employee')
        depth = 1


class TaskSerializer(serializers.ModelSerializer):
    manager = serializers.StringRelatedField(required=False)
    client = ClientSerializer(read_only=True)

    class Meta:
        model = Task
        fields = ('pk', 'manager', 'date', 'description', 'client')
        depth = 1

    def create(self, data):
        request = self.context['request']
        client_pk = request.data.get('client')
        manager_pk = request.data.get('manager')

        client = Client.objects.get(pk=client_pk)
        manager = Employee.objects.get(pk=manager_pk)
        new_task = Task.objects.create(client=client, manager=manager, **data)
        return new_task
    

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255, required=True)
    password = serializers.CharField(max_length=100, required=True)