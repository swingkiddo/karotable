from django.db import models
from django.contrib.auth.models import User

class PositionsContainer:
    MANAGER = "MG"
    DRIVER = "DR"
    LOADER = "LD"
    POSITION_CHOICES = [
        (MANAGER, "Менеджер"),
        (DRIVER, "Водитель"),
        (LOADER, "Грузчик")
    ]


class EmployeeManager(models.Manager):
    def get_managers(self):
        qs = super().get_queryset()
        return qs.filter(position='MG')

    def get_drivers(self):
        queryset = super().get_queryset()
        return queryset.filter(position='DR') 


class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    position = models.CharField(max_length=2, choices=PositionsContainer.POSITION_CHOICES)
    name = models.CharField(max_length=30, default='Noname')
    objects = EmployeeManager()

    def __str__(self):
        return self.name


class Client(models.Model):
    name = models.CharField(max_length=20)
    address = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=50, null=True)
    street = models.CharField(max_length=50, null=True)
    building = models.CharField(max_length=20, null=True)
    phone = models.CharField(max_length=15)
    email = models.EmailField(null=True)
    manager = models.ForeignKey(Employee, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class Task(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, null=True)
    manager = models.ForeignKey(Employee, on_delete=models.CASCADE, null=True, blank=True, related_name='tasks')
    date = models.DateField(null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=200)

    class Meta:
        ordering = ['date_created']

    def __str__(self):
        return "{} {}".format(self.date, self.description)