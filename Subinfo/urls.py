from  django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .import views,viewserializer
from .viewserializer import InformationApiView
urlpatterns=[

    path('home/',views.homeviews,name="homeviews"),
    path('homes/',views.homepageviews,name="homepageviews"),
    path('', views.homepageviews, name="homepageviews"),

    path('home/(?P<userid>\d+)/',views.tempviews,name="tempviews"),

    #path('home/catalog/(?P<userid>\d+)/(?P<catid>\d+)/', views.catalogviews, name="catalogviews"),
    path('login/',views.LoginViews,name="LoginViews"),
    path('register/',views.registerviews,name="registerviews"),
    path('logout/',views.DoLogout,name="DoLogout"),
    path('postimg/', views.postimg, name="postimg"),

    path('home/catalog/(?P<userid>\d+)/(?P<catid>\d+)/',views.testings,name="testings"),
    path('home/sub/(?P<userid>\d+)/(?P<subid>\d+)/', views.subtestings, name="testings"),

    path('home/displaydetail/(?P<userid>\d+)/(?P<subid>\d+)/', views.displaydetails, name="testings"),



    path('questions/', views.questions, name="questions"),
    path('home/sub/api/', views.information, name="information"),

    path('home/hole/api/(?P<id>\d+)/', viewserializer.HoleApiView.as_view(), name="HoleApiView"),
    path('home/api/(?P<id>\d+)/', viewserializer.InformationApiView.as_view(), name="informationApiview"),
    path('home/update/api/(?P<id>\d+)/', viewserializer.UpdateInformationApiView.as_view(), name="UpdateinformationApiview"),
    path('home/subjects/',viewserializer.Subjectserializerview.as_view(),name="Subjectserializerview"),


    path('home/qu/api/(?P<id>\d+)/', viewserializer.QuestionApiView.as_view(), name="QuestionApiview"),
    path('home/modelquestion/api/(?P<id>\d+)/', viewserializer.ModelQuestionApiView.as_view(), name="ModelQuestionApiView"),
    path('home/modelversion/api/(?P<id>\d+)/', viewserializer.ModelversionserializerView.as_view(), name="ModelVersionApiView"),

    path('home/model/', viewserializer.ModeltestApiView.as_view(), name="ModelQuestionApiView"),
    path('home/modelquestion/api/', viewserializer.modelquestionView,name="ModelQuestionApiView"),
    path('home/event/api/', viewserializer.EventserializerView.as_view(),name="EventserializerView"),

    path('home/exam/api/(?P<id>\d+)/(?P<nq>\d+)/', viewserializer. ExamserializerView.as_view(), name=" ExamserializerView"),
    path('info/home/modelversion/',viewserializer.modeltestversion,name="modeltest"),
    path('info/home/bcmodel/',views.bcsmodel,name="bcsmodel"),


    path('home/single/api/(?P<id1>\d+)/(?P<id2>\d+)/',viewserializer.SingleContentView.as_view(),name="SingleContentView"),
    path('home/upsingle/api/(?P<id1>\d+)/(?P<id2>\d+)/',viewserializer.UpdateSingleContentView.as_view(),name="UpdateSingleContentView"),
    path('home/upaddonebyone/api/(?P<id1>\d+)/(?P<id2>\d+)/',viewserializer.UpdateLimitContentView.as_view(),name="SingleContentView"),

  #  path('home/subject/api/', viewserializer.SelectSubjectView.as_view(),name="SelectSubjectView"),





    path('playit/', views.playit, name="playit"),

    path('basic-upload/', views.BasicUploadView.as_view(), name='basic_upload'),

    path('basic-uploadq/', views.BasicUploadViewQ.as_view(), name='basic_uploadq'),

    path('trans/', views.Phototransfer, name="trans"),
    path('del/', views.Del, name="Del"),


    path('preroot/(?P<id>\d+)/', views.preroot, name="preroot"),
    path('preroot1/', views.preroot1, name="preroot1"),
    path('preroot2/(?P<id>\d+)/', views.preroot2, name="preroot2"),

    path('word/', views.Word, name="word"),
    path('subword/', views.Submitword, name="subword"),
    path('subtopic/', views.Submitropic, name="Submitropic"),
    path('exam/', views.Examination, name="Examination"),
    path('addonebyone/(?P<id1>\d+)/(?P<id2>\d+)/(?P<id3>\d+)/',viewserializer.AddOneByOne.as_view(), name="AddOneByOne"),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
