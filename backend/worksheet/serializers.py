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
    manager = serializers.StringRelatedField()
    driver = serializers.StringRelatedField()
    client = ClientSerializer()

    class Meta:
        model = Task
        fields = ('pk', 'manager', 'driver', 'task_date', 'description', 'client')
        depth = 1

    def validate_client(self, value):
        print("check")
        if type(value) != int:
            raise serializers.ValidationError("not a number")
        return value

    def create(self, validated_data):
        print(validated_data)
        client_id = validated_data.pop('client')
        client_obj = Client.objects.get(pk=client_id)
        task = Task.objects.create(client=client_obj, **validated_data)
        return task

