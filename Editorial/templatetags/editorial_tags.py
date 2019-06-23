from django import template
register=template.Library()
from ..models import editorial,contents



@register.inclusion_tag('tags/editorial.html')
def show_latest(count=5):
    ed=editorial.objects.get(pk=count)
    content=ed.contents_set.all().order_by('id')
    return {'content':content}