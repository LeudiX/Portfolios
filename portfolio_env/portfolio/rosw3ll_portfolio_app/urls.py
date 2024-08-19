from django.urls import path
from . import views

appname = 'rosw3ll_portfolio_app'

urlpatterns = [
    #path("",views.index,name="index"),
    #Projects URL's Handling
    path("",views.index,name='home'),
    path('projects/',views.ProjectListView.as_view(),name='projects'),
    path('project/<int:pk>/',views.ProjectDetailView.as_view(),name='project_detail'),
    path('project/create/',views.ProjectCreateView.as_view(),name='project_create'),
    path('project/<int:pk>/update/',views.ProjectUpdateView.as_view(),name='project_update'),
    path('project/<int:pk>/delete/',views.ProjectDeleteView.as_view(),name='project_delete'),
    
    #Authentication, profile and session handling
    path('signup/',views.SignUpView.as_view(),name="signup"),
    path('login/',views.login_page,name="login"),
    path('logout/',views.logout_user,name="logout"),
]
