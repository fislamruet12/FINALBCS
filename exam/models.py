from django.db import models
from django.contrib.auth.models import User

class modelevent(models.Model):
    event=models.CharField(max_length=50)

    def __str__(self):
        return self.event



class usermodeltest(models.Model):
    usermodeltest_id=models.ForeignKey(User,on_delete=models.CASCADE)
    test=models.CharField(max_length=100)
    date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.test
    @property
    def mark(self):
        return self.marks_set.all().order_by('-id')


class marks(models.Model):
    marks_id=models.ForeignKey(usermodeltest,on_delete=models.CASCADE)
    qu = models.CharField(max_length=20)
    at=models.CharField(max_length=20)
    wa=models.CharField(max_length=20)
    ra=models.CharField(max_length=20)
    marks=models.CharField(max_length=20)

    def __str__(self):
        return self.qu
