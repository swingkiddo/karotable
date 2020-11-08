from django.contrib import admin
from .models import Client, Employee, Task

admin.site.register( (Client, Employee, Task) )

