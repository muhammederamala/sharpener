"""apitodo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from base.views import (
    create,list_all_tasks,list_task,delete_task,update_task
    )


urlpatterns = [
    path("admin/", admin.site.urls),
    path('create/', create, name='create'),
    path('tasks/',list_all_tasks,name="list_create_tasks"),
    path('tasks/<int:pk>/', list_task, name='list_task'),
    path('delete_task/<int:pk>/', delete_task, name='delete_task'),
    path('update_task/<int:pk>/',update_task,name="update_task")
]
