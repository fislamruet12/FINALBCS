from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import HttpResponse
from .models import modelevent,usermodeltest,marks
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializer import markserializer,usermodelserializer,userserializer
# Create your views here.
import logging
logger=logging.getLogger(__name__)
def examination(request,userid):
    return render(request,'subexam.html',{'userid':userid,})

def modeltestsubmit(request):
    return render(request,'modeltestsubmit.html',{'userid':1,})


def bcsmodelsubmit(request):
    return render(request,'bcsmodel.html',{'userid':1,})

def bcsversionsubmit(request):
    return render(request,'modelversion.html',{'userid':1,})

def modeltest(request):
    events=modelevent.objects.all()
    return render(request,'test/modeltest.html',{'events':events,})

#x="jun 5, 2020 19:37:00"
import json
from django.http import JsonResponse
@csrf_exempt
def allupload(request):
    if request.method=="POST":
        data = json.loads(request.POST.get('inform'))
        logger.error(data)
        modelevent.objects.all().delete()
        modelevent.objects.create(event=data['event'])
        return JsonResponse({"event":"created"})

    return render(request,'test/allupload.html',{'userid':1,})

def finalmodel(request):
    if request.user.is_authenticated:
        events=modelevent.objects.all()
        umd = []
        if usermodeltest.objects.filter(usermodeltest_id=request.user.id).exists():
            umt = usermodeltest.objects.filter(usermodeltest_id=request.user.id).order_by('-date').first()
            umd.append(umt)

        logger.error(events)
        return render(request, 'finalmodeltest.html', {'events': events,'umd':umd,})
    return render(request, 'finalmodeltest.html', {"od":1})


@csrf_exempt
def contestUp(request):
    if request.method=="POST":
        data = json.loads(request.POST.get('inform'))
        mark=data.pop('mark')
        user=User.objects.get(pk=request.user.id)
        um=user.usermodeltest_set.create(**data)
        for mr in mark:
           umr=um.marks_set.create(**mr)
        logger.error(umr)
        return JsonResponse({"ok":1})

class markserializerview(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request,mdl):
        usm=usermodeltest.objects.filter(test=mdl)
        serializer=usermodelserializer(usm,many=True)
        a=serializer.data
        for c in range(0, len(a) - 1):

            for d in range(0, len(a) - 1 - c):
                ind = a[d]['mark']
                ind1 = a[d + 1]['mark']
                if float(ind[0]['marks']) < float(ind1[0]['marks']):
                    swap = a[d]
                    a[d] = a[d + 1]
                    a[d + 1] = swap

        return Response(a)

class userserilaizerview(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request):
        usr=User.objects.all()
        serializer=userserializer(usr,many=True)
        a=serializer.data
        mydict={}
        for i in range(0, len(a)):
            mydict[a[i]['id']] = a[i]['username']
        logger.error(mydict)
        return Response(mydict)