from django.contrib import admin
from .models import Client, Employee, Task, Point

admin.site.register( (Client, Employee, Task, Point) )

