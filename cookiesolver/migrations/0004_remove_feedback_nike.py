# Generated by Django 3.2.9 on 2022-12-04 16:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cookiesolver', '0003_feedback_nike'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feedback',
            name='nike',
        ),
    ]
