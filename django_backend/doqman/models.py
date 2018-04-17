
from django.db import models
from django.utils import timezone as tz
# Create your models here.

class Document(models.Model):
    file_category = (
        ('financial_document', 'Financial Document'),
        ('marketing_document', 'Marketing Document'),
        ('technical_document', 'Technical Document')
    )
    file_name = models.CharField(max_length=255)
    file_type = models.CharField(max_length=255)
    file_category = models.CharField(max_length=100, choices=file_category,
        default='Select Category')
    url_address = models.URLField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file_name