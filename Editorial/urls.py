from  django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .import views
urlpatterns=[
    path('content/api/',views.editorialView.as_view(),name="editorialView"),
    path('content/api/(?P<id>\d+)/', views.editorialView.as_view(), name="ApieditorialView"),
    path('upload/', views.upload, name="upload"),
    path('content/', views.home, name="home"),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
