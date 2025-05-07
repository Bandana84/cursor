from django.contrib import admin
from .models import Cart, CartItem, Address, Order, OrderItem

class CartItemInline(admin.TabularInline):  # or admin.StackedInline
    model = CartItem
    extra = 0  # Number of empty forms to display
    readonly_fields = ('get_subtotal',)  # Make calculated fields read-only
    
    def get_subtotal(self, obj):
        return obj.get_subtotal()
    get_subtotal.short_description = 'Subtotal'

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_items', 'subtotal', 'tax', 'grand_total', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'user__email')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    inlines = [CartItemInline]  # Show cart items directly in cart admin
    
    # These methods match your model's properties
    def total_items(self, obj):
        return obj.total_items
    total_items.short_description = 'Items'
    
    def subtotal(self, obj):
        return obj.subtotal
    subtotal.short_description = 'Subtotal'
    
    def tax(self, obj):
        return obj.tax
    tax.short_description = 'Tax (2%)'
    
    def grand_total(self, obj):
        return obj.grand_total
    grand_total.short_description = 'Total'

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'product', 'quantity', 'get_subtotal')
    list_filter = ('added_at',)
    search_fields = ('cart__user__username', 'product__name')
    readonly_fields = ('added_at',)
    ordering = ('-added_at',)
    
    def get_subtotal(self, obj):
        return obj.get_subtotal()
    get_subtotal.short_description = 'Subtotal'
    
    
@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'street', 'city', 'province', 'country', 'phone')
    list_filter = ('country', 'province', 'city')
    search_fields = ('user__username', 'street', 'city', 'province', 'country', 'phone')
    ordering = ('user', 'country', 'province')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'payment_method', 'total_amount', 'status', 'created_at', 'items_count')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('user__username', 'user__email', 'id')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'quantity', 'price', 'get_subtotal')
    list_filter = ('order__status',)
    search_fields = ('order__user__username', 'product__name')
    ordering = ('-order__created_at',)
