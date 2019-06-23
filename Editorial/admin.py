from django.contrib import admin

from .models import editorial,contents,meaning,meaningelement
# Register your models here.

admin.site.register(editorial)
admin.site.register(contents)
admin.site.register(meaning)
admin.site.register(meaningelement)
