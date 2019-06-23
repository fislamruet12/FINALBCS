from django import template
register=template.Library()
from ..models import subjects,quote,subcatagory,contcatagory
import random
import logging
logger = logging.getLogger(__name__)
@register.simple_tag
def total_posts():
    return subjects.objects.count()
@register.inclusion_tag('tags/subfirsthalf.html')
def sub_first():
    first=subjects.objects.all()[0:3]
    return {'first':first}

@register.inclusion_tag('tags/subsecondhalf.html')
def sub_second():
    second=subjects.objects.all()[3:]
    return {'second':second}

@register.inclusion_tag('tags/random.html')
def show_latest_posts(count=5):
    sc=quote.objects.filter(quote_id=count).count()
    if sc==0:
        sc=1
    val=random.randint(1,sc)
    latest_posts=quote.objects.filter(quote_id=count)
    ranquote=[]
    cnt=1
    for x in latest_posts:
        if cnt==val:
            ranquote.append(x)
            break
        else:
            cnt=cnt+1


    return {'ranquote':ranquote,'val':val}

@register.inclusion_tag('tags/sample.html')
def showSample(count=1):

    userid=count
    sc=subcatagory.objects.filter(subject_id=count).count()
    if sc==0:
        sc=1
    sd=random.randint(1,sc)
    subc=subcatagory.objects.filter( subject_id=count)
    val=[]
    val1=[]
    val2=[]
    cnt=1
    for x in subc:
        if cnt==sd:
            val.append(x)
            break
        else:
            cnt=cnt+1

    if len(val)!=0:
        cont = val[0].contcatagory_set.all()
        sc = val[0].contcatagory_set.all().count()
        if sc == 0:
            sc = 1
        cnt = 1
        sd = random.randint(1, sc)
        for x in cont:
            logger.error(x)
            if sd == cnt:
                val1.append(x)
                break
            else:
                cnt = cnt + 1

        if len(val1) != 0:
            elm = val1[0].contentelement_set.all()
            sc = val1[0].contentelement_set.all().count()
            if sc == 0:
                sc = 1
                sd = random.randint(1, sc)
            cnt = 1
            for x in elm:
                if sd == cnt:
                    val2.append(x)
                    logger.error(x)
                    break
                else:
                    cnt = cnt + 1



    return {'val1':val1,'val2':val2,'subc':subc,'userid':userid}