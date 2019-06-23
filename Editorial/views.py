from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions
from .models import editorial
from .serializer import editorialserializer
from rest_framework.response import Response
import json
import logging
logger = logging.getLogger(__name__)
def home(request):
    editorials=editorial.objects.all().order_by('-date')
    return render(request,'home.html',{'editorials':editorials})

def upload(request):
    return render(request,'upload.html',{})

class editorialView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request,id):
        dt=editorial.objects.get(id=id)
        serializer=editorialserializer(dt,many=False)
        return Response(serializer.data)
    def post(self,request):
        data = json.loads(request.POST.get('inform'))
        logger.error(data)
        serializer=editorialserializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.data,status=400)
