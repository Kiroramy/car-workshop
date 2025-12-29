from django.contrib import admin
from .models import User, Vehicle, ServiceRequest, Worker, Invoice


class ServiceRequestAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('slug', 'vehicle', 'maintenance_type', 'status', 'cost', 'created_at')

    # Fields to include in the add/edit form (exclude 'created_at')
    fields = ('slug', 'vehicle', 'maintenance_type', 'status', 'cost')


# Register your models with the admin site
admin.site.register(User)
admin.site.register(Vehicle)
admin.site.register(ServiceRequest, ServiceRequestAdmin)  # Use the custom ModelAdmin
admin.site.register(Worker)
admin.site.register(Invoice)