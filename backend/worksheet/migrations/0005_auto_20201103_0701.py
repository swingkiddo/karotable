# Generated by Django 3.1.3 on 2020-11-03 07:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('worksheet', '0004_auto_20201103_0643'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='manager',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='worksheet.employee'),
        ),
    ]
