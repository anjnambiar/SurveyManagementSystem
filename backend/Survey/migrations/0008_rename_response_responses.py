# Generated by Django 5.1.4 on 2025-01-27 17:07

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Survey', '0007_alter_option_option_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Response',
            new_name='Responses',
        ),
    ]
