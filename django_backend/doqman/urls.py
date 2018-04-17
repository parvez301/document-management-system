from django.conf.urls import url, include
from django.contrib import admin

from . import views


urlpatterns = [
    url(r'file-upload/$', views.file_upload, name='file_upload'),
]