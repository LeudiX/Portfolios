from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .managers import CustomUserManager

# Create your models here.
class MyUser(AbstractBaseUser,PermissionsMixin):
    """
    Custom User model to store additional info about me
    Important!!!!: If you are having problems with your custom user model,
    when applying migrations(saving your user model) u know, errors like 
    (Reverse accessor or InconsistentMIgrationHistory do the following steps)
    
    1- For avoid Reverse Accessor error, just add a reference to your model on settings file with this:
        AUTH_USER_MODEL = 'AppName.YourCustomUserModelName'
    2-If u keep having problems with 2nd error(InconsistentMigrationHistory), just go to global urls
    and comment>> #path('admin/', admin.site.urls), and also in settings.py comment  on INSTALLED_APPS>> #'django.contrib.admin', 
    3-Then run python -m manage makemigrations
    4-Uncomment everything and again run the migrations>> python manage.py migrate
    """
    username = None
    email = models.EmailField(_("email_address"),unique = True, max_length=200)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    bio = models.TextField(blank=True,null=True,help_text="A brief bio about me.")
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    objects  = CustomUserManager()
    
    def _str_(self):
        return self.email
    
    def has_perm(self,perm,obj=None):
        #"Does the user have  specific permission?"
        #Simplest possible answer: Yes, always
        return True
    
    
    def is_staff(self):
        #Is the user member or staff?
        return self.is_staff()
    
    @property
    def is_admin(self):
        #Is the user admin member?
        return self.is_admin

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
    Model to store my social media links
    """
    platform = models.CharField(max_length=50,choices=(('Github','Github'),('Instagram','Instagram'),('LinkedIn','LinkedIn'),('Gmail','Gmail')))
    url = models.URLField()
    
    def __str__(self):
        return self.platform

    
    
    
    
    
    
    
    
    
    