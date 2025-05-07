from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductListView, ProductDetailView, BannerViewSet

router = DefaultRouter()
router.register(r'banners', BannerViewSet, basename='banner')

urlpatterns = [
    path('', include(router.urls)),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
]
