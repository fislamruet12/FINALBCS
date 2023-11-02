from django.shortcuts import render, redirect
from .models import subjects, subcatagory, contcatagory,contentelement,imgs,types,word,wordtime,version,modelquestion,event,bcsmodel
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .forms import RegisterForm, LoginForm
import logging
from django.http import JsonResponse
from .serializers import Inforserializer
import simplejson
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
logger = logging.getLogger(__name__)
import json
def homepageviews(request):
    subject=subjects.objects.all()
    cnt=7
    return render(request,'Subinfo/homepage.html',{'subject':subject,'cnt':cnt})

def homeviews(request):
    value = subjects.objects.all()
    ids = 3
    subcat = subcatagory.objects.filter(subject_id=ids)
    context = {
        'value': value,
        'subcat': subcat,
        'ids': ids,
    }
    return render(request, 'Subinfo/home.html', context)


def tempviews(request, userid):

    rendervalue = subjects.objects.get(pk=userid)
    subcat = rendervalue.subcatagory_set.all().first()
    content=subcat.contcatagory_set.all().first()
    catid=content.id

    context = {
        'rendervalue': rendervalue,
        'userid': userid,
        'catid':catid


    }
    return render(request, 'Subinfo/testing.html', context)


def catalogviews(request, userid, catid):

    value = subjects.objects.all()
    rendervalue = subjects.objects.get(pk=userid)
    catalogs = contcatagory.objects.get(pk=catid)

    split = []
    besplit = catalogs.contentelement_set.all()

    for sp in besplit:
        split.append(sp.content.split('.'))

    context = {
        'value': value,
        'rendervalue': rendervalue,
        'catalogs': catalogs,
        'userid': userid,
        'split': split,
        'catid':catid
    }
    return render(request, 'Subinfo/index.html', context)


def registerviews(request):
    c_u = request.POST.get("next")
    if request.user.is_authenticated:
        return redirect(c_u)
    form = RegisterForm
    context = {
        'form': form,
    }

    if request.method == "POST":
        user = request.POST.get('user')
        email = request.POST.get('email')
        password = request.POST.get('password')
        re_password = request.POST.get('re_password')
        if password != re_password:
            raise ValueError('Password did not match')
        else:
            CreateUser = User.objects.create(username=user, email=email)
            CreateUser.set_password(password)
            CreateUser.save()
            CreateUser.wordtime_set.create(wid=CreateUser.id)
            auth = authenticate(request, username=user, password=password)

            if auth is not None:
                login(request, auth)
                return redirect(c_u)
    return render(request, 'Subinfo/register.html', context)


def LoginViews(request):
    form = LoginForm
    context = {
        'form': form,
    }

    c_u = request.POST.get("next")
    if request.user.is_authenticated:
        return redirect(c_u)
    else:
        if request.method == "POST":
            user = request.POST.get("user")
            password = request.POST.get("password")
            auth = authenticate(request, username=user, password=password)
            if auth is not None:
                login(request, auth)
                return redirect(c_u)
    return render(request, 'Subinfo/login.html', context)


def DoLogout(request):
    logout(request)
    return redirect('/info/homes/')


def testings(request, userid, catid):

    rendervalue = subjects.objects.get(pk=userid)
    context = {
        'rendervalue': rendervalue,
        'userid': userid,
        'catid':catid
    }
    return render(request, 'Subinfo/testing.html', context)

def subtestings(request, userid, subid):
    

    rendervalue = subjects.objects.get(pk=userid)
    subcata=subcatagory.objects.get(pk=subid)
    concata=subcata.contcatagory_set.all().first()
    if concata is not None:
        catid=concata.id
        context = {
        'rendervalue': rendervalue,
        'userid': userid,
        'catid':catid
         }
        return render(request, 'Subinfo/testing.html', context)
    return render(request, 'Subinfo/testing.html',{'rendervalue':rendervalue, 'userid': userid,})

def displaydetails(request, userid, subid):

    rendervalue = subjects.objects.get(pk=userid)
    catid=subid
    context = {
        'rendervalue': rendervalue,
        'userid': userid,
        'catid':catid,
         }
    return render(request, 'Subinfo/displaydetail.html', context)


def questions(request):
    return render(request, 'Subinfo/questions.html', {})



def information(request):
    if request.method == 'GET':

        dt = subjects.objects.all()
        serializer = Inforserializer(dt, many=True)
        return JsonResponse(serializer.data, safe=False)

def playit(request):
    return render(request, 'Subinfo/playit.html', {})

