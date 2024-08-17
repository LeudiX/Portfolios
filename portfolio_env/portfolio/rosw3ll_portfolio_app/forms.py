from django import forms
from .models import MyProjects,MySkills,Quote,SocialLink,MyUser

class ProjectsForm(forms.Form):
    """
    Form to create or edit my Projects info
    """
    class Meta:
        model= MyProjects
        fields = ['image','title','description','link','skills']
        
class SkillsForm(forms.Form):
    """
    Form to create or edit my skills info
    """
    class Meta:
        model= MySkills
        fields=['name','description']

class QuoteForm(forms.Form):
    """
    Form to create or edit Quotes
    """
    class Meta:
       model=Quote
       fields=['text','author']     

class SocialForm(forms.Form):
    """
    Form to create or edit my Social Links
    """
    class  Meta:
        model=SocialLink
        fields = ['platform','url']
        
class UserCreationForm(forms.Form):
    """
    Form to create or edit my personal info
    """
    class Meta:
        model = MyUser
        fields = ['bio']
        
class UserForm(forms.ModelForm):
    """
    Form to add user info(username,password)
    """
    class Meta:
        model = MyUser
        fields = ['username','email']                