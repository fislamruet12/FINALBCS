
from django.urls import include,path
from django.conf import settings
from django.conf.urls.static import static
from .import views
urlpatterns = [
    path('start/<int:userid>/',views.examination,name='examination'),
    path('modeltestsubmit/', views.modeltestsubmit, name='modeltestsubmit'),
    path('bcsmodelsubmit/', views.bcsmodelsubmit, name='modeltestsubmit'),
    path('bcsversionsubmit/', views.bcsversionsubmit, name='bcsversionsubmit'),

    path('modeltest/', views.modeltest, name='modeltest'),
    path('allupload/', views.allupload, name='allupload'),

    path('contest/', views.finalmodel, name='finalmodel'),
    path('contest/upload/', views.contestUp, name='contestUp'),

    path('contest/api/(?P<mdl>[\w.@+-]+)/', views.markserializerview.as_view(), name='markserializerview'),
    path('contest/user/api/', views.userserilaizerview.as_view(), name='userserilaizerview'),


]



if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
