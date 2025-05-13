from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_multiple_replacements, name='create_multiple_replacements'),
    path('success/', views.replacement_success, name='replacement_success'),
    path('create/', views.create_replacement_view, name='create_replacement')  # Add this line
]