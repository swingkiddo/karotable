# Generated by Django 3.1.3 on 2020-11-25 06:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('worksheet', '0013_auto_20201123_0515'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='task_date',
            new_name='date',
        ),
    ]
