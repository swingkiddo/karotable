# Generated by Django 3.1.3 on 2020-11-08 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worksheet', '0008_auto_20201106_0547'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='task_date',
            field=models.DateField(null=True),
        ),
    ]
