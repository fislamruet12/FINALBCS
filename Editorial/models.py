from django.db import models

# Create your models here.
class editorial(models.Model):
    title=models.CharField(max_length=100)
    date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    @property
    def contents(self):
        return self.contents_set.all().order_by('id')
    @property
    def meaning(self):
        return self.meaning_set.all()


class contents(models.Model):
    editorial_id=models.ForeignKey(editorial,on_delete=models.CASCADE)
    passage=models.CharField(max_length=6000)
    mean=models.CharField(max_length=6000)

    def __str__(self):
        return self.passage

class meaning(models.Model):
    editorial_id = models.ForeignKey(editorial, on_delete=models.CASCADE)
    types=models.CharField(max_length=100)

    def __str__(self):
        return self.types

    def meaningelement(self):
        return self.meaningelement_set.all()


class meaningelement(models.Model):
    meaning_id= models.ForeignKey(meaning, on_delete=models.CASCADE)
    data=models.CharField(max_length=300)

    def __str__(self):
        return self.data
