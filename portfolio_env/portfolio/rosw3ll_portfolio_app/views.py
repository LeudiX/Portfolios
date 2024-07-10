from django.shortcuts import render,redirect,get_object_or_404
from django.template import loader
from django.views.generic import ListView
from .models import MyUser,MyProjects,MySkills,Quote,SocialLink
from .forms import ProjectsForm,SkillsForm,QuoteForm,SocialForm


# Create your views here.
from django.http import HttpResponse

templates_base_path = 'roswell_portfolio__app/static/templates'

#Simple function based view to resolve the index(root) page of my portfolio 
def index(request):
    name = 'LeudiX'
    template = loader.get_template('index.html')
     
    context = {
               'leudix':name,
            }
    return HttpResponse(template.render(context,request))
    
class HomeView(ListView):
    """
    View for the home page of the portfolio
    """
    model = MyProjects
    template_name = templates_base_path +'/projects.html'
    context_object_name= 'projects'
    paginate_by = 3 #Adjusting the number of projects per page
     
