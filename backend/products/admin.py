from django.contrib import admin
from .models import Product, ProductImage, Banner

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

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'subtitle', 'is_active', 'order', 'created_at']
    list_filter = ['is_active']
    search_fields = ['title', 'subtitle']
    ordering = ['order', '-created_at']
    list_editable = ['is_active', 'order']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'subtitle', 'image')
        }),
        ('Settings', {
            'fields': ('is_active', 'order')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
