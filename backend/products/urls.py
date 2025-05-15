from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductListView, ProductDetailView, BannerViewSet

router = DefaultRouter()
router.register('', BannerViewSet, basename='banner')

urlpatterns = [
    # Products endpoints
    path('', ProductListView.as_view(), name='product-list'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    # Banners endpoint
    path('banners/', include(router.urls)),
]
