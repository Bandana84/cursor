from rest_framework import serializers
from .models import Cart, CartItem, Address, Order
from products.serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    subtotal = serializers.SerializerMethodField()
    cart_item_id = serializers.IntegerField(source='id', read_only=True)
    class Meta:
        model = CartItem
        fields = ['cart_item_id', 'product', 'quantity', 'subtotal']

    def get_subtotal(self, obj):
        return obj.get_subtotal()

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.SerializerMethodField()
    subtotal = serializers.SerializerMethodField()
    tax = serializers.SerializerMethodField()
    grand_total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_items', 'subtotal', 'tax', 'grand_total', 'created_at']

    def get_total_items(self, obj):
        return obj.total_items

    def get_subtotal(self, obj):
        return obj.subtotal

    def get_tax(self, obj):
        return obj.tax

    def get_grand_total(self, obj):
        return obj.grand_total

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'city', 'state', 'country']

class CreateOrderSerializer(serializers.Serializer):
    street = serializers.CharField()
    city = serializers.CharField()
    state = serializers.CharField()
    country = serializers.CharField()
    payment_method = serializers.ChoiceField(choices=[('COD', 'Cash on Delivery'), ('Online', 'Online Payment')])

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'address', 'payment_method', 'total_amount', 'status', 'created_at']

class MyOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)