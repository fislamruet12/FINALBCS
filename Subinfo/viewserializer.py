from .models import contcatagory,contentelement,question,types,subjects,subcatagory,bcsmodel,version,Photo,event,modettests
from .addserializer import Eventserializer ,Modeltestserializer,Modelversionserializer,Subjectserializer,Questionserializer,ModelQuestionTypeserializer, UpdateContentelemteserializer,Contcataserializer,QuestionTypeserializer,Contentelemteserializer,SubcataSerializer,UpdateContcataserializer,UpdateContentelemteserializer
from rest_framework import permissions,generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.contrib import messages
import json
import random
from rest_framework.parsers import DataAndFiles,FormParser,FileUploadParser,MultiPartParser,JSONParser
import logging
logger = logging.getLogger(__name__)

class InformationApiView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request,id):
        dt = contcatagory.objects.filter(pk=id)
        serializer = Contcataserializer(dt, many=True)
        return Response(serializer.data)

    def post(self,request,id):
        data = json.loads(request.POST.get('inform'))
        logger.error(data)
        seriallizer=Contcataserializer(data=data)
        if seriallizer.is_valid():
            seriallizer.save()
            return Response(seriallizer.data,status=201)
        return Response(seriallizer.errors,status=400)


class QuestionApiView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request,id):
        dt = types.objects.filter(types_id=id)
        serializer = QuestionTypeserializer(dt, many=True)
        return Response(serializer.data)
    def post(self,request,id):
        data = json.loads(request.POST.get('inform'))
        logger.error(data)
        serializer = QuestionTypeserializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ModelQuestionApiView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request,id):
        dt = bcsmodel.objects.filter(bcsmodel_id=id)
        serializer = ModelQuestionTypeserializer(dt, many=True)
        return Response(serializer.data)

    def post(self,request,id):
        data = json.loads(request.POST.get('inform'))
        logger.error(data)
        serializer = ModelQuestionTypeserializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ModelversionserializerView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request,id):
        vdt=modettests.objects.get(pk=id)
        logger.error(vdt.test)
        dt = version.objects.filter(versionname=vdt.test)
        serializer = Modelversionserializer(dt, many=True)
        return Response(serializer.data)

    def post(self,request,id):
        data = json.loads(request.POST.get('inform'))
        logger.error(data)
        serializer = Modelversionserializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



class ModeltestApiView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request):
        dt = bcsmodel.objects.all()
        serializer = Modeltestserializer(dt, many=True)
        return Response(serializer.data)



class SingleContentView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request,id1,id2):
        dt=contentelement.objects.get(contcatagory_id=id1,pk=id2)
        serializer=Contentelemteserializer(dt,many=False)
        return Response(serializer.data)

class HoleApiView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request,id):
        dt = subcatagory.objects.filter(subject_id=id)
        serializer = SubcataSerializer(dt, many=True)
        return Response(serializer.data)



class UpdateInformationApiView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request,id):
        dt = contcatagory.objects.filter(pk=id)
        serializer = UpdateContcataserializer(dt, many=True)
        return Response(serializer.data)

    def post(self,request,id):
        data = json.loads(request.POST.get('inform'))
        #logger.error(data)
        serializer=UpdateContcataserializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.errors,status=400)

class UpdateSingleContentView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request,id1,id2):
        dt=contentelement.objects.get(pk=id2)
        serializer=UpdateContentelemteserializer(dt,many=False)
        return Response(serializer.data)



class AddOneByOne(APIView):
    permission_classes = (permissions.AllowAny)
    def get (self,request,id1,id2,id3):
        dt=contentelement.objects.get(contcatagory_id=id1,pk=id2)
        serializer=UpdateContentelemteserializer(dt,many=False)
        return Response(serializer.data)


class UpdateLimitContentView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request,id1,id2):
        x=1
        x=int(id2)
        dt=contentelement.objects.filter(contcatagory_id=id1)[0+x:x+3]
        serializer=UpdateContentelemteserializer(dt,many=True)
        return Response(serializer.data)


class ExamserializerView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,requset,id,nq):
        sb = subjects.objects.get(pk=id)
        sbc = sb.subcatagory_set.all()
        qus=[]

        for sbce in sbc:
            cont = sbce.contcatagory_set.all()
            for conte in cont:
                contel = conte.contentelement_set.all()
                for contele in contel:
                    tp = contele.types_set.all()
                    for tpe in tp:
                        qu = tpe.question_set.all()
                        for q in qu:
                            qus.append(q)

        ar=random.sample(range(0, len(qus)), int(nq))
        ar.sort()
        qus1=[]
        cn=0
        for q in ar:
            qus1.append(qus[q])
        serializer=Questionserializer(qus1,many=True)
        return Response(serializer.data)

class Subjectserializerview(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request):
        sb=subjects.objects.all()
        serializer=Subjectserializer(sb,many=True)
        return Response(serializer.data)



@csrf_exempt
def modeltestversion(request):
    if request.method=='POST':
        data = json.loads(request.POST.get('inform'))
        dt = bcsmodel.objects.filter(name=data['name'])
        ev=event.objects.filter(name=data['name'])

        for e in ev:
            e.modettests_set.create(test=data['versionname'])
        logger.error(dt)
        for d in dt:
            ck=d.version_set.create(versionname=data['versionname'])

        if ck:
            return JsonResponse({"rs":"passed"})

    return HttpResponse("hello")

@csrf_exempt
def modelquestionView(request):
    if request.method=='POST':
        data = json.loads(request.POST.get('inform'))
        vr=version.objects.get(pk=data['id'])
        md = data['modelquestion']
        logger.error(md)
        for m in md:
            mq=vr.modelquestion_set.create(**m)

        if Photo.objects.all().exists():
            ph=Photo.objects.all()
            for p in ph:
                mq.que_pic=p.file
            mq.save()

        Photo.objects.all().delete()
        return JsonResponse({"rs": "passed"})

    return HttpResponse("hello")


class EventserializerView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request):
        sb=event.objects.all().order_by('-date')
        serializer=Eventserializer(sb,many=True)
        return Response(serializer.data)
