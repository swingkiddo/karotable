# Generated by Django 3.1.3 on 2020-12-09 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worksheet', '0021_point'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='building',
        ),
        migrations.RemoveField(
            model_name='client',
            name='street',
        ),
        migrations.AlterField(
            model_name='client',
            name='address',
            field=models.CharField(max_length=100, null=True),
        ),
    ]