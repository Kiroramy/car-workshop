from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import *
from django.conf import settings
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', create_auth),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('vehicles/', vehicle_list_create, name='vehicle-list-create'),
    path('vehicles/owned/', vehicle_list_get_by_owner, ),
    path('vehicles/details/<slug:slug>/', vehicle_list_get_by_slug, ),
    path('invoice/details/<slug:slug>/', invoice_list_get_by_slug, ),
    path('service-requests/', service_request_list_create, name='service-request-list-create'),
    path('service-requests/details/<slug:slug>/', service_request_list_owner_car, name='service-request-list-create-owned'),
    path('workers/', worker_list_create, name='worker-list-create'),
    path('invoices/', invoice_list_create, name='invoice-list-create'),
]