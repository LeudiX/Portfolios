from django import forms
from .models import MyProjects,MySkills,Quote,SocialLink

class ProjectsForm(forms.Form):
    """
    Form to create or edit my projects
    """
    class Meta:
        model= MyProjects
        fields = ['image','title','description','link','skills']
        
class SkillsForm(forms.Form):
    """
    Form to create or edit my skills
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
        