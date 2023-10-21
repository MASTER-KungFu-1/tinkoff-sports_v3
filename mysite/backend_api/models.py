from django.db import models

# Create your models here.

class Tourney(models.Model):
    id = models.AutoField(primary_key=True),
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=8)

    def __str__(self):
        return self.name

class Team(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class User_Team(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=False)
    team_id = models.IntegerField(null=False)

class Team_Tourney(models.Model):
    id = models.AutoField(primary_key=True)
    team_id = models.IntegerField(null=False)
    tourney_id = models.IntegerField(null=False)

