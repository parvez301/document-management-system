import os
import boto3
from boto3.s3.transfer import S3Transfer
from django.shortcuts import render
from requests import Response
from rest_framework import viewsets, renderers
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def file_upload(request, format=None):
    if not format:
        format = request.META.get('CONTENT_TYPE', 'application/json')

    if format == 'application/x-www-form-urlencoded':
        return request.POST

    if format.startswith('multipart'):
        data = request.FILES.getlist('files')
        for i in data:
            print(i)

    return ''
