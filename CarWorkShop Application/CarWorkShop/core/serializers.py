from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model


from rest_framework import serializers
from .models import User, Vehicle, ServiceRequest, Worker, Invoice
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'pk', 'email', 'username', 'first_name', 'last_name',
            'slug', 'password', 'prof_photo', 'customer', 'gender', 'is_rest'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({'email': 'البريد الإلكتروني مستخدم مسبقًا.'})
        validated_data['password'] = make_password(validated_data['password'])
        account = User.objects.create(**validated_data)
        return account

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.customer = validated_data.get('customer', instance.customer)
        if 'password' in validated_data:
            instance.password = make_password(validated_data['password'])
        instance.save()
        return instance



class VehicleSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Vehicle
        fields = ['pk','slug', 'user', 'model', 'color', 'note','car_img']

    def create(self, validated_data):
        vehicle = Vehicle.objects.create(**validated_data)
        return vehicle

    def update(self, instance, validated_data):
        instance.slug = validated_data.get('slug', instance.slug)
        instance.owner = validated_data.get('owner', instance.owner)
        instance.model = validated_data.get('model', instance.model)
        instance.color = validated_data.get('color', instance.color)
        instance.note = validated_data.get('note', instance.note)
        instance.save()
        return instance




class ServiceRequestSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    vehicle = VehicleSerializer(read_only=True)
    class Meta:
        model = ServiceRequest
        fields = '__all__'

    def get_created_at(self, obj):
        return obj.created_at.strftime("%Y/%m/%d at %H:%M")

    def create(self, validated_data):
        service_request = ServiceRequest.objects.create(**validated_data)
        return service_request

    def update(self, instance, validated_data):
        instance.vehicle = validated_data.get('vehicle', instance.vehicle)
        instance.maintenance_type = validated_data.get('maintenance_type', instance.maintenance_type)
        instance.status = validated_data.get('status', instance.status)
        instance.cost = validated_data.get('cost', instance.cost)
        instance.save()
        return instance




class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ['user', 'position', 'status']

    def create(self, validated_data):
        worker = Worker.objects.create(**validated_data)
        return worker

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.position = validated_data.get('position', instance.position)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance





class InvoiceSerializer(serializers.ModelSerializer):
    service_request = ServiceRequestSerializer(read_only=True)
    class Meta:
        model = Invoice
        fields = ['service_request', 'total_price','slug']

    def create(self, validated_data):
        invoice = Invoice.objects.create(**validated_data)
        return invoice

    def update(self, instance, validated_data):
        instance.service_request = validated_data.get('service_request', instance.service_request)
        instance.total_price = validated_data.get('total_price', instance.total_price)
        instance.save()
        return instance



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = get_user_model().USERNAME_FIELD

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims if needed
        token['slug'] = user.slug
        return token

