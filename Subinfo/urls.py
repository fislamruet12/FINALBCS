from  django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from .import views,viewserializer
from .viewserializer import InformationApiView
urlpatterns=[

    url(r'^home/$',views.homeviews,name="homeviews"),
    url(r'^homes/$',views.homepageviews,name="homepageviews"),
    url(r'^$', views.homepageviews, name="homepageviews"),

    url(r'^home/(?P<userid>\d+)/$',views.tempviews,name="tempviews"),

    #url(r'^home/catalog/(?P<userid>\d+)/(?P<catid>\d+)/$', views.catalogviews, name="catalogviews"),
    url(r'^login/$',views.LoginViews,name="LoginViews"),
    url(r'^register/$',views.registerviews,name="registerviews"),
    url(r'^logout/$',views.DoLogout,name="DoLogout"),
    url(r'^postimg/$', views.postimg, name="postimg"),

    url(r'^home/catalog/(?P<userid>\d+)/(?P<catid>\d+)/$',views.testings,name="testings"),
    url(r'^home/sub/(?P<userid>\d+)/(?P<subid>\d+)/$', views.subtestings, name="testings"),

    url(r'^home/displaydetail/(?P<userid>\d+)/(?P<subid>\d+)/$', views.displaydetails, name="testings"),



    url(r'^questions/$', views.questions, name="questions"),
    url(r'^home/sub/api/$', views.information, name="information"),

    url(r'^home/hole/api/(?P<id>\d+)/$', viewserializer.HoleApiView.as_view(), name="HoleApiView"),
    url(r'^home/api/(?P<id>\d+)/$', viewserializer.InformationApiView.as_view(), name="informationApiview"),
    url(r'^home/update/api/(?P<id>\d+)/$', viewserializer.UpdateInformationApiView.as_view(), name="UpdateinformationApiview"),
    url(r'^home/subjects/$',viewserializer.Subjectserializerview.as_view(),name="Subjectserializerview"),


    url(r'^home/qu/api/(?P<id>\d+)/$', viewserializer.QuestionApiView.as_view(), name="QuestionApiview"),
    url(r'^home/modelquestion/api/(?P<id>\d+)/$', viewserializer.ModelQuestionApiView.as_view(), name="ModelQuestionApiView"),
    url(r'^home/modelversion/api/(?P<id>\d+)/$', viewserializer.ModelversionserializerView.as_view(), name="ModelVersionApiView"),

    url(r'^home/model/$', viewserializer.ModeltestApiView.as_view(), name="ModelQuestionApiView"),
    url(r'^home/modelquestion/api/$', viewserializer.modelquestionView,name="ModelQuestionApiView"),
    url(r'^home/event/api/$', viewserializer.EventserializerView.as_view(),name="EventserializerView"),

    url(r'^home/exam/api/(?P<id>\d+)/(?P<nq>\d+)/$', viewserializer. ExamserializerView.as_view(), name=" ExamserializerView"),
    url(r'^info/home/modelversion/$',viewserializer.modeltestversion,name="modeltest"),
    url(r'^info/home/bcmodel/$',views.bcsmodel,name="bcsmodel"),


    url(r'^home/single/api/(?P<id1>\d+)/(?P<id2>\d+)/$',viewserializer.SingleContentView.as_view(),name="SingleContentView"),
    url(r'^home/upsingle/api/(?P<id1>\d+)/(?P<id2>\d+)/$',viewserializer.UpdateSingleContentView.as_view(),name="UpdateSingleContentView"),
    url(r'^home/upaddonebyone/api/(?P<id1>\d+)/(?P<id2>\d+)/$',viewserializer.UpdateLimitContentView.as_view(),name="SingleContentView"),

  #  url(r'^home/subject/api/$', viewserializer.SelectSubjectView.as_view(),name="SelectSubjectView"),





    url(r'^playit/$', views.playit, name="playit"),

    url(r'^basic-upload/$', views.BasicUploadView.as_view(), name='basic_upload'),

    url(r'^basic-uploadq/$', views.BasicUploadViewQ.as_view(), name='basic_uploadq'),

    url(r'^trans/$', views.Phototransfer, name="trans"),
    url(r'^del/$', views.Del, name="Del"),


    url(r'^preroot/(?P<id>\d+)/$', views.preroot, name="preroot"),
    url(r'^preroot1/$', views.preroot1, name="preroot1"),
    url(r'^preroot2/(?P<id>\d+)/$', views.preroot2, name="preroot2"),

    url(r'^word/$', views.Word, name="word"),
    url(r'^subword/$', views.Submitword, name="subword"),
    url(r'^subtopic/$', views.Submitropic, name="Submitropic"),
    url(r'^exam/$', views.Examination, name="Examination"),
    url(r'^addonebyone/(?P<id1>\d+)/(?P<id2>\d+)/(?P<id3>\d+)/$',viewserializer.AddOneByOne.as_view(), name="AddOneByOne"),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
