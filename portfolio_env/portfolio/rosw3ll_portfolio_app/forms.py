from django import forms
from django.contrib.auth.forms import   UserCreationForm,UserChangeForm
from django.db.models import fields
from django.contrib.auth import get_user_model
from .models import MyProjects,MySkills,Quote,SocialLink,MyUser

myUser = get_user_model()

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
        
class CustomUserCreationForm(UserCreationForm):
    """
    Form to create my user
    """
    password1 = forms.CharField(widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirm your password',widget=forms.PasswordInput)
    
    class Meta:
        model = MyUser
        fields = ('email',)
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        qs = myUser.objects.filter(email = email)
        if qs.exists():
            raise forms.ValidationError("Email is already taken")
        return email
    
    def clean(self):
        """
        Verify both passwords match
        """
        cleaned_data = super().clean()
        password1 = cleaned_data.get('password1')    
        password2 = cleaned_data.get('password2')    

        if password1 is not None and password1!=password2:
            self.add_error("password2",'The passwords must match')
        return cleaned_data
    
    def save(self,commit = True):
        #Save the provided password in the hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user
    
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = MyUser
        fields = ('email',)
        
    def clean_password(self):
        """
        Regardless of what the user provides, return the initial value.  
        This is done here, rather than on the field, because the  
        field does not have access to the initial value  
        """
        return self.initial('password1')
    
        
class LoginForm(forms.Form):
    """
    Form to add user info(email,password)
    """
    email = forms.EmailField(max_length=63,widget=forms.EmailInput)
    password =  forms.CharField(max_length=63,widget=forms.PasswordInput)               