@csrf_exempt
def postimg(request):
    if request.method=='POST':

        return HttpResponse('')



from .forms import PhotoForm,QuForm
from .models import Photo
from rest_framework.views import APIView
from rest_framework import permissions
class BasicUploadView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        photos_list = Photo.objects.all()
        return render(self.request, 'Subinfo/filesub.html', {'photos': photos_list})

    def post(self, request):
        form = PhotoForm(self.request.POST, self.request.FILES)
        if form.is_valid():
            photo = form.save()
            data = {'is_valid': True, 'name': photo.file.name, 'url': photo.file.url}
        else:
            data = {'is_valid': False}
        return JsonResponse(data)

def Phototransfer(self):
    a=Photo.objects.all()
    for im in a:
        imgs.objects.create(im=im.file)

    logger.error(a)
    return HttpResponse('farid')

def Del(request):
    if request.method=='GET':
        Photo.objects.all().delete()
        return HttpResponse('')

class BasicUploadViewQ(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        photos_list = Photo.objects.all()
        return render(self.request, 'Subinfo/quesub.html', {'photos': photos_list})

    def post(self, request):
        form = QuForm(self.request.POST, self.request.FILES)
        if form.is_valid():
            photo = form.save()
            data = {'is_valid': True, 'name': photo.file.name, 'url': photo.file.url}
        else:
            data = {'is_valid': False}
        return JsonResponse(data)




def preroot(request,id):
  if request.method=='GET':
      val=contentelement.objects.filter(contcatagory_id=id)
      value=[]
      for x in val:
        data={'name':x.title,'id':x.id}
        value.append(data)
        logger.error("val"+x.content)
  return JsonResponse(value,safe=False)

def preroot1(request):
  if request.method=='GET':
      val=event.objects.all()
      value=[]
      for x in val:
        data={'name':x.name,'id':x.id}
        value.append(data)
  return JsonResponse(value,safe=False)

def preroot2(request,id):
  if request.method=='GET':
      val=version.objects.filter(bcs_id=id)
      value=[]
      for x in val:
        data={'versionname':x.versionname,'id':x.id}
        value.append(data)
  return JsonResponse(value,safe=False)



from django.http import Http404
from datetime import datetime,timezone,timedelta
from django.shortcuts import get_object_or_404
def Word(request):
    if request.user.is_authenticated:
        wt = wordtime.objects.get(word_id=request.user.id)
        prevous = wt.update
        now = datetime.now(timezone.utc)
        addtimes = prevous + timedelta(hours=6);
        if addtimes < now:
            words = word.objects.order_by("?").first()
            wt.wid=words.id
            wt.save()
            logger.error("random")
            return render(request, 'Subinfo/word.html', {"words": words, "ids": request.user.id})
        else:
            if wt.wid==request.user.id:
                words=word.objects.all().first()
                logger.error("index2 ")
            else:
                 words = word.objects.get(pk=wt.wid)
                 logger.error("index1 ")
        return render(request, 'Subinfo/word.html', {"words": words, "ids": request.user.id})

    return render(request, 'Subinfo/word.html', {})


@csrf_exempt
def Submitword(request):
    if request.method=='POST':
        data = json.loads(request.POST.get('inform'))
        t=word.objects.create(word=data['word'],type=data['type'],exp=data['exp'],an=data['an'],sn=data['sn'],quate=data['quate'])
        t.save()
        return JsonResponse(data)
    return render(request, 'Subinfo/subword.html', {})

@csrf_exempt
def Submitropic(request):
    if request.method=='POST':
        data = json.loads(request.POST.get('inform'))
        logger.error(data['catagory'])
        sb=subjects.objects.get(id=data['id'])
        ct = sb.subcatagory_set.create(catalist=data["catalist"])
        catagory = data['catagory']
        for x in catagory:
            ct.contcatagory_set.create(**x)
        return JsonResponse(data)
    return render(request, 'Subinfo/subtopic.html', {})

def Examination(request):
    return render(request,'Subinfo/Exam.html',{})

@csrf_exempt
def bcsmodel(request):
    if request.method == 'POST':
        data = json.loads(request.POST.get('inform'))
        sb=subjects.objects.all()
        event.objects.create(**data)
        for sbs in sb:
            sbc=sbs.subcatagory_set.all()
            for sbcs in sbc:
                con=sbcs.contcatagory_set.all()
                for cons in con:
                    elm=cons.contentelement_set.all()
                    for elms in elm:
                        ck=elms.bcsmodel_set.create(**data)
        if ck:
         return JsonResponse(data)
    return HttpResponse("hello1")



