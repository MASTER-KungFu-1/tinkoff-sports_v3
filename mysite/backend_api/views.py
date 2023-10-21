from django.shortcuts import render
from rest_framework.views import APIView
from .models import Team, Tourney
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication 

# Create your views here.
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import UserSerializer, LoginRequestSerializer
from django.contrib.auth import authenticate, login,logout

class GetUserViews(APIView):

    def get(self, request):
        if UserSerializer(request.user).data.get('username'):
            return Response({
                'data': UserSerializer(request.user).data
            },status=200)
        else:
            return Response({
                'data': UserSerializer(request.user).data
            },status=401)


class LoginView(APIView):
    def post(self, request):
        data = request.data
        print(data)
        serializer = LoginRequestSerializer(data=data)
        if serializer.is_valid():
            authenticated_user = authenticate(**serializer.validated_data)
            if authenticated_user is not None:
                login(request, authenticated_user)
                return Response({'status': 'Success'})
            else:
                return Response({'error': 'Invalid credentials'}, status=403)
        else:
            return Response(serializer.errors, status=400)
        
class LogoutView(APIView):
    def get(self, request):
        data = request.data
        logout(request)
        return Response({'status': 'Success'}, status=200)



class CreateUserView(APIView):
    def post(self,request):
        data = request.data
        print(data)
        if data.get('username') and data.get('password'):
            
            username = data['username']
            password = data['password']
            user = User.objects.create_user(username=username, password=password)
            user.save()
            return Response('ok',status=200)
        else:
            return Response('error',status=404)
        


class TeamView(APIView):
    def get(self, request):
        output = [{
            'id': output.id,
            'name': output.name
            } for output in Team.objects.all()
        ]
        return Response(output)
    


class TourneyView(APIView):
    def get(self, request):
        output = [{
            'name': output.name,
            'status': output.status
            } for output in Tourney.objects.all()
        ]
        return Response(output)