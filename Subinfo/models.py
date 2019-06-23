from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class subjects(models.Model):
    name=models.CharField(max_length=100)
    bio=models.CharField(max_length=100,null=True)
    model_pic = models.ImageField(upload_to='pic_folder/', default='pic_folder/None/no-img.jpg')

    def __str__(self):
      return  self.name
class quote(models.Model):
    quote_id=models.ForeignKey(subjects,on_delete=models.CASCADE)
    quote=models.CharField(max_length=400)
    author=models.CharField(max_length=150)

    def __str__(self):
        return self.quote


class subcatagory(models.Model):
    subject_id=models.ForeignKey(subjects,on_delete=models.CASCADE)
    catalist=models.CharField(max_length=100)

    def __str__(self):
        return self.catalist
    @property
    def catagoried(self):
        return self.contcatagory_set.all()



class contcatagory(models.Model):
    subcatagory_id=models.ForeignKey(subcatagory,on_delete=models.CASCADE)
    contentlist=models.CharField(max_length=100)
    cata_pic = models.ImageField(upload_to='cata_folder/', default='cata_folder/None/no-img.jpg')

    def __str__(self):
        return self.contentlist

    @property
    def contents(self):
        return self.contentelement_set.all()[0:3]


# catagory wise models


class contentelement(models.Model):
    contcatagory_id=models.ForeignKey(contcatagory,on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    boxcontent=models.CharField(max_length=50000,null=True)
    content = models.CharField(max_length=45000)
    date = models.DateTimeField(auto_now_add=True)

    def  __str__(self):
        return self.title
    @property
    def images(self):
        return self.contentelementimage_set.all()

    @property
    def contenttable(self):
        return self.contenttabletitle_set.all()

    @property
    def qutypes(self):
        return self.types_set.all()

    @property
    def bcsmodel(self):
        return self.bcsmodel_set.all()

    @property
    def tables(self):
        return self.table_set.all()
    @property
    def contentstables(self):
        return self.contenttable_set.all()


class contentelementimage(models.Model):
    contentelement_id = models.ForeignKey(contentelement, on_delete=models.CASCADE)
    content_pic = models.ImageField(upload_to='content_folder/', default='content_folder/None/no-img.jpg')
    title=models.CharField(max_length=100,null=True)

class contenttable(models.Model):
    contentelement_id = models.ForeignKey(contentelement, on_delete=models.CASCADE)
    qu=models.CharField(max_length=400)
    ans=models.CharField(max_length=100)

    def __str__(self):
        return self.ans


class contenttabletitle(models.Model):
     contenttable_id=models.ForeignKey(contentelement,on_delete=models.CASCADE)
     title=models.CharField(max_length=250)
     cl1 = models.CharField(max_length=50,null=True)
     cl2 = models.CharField(max_length=50,null=True)
     cl3 = models.CharField(max_length=50,null=True)
     cl4 = models.CharField(max_length=50,null=True)
     cl5 = models.CharField(max_length=50,null=True)
     cl6 = models.CharField(max_length=50,null=True)

     def __str__(self):
         return self.title

     @property
     def tableinfo(self):
         return self.contenttableinfo_set.all()

class contenttableinfo(models.Model):
    contenttabletitle_id = models.ForeignKey(contenttabletitle, on_delete=models.CASCADE)
    tl1 = models.CharField(max_length=450,null=True)
    tl2 = models.CharField(max_length=450,null=True)
    tl3 = models.CharField(max_length=450,null=True)
    tl4 = models.CharField(max_length=450,null=True)
    tl5 = models.CharField(max_length=450,null=True)
    tl6 = models.CharField(max_length=450,null=True)

    def __str__(self):
        return str(self.contenttabletitle_id)

class types(models.Model):
    types_id=models.ForeignKey(contentelement,on_delete=models.CASCADE)
    title = models.CharField(max_length=30)

    def __str__(self):
        return self.title
    def allquestion(self):
        return self.question_set.all()

class question(models.Model):
    question_id=models.ForeignKey(types,on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    que_pic = models.ImageField(upload_to='que_folder/', default='que_folder/None/no-img.jpg')
    op1 = models.CharField(max_length=200)
    op2 = models.CharField(max_length=200)
    op3 = models.CharField(max_length=200)
    op4 = models.CharField(max_length=200)
    ans = models.IntegerField()
    explain = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.question_id)


class table(models.Model):
    table_id=models.ForeignKey(contentelement,on_delete=models.CASCADE)
    title=models.CharField(max_length=40)

    def __str__(self):
        return self.title

    @property
    def tabletitle(self):
        return self.tabletitle_set.all()

    @property
    def tableinfo(self):
        return self.tableinfo_set.all()


class tabletitle(models.Model):
    title_id=models.ForeignKey(table,on_delete=models.CASCADE)
    col=models.CharField(max_length=50)

    def __str__(self):
        return self.col


class tableinfo(models.Model):
    tableinfo_id = models.ForeignKey(table, on_delete=models.CASCADE)
    col = models.CharField(max_length=50)

    def __str__(self):
        return self.col







class imgs(models.Model):
    im=models.ImageField(upload_to='question/',null=True,blank=True)


class Photo(models.Model):
    title = models.CharField(max_length=255, blank=True)
    file = models.FileField(upload_to='photos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class word(models.Model):
    word=models.CharField(max_length=30)
    type = models.CharField(max_length=30)
    exp = models.CharField(max_length=300)
    sn = models.CharField(max_length=130)
    an = models.CharField(max_length=130)
    quate = models.CharField(max_length=600)

    def __str__(self):
        return self.word

class wordtime(models.Model):
    word_id=models.ForeignKey(User,on_delete=models.CASCADE)
    wid=models.IntegerField()
    update=models.DateTimeField(auto_now=True)


class bcsmodel(models.Model):
    bcsmodel_id=models.ForeignKey(contentelement,on_delete=models.CASCADE)
    name=models.CharField(max_length=100)
    date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    @property
    def version(self):
        return self.version_set.all()


class version(models.Model):
    bcs_id = models.ForeignKey(bcsmodel, on_delete=models.CASCADE)
    versionname = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.versionname

    @property
    def modelquestion(self):
        return self.modelquestion_set.all()



class modelquestion(models.Model):
    modelqusetion_id = models.ForeignKey(version, on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    que_pic = models.ImageField(upload_to='que_folder/', default='que_folder/None/no-img.jpg')
    op1 = models.CharField(max_length=200)
    op2 = models.CharField(max_length=200)
    op3 = models.CharField(max_length=200)
    op4 = models.CharField(max_length=200)
    ans = models.IntegerField()
    explain = models.CharField(max_length=1000)


class event(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    @property
    def modeltests(self):
        return self.modettests_set.all().order_by('-date')

class modettests(models.Model):
    event_id=models.ForeignKey(event,on_delete=models.CASCADE)
    test=models.CharField(max_length=190)
    date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.test
