# Generated by Django 3.1.3 on 2020-11-08 08:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('worksheet', '0009_auto_20201108_1031'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='client',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='worksheet.client'),
        ),
    ]