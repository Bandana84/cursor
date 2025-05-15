from rest_framework import serializers
from .models import Product, ProductImage, Banner
import logging

logger = logging.getLogger(__name__)

class BannerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Banner
        fields = ['id', 'title', 'subtitle', 'image', 'is_active', 'order']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            url = request.build_absolute_uri(obj.image.url) if request else obj.image.url
            logger.info(f'Generated banner image URL: {url}')
            return url
        logger.warning(f'No image URL generated for banner {obj.id}')
        return None

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
