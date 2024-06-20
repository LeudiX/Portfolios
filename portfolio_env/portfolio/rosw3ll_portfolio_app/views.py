from django.shortcuts import render
from django.template import loader

# Create your views here.
from django.http import HttpResponse

def index(request):
    name = 'LeudiX'
    template = loader.get_template('index.html')
     
    context = {
               'leudix':name,
            }
    return HttpResponse(template.render(context,request))
    
