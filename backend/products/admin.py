from django.contrib import admin
from .models import Product, ProductImage
class ProductImageInline(admin.TabularInline):  # or admin.StackedInline
    model = ProductImage
    extra = 1
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id','name', 'category', 'price', 'offer_price', 'in_stock', 'created_at']
    list_filter = ['category', 'in_stock']
    search_fields = ['name', 'category']
    inlines = [ProductImageInline]
@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'image']
