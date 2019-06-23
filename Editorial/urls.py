from  django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from .import views
urlpatterns=[
    url('content/api/$',views.editorialView.as_view(),name="editorialView"),
    url('content/api/(?P<id>\d+)/$', views.editorialView.as_view(), name="ApieditorialView"),
    url('upload/$', views.upload, name="upload"),
    url('content/$', views.home, name="home"),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
