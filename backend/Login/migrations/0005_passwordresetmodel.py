# Generated by Django 5.1.4 on 2025-01-11 20:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Login', '0004_customuser_groups_customuser_is_superuser_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PasswordResetModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('token', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
