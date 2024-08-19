from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render,redirect,get_object_or_404
from django.template import loader
from django.contrib.auth.mixins import LoginRequiredMixin
#from django.contrib.auth.views import LoginView,LogoutView
from django.contrib.auth import login,authenticate,logout
from django.views.generic import ListView,DetailView,CreateView,UpdateView,DeleteView
from django.urls import reverse_lazy
from .models import MyProjects,MySkills,Quote,SocialLink
from .forms import ProjectsForm,SkillsForm,QuoteForm,SocialForm,CustomUserCreationForm,LoginForm


# Create your views here.
from django.http import HttpResponse

templates_base_path = 'rosw3ll_portfolio__app/static/templates'

#Simple function based view to resolve the index(root) page of my portfolio 
def index(request):
    name = 'LeudiX'
    template = loader.get_template('base.html')
     
    context = {
               'leudix':name,
            }
    return HttpResponse(template.render(context,request))
    
class ProjectListView(ListView):
    """
    View for the home page of the portfolio
    """
    model = MyProjects
    template_name =  'sections/myprojects_list.html'
    context_object_name= 'projects'
    #paginate_by = 3 #Adjusting the number of projects per page
 
class ProjectDetailView(DetailView):
    """
    View to show details of a specific project
    """
    model = MyProjects
    template_name = 'sections/project_detail.html'

class ProjectCreateView(LoginRequiredMixin, CreateView):
    """
    View to create a new project
    """
    model = MyProjects
    form_class = ProjectsForm
    template_name = 'sections/project_form.html'
    success_url = reverse_lazy('templates_base_path:projects')
    
class ProjectUpdateView(LoginRequiredMixin,UpdateView):
    """
    View to update an existing project info
    """
    model = MyProjects
    form_class = ProjectsForm
    template_name = 'sections/project_form.html'
    success_url = reverse_lazy('templates_base_path:projects')
    
class ProjectDeleteView(LoginRequiredMixin,DeleteView):
    """
    View to delete a project
    """
    model = MyProjects
    template_name = 'sections/project_delete_confirmation.html'
    success_url = reverse_lazy('templates_base_path:projects')
       
#User Authentication Views
class SignUpView(CreateView):
    """
    View for user sign up.    
    """
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'sections/registration/signup.html'

"""
class CustomLoginView(LoginView):
  
    Custom Login View
  
    template_name = 'sections/registration/login.html'
    
    def form_valid(self, form: AuthenticationForm) -> HttpResponse:
        return super().form_valid(form) 
"""    
#Login Proccessing
def login_page(request):
    """
    View to display and update the user's profile
    """        
    form = LoginForm()
    message = ''

    if request.method =='POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(#Returns the user with the credentials provided
                email =  form.cleaned_data['email'],
                password =  form.cleaned_data['password'],
            )
        if user is not None:
            login(request,user) #Authenticate the user
            message = f'Hello {user.username}!! You  have been logged in'
        else:
            message = 'Wrong email or password!!'        
    return render(request, 'sections/registration/login.html',{'form':form,'message':message})         

#Logout Processing
def logout_user(request):
    logout(request)
    return redirect('login')