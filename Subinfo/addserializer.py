from rest_framework import serializers


from .models import event,modettests,bcsmodel,modelquestion,version, Photo,contenttable,contcatagory,contentelement,contentelementimage,contenttabletitle,contenttableinfo,types,question,subjects,subcatagory,table,tableinfo,tabletitle

import json
import logging
logger = logging.getLogger(__name__)

class Questionserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    que_pic=serializers.ImageField(required=False)
    class Meta:
        model=question
        fields=[

            'id',
            'title',
            'que_pic',
            'op1',
            'op2',
            'op3',
            'op4',
            'ans',
            'explain'
        ]


class QuestionTypeserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    allquestion=Questionserializer(many=True)
    class Meta:
        model=types
        fields=[
            'id',
            'title',
            'allquestion'

        ]
    def create(self, validated_data):
        typ=contentelement.objects.get(id=validated_data['id'])
        ques=validated_data.pop('allquestion')
        ids=validated_data.pop('id')
        obs=typ.types_set.create(**validated_data)
        for qu in ques:
            qu=obs.question_set.create(**qu)


        if Photo.objects.all().exists():
            ph=Photo.objects.all()
            for p in ph:
                qu.que_pic=p.file
            qu.save()
        Photo.objects.all().delete()
        return obs


class ModelQuestionserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    que_pic=serializers.ImageField(required=False)
    class Meta:
        model=modelquestion
        fields=[

            'id',
            'title',
            'que_pic',
            'op1',
            'op2',
            'op3',
            'op4',
            'ans',
            'explain'
        ]

class Modelversionserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    modelquestion = ModelQuestionserializer(many=True)
    class Meta:
        model=version
        fields=[
            'id',
            'versionname',
            'date',
            'modelquestion'

        ]


class ModelQuestionTypeserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    version=Modelversionserializer(many=True)
    class Meta:
        model=bcsmodel
        fields=[
            'id',
            'name',
            'version'

        ]
    def create(self, validated_data):
        typ=contentelement.objects.get(id=validated_data['id'])
        ques=validated_data.pop('version')
        ids=validated_data.pop('id')
        obs=typ.bcsmodel_set.create(**validated_data)
        for qu in ques:
            qu=obs.question_set.create(**qu)


        if Photo.objects.all().exists():
            ph=Photo.objects.all()
            for p in ph:
                qu.que_pic=p.file
            qu.save()

        return obs

class Modeltestserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model=bcsmodel
        fields=[
            'id',
            'name',
        ]






class ContenttableInfoserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model=contenttableinfo
        fields=[
            'id',
            'tl1',
            'tl2',
            'tl3',
            'tl4',
            'tl5',
            'tl6',

        ]
class Contettabletitle(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    tableinfo=ContenttableInfoserializer(many=True)
    class Meta:
        model=contenttabletitle
        fields=[
            'id',
            'title',
            'cl1',
            'cl2',
            'cl3',
            'cl4',
            'cl5',
            'cl6',
            'tableinfo'

        ]
class Contentimage(serializers.ModelSerializer):
    id=serializers.IntegerField(required=False)
    content_pic=serializers.ImageField(required=False)
    class Meta:
        model=contentelementimage
        fields=[
            'id',
            'content_pic',
        ]


class Contentelemteserializer(serializers.ModelSerializer):
    id=serializers.IntegerField(required=False)
    images=Contentimage(many=True,required=False)
    contenttable=Contettabletitle(many=True)
    #qutypes=QuestionTypeserializer(many=True)
    class Meta:
        model=contentelement
        fields=[
            'id',
            'title',
            'boxcontent',
            'content',
            'images',
            'contenttable',
            #'qutypes'
        ]

class Contcataserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    contents = Contentelemteserializer(many=True)
    class Meta:
        model=contcatagory
        fields = [
            'id',
            'contentlist',
            'cata_pic',
            'contents'
        ]

    def create(self, validated_data):
        content = validated_data.pop("contents")
        cont = contcatagory.objects.get(id=validated_data["id"])
        tablet=content[0].pop('contenttable')
        tableti=tablet[0].pop('tableinfo')
        logger.error(tableti)

        for cn in content:
           tb= cont.contentelement_set.create(**cn)
        #for tn in tablet:
         #   ti=tb.contenttabletitle_set.create(**tn)

        #for tin in tableti:
         #   ti.contenttableinfo_set.create(**tin)
        return cont


class Contcataserializer1(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model=contcatagory
        fields = [
            'id',
            'contentlist',
            'cata_pic',
        ]

class SubcataSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    catagoried = Contcataserializer1(many=True)
    class Meta:
        model=subcatagory
        fields=[
            'id',
            'catalist',
            'catagoried',
        ]



class tabtitleSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model=tabletitle
        fields=[
            'id',
            'col',
        ]

class tabinfoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model=tableinfo
        fields=[
            'id',
            'col',
        ]

class tableSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    tabletitle=tabtitleSerializer(many=True)
    tableinfo=tabinfoSerializer(many=True)
    class Meta:
        model=table
        fields=[
            'id',
            'title',
            'tabletitle',
            'tableinfo',
        ]

class Updatecontentstablesserializer(serializers.ModelSerializer):
    id=serializers.IntegerField(required=False)
    class Meta:
        model=contenttable
        fields=[
            'id',
            'qu',
            'ans'
        ]

class UpdateContentelemteserializer(serializers.ModelSerializer):
    id=serializers.IntegerField(required=False)
    tables=tableSerializer(many=True)
    images=Contentimage(many=True,required=False)
    contentstables=Updatecontentstablesserializer(many=True,required=False)
    class Meta:
        model=contentelement
        fields=[
            'id',
            'title',
            'boxcontent',
            'content',
            'contentstables',
            'images',
            'tables',
        ]
class UpdateContcataserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    contents = UpdateContentelemteserializer(many=True)
    class Meta:
        model=contcatagory
        fields = [
            'id',
            'contentlist',
            'cata_pic',
            'contents'
        ]

    def create(self, validated_data):
        contents=validated_data.pop('contents')
        topic=contcatagory.objects.get(id=validated_data["id"])
        tables=contents[0].pop('tables')
        contentstables=contents[0].pop('contentstables')
        tabletitle=tables[0].pop('tabletitle')
        tableinfo=tables[0].pop('tableinfo')
        logger.error(contents)
        for x in contents:
            rf1=topic.contentelement_set.create(**x)
        img=Photo.objects.all()
        for im in img:
            rf1.contentelementimage_set.create(content_pic=im.file,title="")

        for tbc in contentstables:
            rf1.contenttable_set.create(**tbc)

        for tb in tables:
            tbs=rf1.table_set.create(**tb)
        for tbt in tabletitle:
            tbs.tabletitle_set.create(**tbt)

        for tbi in tableinfo:
            tbs.tableinfo_set.create(**tbi)



        return topic


class Subjectserializer(serializers.ModelSerializer):
    id=serializers.IntegerField(required=False)
    class Meta:
        model=subjects
        fields=[
            'id',
            'name',
            'bio',
        ]




class Modelserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = modettests
        fields = [
            'id',
            'test',
        ]

class Eventserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    modeltests=Modelserializer(many=True)
    class Meta:
        model = event
        fields = [
            'id',
            'name',
            'modeltests',
        ]