from django.contrib import admin
from .models import Team, Team_Tourney ,User_Team ,Tourney
# Register your models here.

admin.site.register(Team)
admin.site.register(Team_Tourney)
admin.site.register(User_Team)
admin.site.register(Tourney)