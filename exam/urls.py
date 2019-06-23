
from django.conf.urls import url,include
from django.conf import settings
from django.conf.urls.static import static
from .import views
urlpatterns = [
    url(r'^start/(?P<userid>\d+)/$',views.examination,name='examination'),
    url(r'^modeltestsubmit/$', views.modeltestsubmit, name='modeltestsubmit'),
    url(r'^bcsmodelsubmit/$', views.bcsmodelsubmit, name='modeltestsubmit'),
    url(r'^bcsversionsubmit/$', views.bcsversionsubmit, name='bcsversionsubmit'),

    url(r'^modeltest/$', views.modeltest, name='modeltest'),
    url(r'^allupload/$', views.allupload, name='allupload'),

    url(r'^contest/$', views.finalmodel, name='finalmodel'),
    url(r'^contest/upload/$', views.contestUp, name='contestUp'),

    url(r'^contest/api/(?P<mdl>[\w.@+-]+)/$', views.markserializerview.as_view(), name='markserializerview'),
    url(r'^contest/user/api/$', views.userserilaizerview.as_view(), name='userserilaizerview'),


]



if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
