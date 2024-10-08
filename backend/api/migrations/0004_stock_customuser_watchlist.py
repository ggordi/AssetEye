# Generated by Django 5.1.1 on 2024-09-12 02:57

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_alter_customuser_first_name"),
    ]

    operations = [
        migrations.CreateModel(
            name="Stock",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("ticker", models.CharField(max_length=10, unique=True)),
                ("name", models.CharField(max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name="customuser",
            name="watchlist",
            field=models.ManyToManyField(related_name="users", to="api.stock"),
        ),
    ]
