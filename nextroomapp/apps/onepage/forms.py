from django import forms
from django.forms import ModelForm
from models import *

class SignUpForm(ModelForm):
    first_name = forms.CharField(initial='First Name', widget=forms.TextInput(attrs={'class':'text'}))
    last_name = forms.CharField(initial='Last Name', widget=forms.TextInput(attrs={'class':'text'}))
    company = forms.CharField(initial='Company', widget=forms.TextInput(attrs={'class':'text long'}), required=False)
    email_address = forms.CharField(initial='Email', widget=forms.TextInput(attrs={'class':'text'}))
    phone = forms.CharField(initial='Phone Number', widget=forms.TextInput(attrs={'class':'text'}))

    class Meta:
        model = SignUp