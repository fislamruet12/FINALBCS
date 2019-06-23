
from .models import usermodeltest,marks
from rest_framework import  serializers
from django.contrib.auth.models import User

class markserializer(serializers.ModelSerializer):
    id=serializers.IntegerField(required=False)
    class Meta:
        model=marks
        fields=[
            'id',
            'qu',
            'at',
            'wa',
            'ra',
            'marks'
        ]

class usermodelserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    mark=markserializer(many=True)
    class Meta:
        model=usermodeltest
        fields=[
            'usermodeltest_id',
            'id',
            'test',
            'date',
            'mark'
        ]

class userserializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model=User
        fields=[
            'id',
            'username'
        ]
