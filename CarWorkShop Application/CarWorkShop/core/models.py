from asgiref.sync import async_to_sync
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.utils.timezone import now, timedelta
from django.utils.timezone import now,localtime,localdate
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

import os


# User Model
class User(AbstractUser):
    email = models.EmailField(_("email address"), blank=True,unique=True)
    customer =models.BooleanField(default=True)
    prof_photo = models.ImageField(
        upload_to='static/media/prof_photos/',
        default='static/media/prof_photos/default.jpg'
    )
    slug = models.SlugField(max_length=25, blank=True)
    gender = models.CharField(blank=True,null=True,max_length=8)
    is_rest = models.BooleanField(default=True)
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self)
        super(User, self).save(*args, **kwargs)



class Vehicle(models.Model):
    slug = models.SlugField(max_length=10, blank=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    car_img = models.ImageField(upload_to='static/media/car_img',null=True,blank=True)
    model = models.CharField(max_length=100)
    color = models.CharField(max_length=15)
    note = models.TextField()
    def __str__(self):
        return self.model
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_item_code(self)
        super(Vehicle, self).save(*args, **kwargs)



class ServiceRequest(models.Model):
    slug = models.SlugField(max_length=10, blank=True)
    vehicle = models.ForeignKey(Vehicle,on_delete=models.CASCADE)
    maintenance_type = models.TextField()
    status = models.CharField(max_length=25)
    cost = models.SmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_item_code(self)
        super(ServiceRequest, self).save(*args, **kwargs)





class Worker(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='Technician')
    position = models.CharField(max_length=50)
    status = models.CharField(max_length=25)




class Invoice(models.Model):
    slug = models.SlugField(max_length=10, blank=True)
    service_request = models.ForeignKey(ServiceRequest,on_delete=models.CASCADE,related_name='Invoices')
    total_price = models.SmallIntegerField()
    def __str__(self):
        return self.service_request.vehicle.model
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_item_code(self)
        super(Invoice, self).save(*args, **kwargs)

class Offer(models.Model):
    slug = models.SlugField(max_length=25, blank=True)
    buyer = models.ForeignKey(User,on_delete=models.CASCADE)
    offer_text = models.CharField(max_length=220)
    is_accepted = models.CharField(max_length=25, default='pending')
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_item_code(self)
        super(Offer, self).save(*args, **kwargs)



#################################################################################

# Helper Functions
def generate_unique_order_code(instance, length=5):
    code = get_random_string(length)
    model_class = type(instance)
    while model_class.objects.filter(code=code).exists():
        code = get_random_string(length)
    return code


def generate_unique_item_code(instance, length=10):
    slug = get_random_string(length)
    model_class = type(instance)
    while model_class.objects.filter(slug=slug).exists():
        slug = get_random_string(length)
    return slug


def generate_unique_category_code(instance, length=7):
    slug = get_random_string(length)
    model_class = type(instance)
    while model_class.objects.filter(slug=slug).exists():
        slug = get_random_string(length)
    return slug


def generate_unique_slug(instance, length=25):
    slug = get_random_string(length)
    model_class = type(instance)
    while model_class.objects.filter(slug=slug).exists():
        slug = get_random_string(length)
    return slug
