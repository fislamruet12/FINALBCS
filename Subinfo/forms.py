from django import forms

STATES = (
    ('', 'Choose...'),
    ('MG', 'Minas Gerais'),
    ('SP', 'Sao Paulo'),
    ('RJ', 'Rio de Janeiro')
)

class RegisterForm(forms.Form):
    user=forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'username'}))
    email = forms.CharField(widget=forms.EmailInput(attrs={'placeholder': 'Email'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'password'}))
    re_password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 're-password'}))
   # subject = forms.ChoiceField(choices=STATES)


class LoginForm(forms.Form):
    user = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'username'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'password'}))


class ContactForm(forms.Form):
    subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)
    sender = forms.EmailField()

from .models import Photo,imgs


class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ('file', )

class QuForm(forms.ModelForm):
    class Meta:
        model = imgs
        fields = ('im', )