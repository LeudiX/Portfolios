from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class MyUser(AbstractUser):
    """
    Custom User model to store additional info about me
    """
    bio = models.TextField(blank=True,null=True,help_text="A brief bio about me.")

class MySkills(models.Model):
    """
    Model to store my skills
    """
    name = models.CharField(max_length=100,unique=True)
    description = models.CharField(max_length=255,blank=True)
    
    def __str__(self):
        return self.name

class MyProjects(models.Model):
    """
    Model to store info about my projects
    """
    image = models.ImageField(upload_to='project_images/',blank=True,null=True) #ImageField
    title = models.CharField(max_length=255)
    description =models.TextField()
    link  = models.URLField(blank=True, null=True,help_text="Project link (e.g.,Github repsitory, live website)")
    skills = models.ManyToManyField(MySkills,related_name='projects') #Many to many relationship with My Skills
    
    def __str__(self):
        return self.title
    
class Quote(models.Model):
    """
    Model to store inspirational quotes
    """
    text = models.TextField()
    author = models.CharField(max_length=100,blank=True)
    
    def __str__(self):
        return self.text[:50]
    
class SocialLink(models.Model):
    """
    Model to store me social media links
    """
    platform = models.CharField(max_length=50,choices=(('Github','Github'),('Instagram','Instagram'),('LinkedIn','LinkedIn'),('Gmail','Gmail')))
    url = models.URLField()
    
    def __str__(self):
        return self.platform

    
    
    
    
    
    
    
    
    
    