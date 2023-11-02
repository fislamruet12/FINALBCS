
from django.contrib import admin
from django.urls import include,path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('info/',include('Subinfo.urls')),
    path('',include('Subinfo.urls')),
    path('editorial/',include('Editorial.urls')),
    path('exam/', include('exam.urls')),
]



if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
