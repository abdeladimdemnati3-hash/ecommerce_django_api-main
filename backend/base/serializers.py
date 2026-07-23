from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            image_path = str(obj.image).lstrip('/')
            return request.build_absolute_uri(f'/media/{image_path}')
        return ''

    class Meta:
        model = Product
        fields = '__all__'