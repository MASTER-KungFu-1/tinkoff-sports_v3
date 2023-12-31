# Generated by Django 4.2.6 on 2023-10-20 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Team_Tourney',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('team_id', models.IntegerField()),
                ('tourney_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Tourney',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('status', models.CharField(max_length=8)),
            ],
        ),
        migrations.CreateModel(
            name='User_Team',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('user_id', models.IntegerField()),
                ('team_id', models.IntegerField()),
            ],
        ),
    ]
