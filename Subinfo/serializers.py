from rest_framework import serializers

from .models import contcatagory,contentelement,subjects


class Inforserializer(serializers.ModelSerializer):
    id=serializers.IntegerField(required=False)
    class Meta:
        model=subjects
        fields = [

            'id',
            'name'
        ]

