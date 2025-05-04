from django.contrib import admin
from .models import Cart, CartItem

class CartItemInline(admin.TabularInline):  # or admin.StackedInline
    model = CartItem
    extra = 0  # Number of empty forms to display
    readonly_fields = ('get_subtotal',)  # Make calculated fields read-only
    
    def get_subtotal(self, obj):
        return obj.get_subtotal()
    get_subtotal.short_description = 'Subtotal'

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at', 'total_items', 'subtotal', 'tax', 'grand_total')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('user__username', 'user__email')
    readonly_fields = ('created_at', 'updated_at', 'subtotal', 'tax', 'grand_total')
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
    list_display = ('cart', 'product', 'quantity', 'get_subtotal', 'added_at')
    list_filter = ('added_at', 'product')
    search_fields = ('product__name', 'cart__user__username')
    readonly_fields = ('added_at', 'get_subtotal')
    
    def get_subtotal(self, obj):
        return obj.get_subtotal()
    get_subtotal.short_description = 'Subtotal'