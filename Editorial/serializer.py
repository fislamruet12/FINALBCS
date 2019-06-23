from .models import editorial,meaning,contents,meaningelement
from rest_framework import serializers


class elementserializer(serializers.ModelSerializer):
    id=serializers.IntegerField(required=False)
    class Meta:
        model=meaningelement
        fields=[
            'id',
            'data',
        ]
class contentserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model=contents
        fields = [
            'id',
            'passage',
            'mean',
        ]
class meaneditorialserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    meaningelement=elementserializer(many=True)
    class Meta:
        model=meaning
        fields = [
            'id',
            'types',
            'meaningelement',
        ]
class editorialserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    contents=contentserializer(many=True)
    meaning=meaneditorialserializer(many=True)
    class Meta:
        model=editorial
        fields = [
            'id',
            'title',
            'contents',
            'meaning',
        ]


    def create(self, validated_data):
        contents=validated_data.pop('contents')
        mean=validated_data.pop('meaning')
        edit=editorial.objects.create(**validated_data)
        for cnt in contents:
            edit.contents_set.create(**cnt)
        for mn in mean:
            type=mn
            meaningelements=type.pop('meaningelement')
            mni=edit.meaning_set.create(**type)
            for mne in meaningelements:
                mni.meaningelement_set.create(**mne)

        return edit

