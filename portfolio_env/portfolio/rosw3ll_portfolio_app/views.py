from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render,redirect,get_object_or_404
from django.template import loader
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView,LogoutView
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView,DetailView,CreateView,UpdateView,DeleteView
from django.urls import reverse_lazy
from .models import MyUser,MyProjects,MySkills,Quote,SocialLink
from .forms import ProjectsForm,SkillsForm,QuoteForm,SocialForm,UserCreationForm,UserForm


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
    template_name = templates_base_path +'/index.html'
    context_object_name= 'projects'
    paginate_by = 3 #Adjusting the number of projects per page
 
class ProjectDetailView(DetailView):
    """
    View to show details of a specific project
    """
    model = MyProjects
    template_name = templates_base_path + '/sections/project_detail.html'

class ProjectCreateView(LoginRequiredMixin, CreateView):
    """
    View to create a new project
    """
    model = MyProjects
    form_class = ProjectsForm
    template_name = templates_base_path + '/sections/project_form.html'
    success_url = reverse_lazy('templates_base_path:projects')
    
class ProjectUpdateView(LoginRequiredMixin,UpdateView):
    """
    View to update an existing project info
    """
    model = MyProjects
    form_class = ProjectsForm
    template_name = templates_base_path +'/sections/project_form.html'
    success_url = reverse_lazy('templates_base_path:projects')
    
class ProjectDeleteView(LoginRequiredMixin,DeleteView):
    """
    View to delete a project
    """
    model = MyProjects
    template_name = templates_base_path +'/sections/project_delete_confirmation.html'
    success_url = reverse_lazy('templates_base_path:projects')
       
#User Authentication Views
class SignUpView(CreateView):
    """
    View for user sign up.    
    """
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = templates_base_path + '/sections/registration/signup.html'
    
class CustomLoginView(LoginView):
    """
    Custom Login View
    """ 
    template_name = templates_base_path + '/sections/registration/login.html'
    
    def form_valid(self, form: AuthenticationForm) -> HttpResponse:
        return super().form_valid(form) 
    
class CustomLogoutView(LogoutView):
    """
    Custom Logout View
    """
    next_page = '/'
    
#Decorated view for profile management(example:update user profile)
@login_required
def user_profile(request):
    """
    View to display and update the user's profile
    """        
    user = request.user
    if(request.method=="POST"):
        form =  UserForm(request.POST,instance = user)
        if form.is_valid():
            form.save()
            return redirect('user_profile')
        else:
         form = UserForm(instance = user)
    return render(request, templates_base_path + '/sections/registration/user_profile.html',{'form':form})         
        