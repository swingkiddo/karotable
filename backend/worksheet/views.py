from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.utils.datastructures import MultiValueDictKeyError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Client, Employee, Task, Point
from .serializers import ClientSerializer, EmployeeSerializer, TaskSerializer, UserSerializer, LoginSerializer, PointSerializer


class CurrentUser(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request):
        try:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        except AttributeError:
            return Response({"message": "You must to be logged in"})

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        print(request.user)
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.data['username'],
                password=serializer.data['password'])
            if user:
                login(request, user)
                print(request.user)
                return Response({"message": "You've logged in"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def get(self, request):
        logout(request)
        return Response({"message": "You've been logged out"})


class ClientsListView(APIView):
    authentication_classes = (JWTAuthentication, )
    def get(self, request):
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, context={"request": request}, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClientDetailView(APIView):
    def get_client(self, pk):
        try:
            return Client.objects.get(pk=pk)
        except Client.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        client = self.get_client(pk)
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    def patch(self, request, pk):
        client = self.get_client(pk)
        serializer = ClientSerializer(client, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        client = self.get_client(pk)
        client.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EmployeesListView(APIView):
    authentication_classes = (JWTAuthentication, )
    def get(self, request):
        managers = Employee.objects.get_managers()
        drivers = Employee.objects.get_drivers()
        managers_serializer = EmployeeSerializer(managers, context={"request": request}, many=True)
        drivers_serializer = EmployeeSerializer(drivers, context={"request": request}, many=True)
        return Response({"managers": managers_serializer.data,
                         "drivers": drivers_serializer.data})


class TasksListView(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, context={"request": request}, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetailView(APIView):
    def get_task(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        task = self.get_task(pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    
    
    def patch(self, request, pk):
        task = self.get_task(pk)
        try:
            if request.data['client']:
                task.client_id = request.data['client']
                task.save()
        except MultiValueDictKeyError:
            pass
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        task = self.get_task(pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PointsListView(APIView):
    def get(self,request):
        points = Point.objects.all()
        serializer = PointSerializer(points, context={"request": request}, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PointSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PointsDetailView(APIView):
    def get_point(self, pk):
        try:
            return Point.objects.get(pk=pk)
        except Point.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        point = self.get_point(pk)