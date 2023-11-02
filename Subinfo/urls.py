from  django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .import views,viewserializer
from .viewserializer import InformationApiView
urlpatterns=[

    path('home/',views.homeviews,name="homeviews"),
    path('homes/',views.homepageviews,name="homepageviews"),
    path('', views.homepageviews, name="homepageviews"),

    path('home/<int:userid>/',views.tempviews,name="tempviews"),

    #path('home/catalog/<userid>/<catid>/', views.catalogviews, name="catalogviews"),
    path('login/',views.LoginViews,name="LoginViews"),
    path('register/',views.registerviews,name="registerviews"),
    path('logout/',views.DoLogout,name="DoLogout"),
    path('postimg/', views.postimg, name="postimg"),

    path('home/catalog/<int:userid>/<int:catid>/',views.testings,name="testings1"),
    path('home/sub/<int:userid>/<int:subid>/', views.subtestings, name="testings2"),

    path('home/displaydetail/<int:userid>/<int:subid>/', views.displaydetails, name="testings3"),



    path('questions/', views.questions, name="questions"),
    path('home/sub/api/', views.information, name="information"),

    path('home/hole/api/<int:id>/', viewserializer.HoleApiView.as_view(), name="HoleApiView"),
    path('home/api/<int:id>/', viewserializer.InformationApiView.as_view(), name="informationApiview"),
    path('home/update/api/<int:id>/', viewserializer.UpdateInformationApiView.as_view(), name="UpdateinformationApiview"),
    path('home/subjects/',viewserializer.Subjectserializerview.as_view(),name="Subjectserializerview"),


    path('home/qu/api/<int:id>/', viewserializer.QuestionApiView.as_view(), name="QuestionApiview"),
    path('home/modelquestion/api/<int:id>/', viewserializer.ModelQuestionApiView.as_view(), name="ModelQuestionApiView"),
    path('home/modelversion/api/<int:id>/', viewserializer.ModelversionserializerView.as_view(), name="ModelVersionApiView"),

    path('home/model/', viewserializer.ModeltestApiView.as_view(), name="ModelQuestionApiView"),
    path('home/modelquestion/api/', viewserializer.modelquestionView,name="ModelQuestionApiView"),
    path('home/event/api/', viewserializer.EventserializerView.as_view(),name="EventserializerView"),

    path('home/exam/api/<int:id>/<int:nq>/', viewserializer. ExamserializerView.as_view(), name=" ExamserializerView"),
    path('info/home/modelversion/',viewserializer.modeltestversion,name="modeltest"),
    path('info/home/bcmodel/',views.bcsmodel,name="bcsmodel"),


    path('home/single/api/<int:id1>/<int:id2>/',viewserializer.SingleContentView.as_view(),name="SingleContentView"),
    path('home/upsingle/api/<int:id1>/<int:id2>/',viewserializer.UpdateSingleContentView.as_view(),name="UpdateSingleContentView"),
    path('home/upaddonebyone/api/<int:id1>/<int:id2>/',viewserializer.UpdateLimitContentView.as_view(),name="SingleContentView"),

  #  path('home/subject/api/', viewserializer.SelectSubjectView.as_view(),name="SelectSubjectView"),





    path('playit/', views.playit, name="playit"),

    path('basic-upload/', views.BasicUploadView.as_view(), name='basic_upload'),

    path('basic-uploadq/', views.BasicUploadViewQ.as_view(), name='basic_uploadq'),

    path('trans/', views.Phototransfer, name="trans"),
    path('del/', views.Del, name="Del"),


    path('preroot/<int:id>/', views.preroot, name="preroot"),
    path('preroot1/', views.preroot1, name="preroot1"),
    path('preroot2/<int:id>/', views.preroot2, name="preroot2"),

    path('word/', views.Word, name="word"),
    path('subword/', views.Submitword, name="subword"),
    path('subtopic/', views.Submitropic, name="Submitropic"),
    path('exam/', views.Examination, name="Examination"),
    path('addonebyone/<int:id1>/<int:id2>/<int:id3>/',viewserializer.AddOneByOne.as_view(), name="AddOneByOne"),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
