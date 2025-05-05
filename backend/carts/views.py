from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem, Address, Order
from products.models import Product
from .serializers import CartSerializer, AddressSerializer, OrderSerializer


class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            product_id = request.data.get('product_id')
            quantity = int(request.data.get('quantity', 1))

            if not product_id:
                return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                product_id = int(product_id)
            except (TypeError, ValueError):
                return Response({'error': 'Invalid product ID format'}, status=status.HTTP_400_BAD_REQUEST)

            cart, _ = Cart.objects.get_or_create(user=request.user)
            
            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response(
                    {'error': f'Product with ID {product_id} not found'}, 
                    status=status.HTTP_404_NOT_FOUND
                )

            cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
            cart_item.quantity += quantity if not created else 0
            cart_item.save()

            # Return the updated cart data
            cart.refresh_from_db()
            serializer = CartSerializer(cart)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UpdateCartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, item_id):
        quantity = int(request.data.get('quantity', 1))
        cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
        cart_item.quantity = quantity
        cart_item.save()
        return Response({'message': 'Quantity updated'}, status=status.HTTP_200_OK)


class RemoveFromCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, item_id):
        cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
        cart_item.delete()
        return Response({'message': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)


class AddressView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        addresses = Address.objects.filter(user=request.user)
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"message": "Address added"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        address_id = request.data.get('address_id')
        payment_method = request.data.get('payment_method')
        total_amount = request.data.get('total_amount')

        address = get_object_or_404(Address, id=address_id, user=request.user)

        order = Order.objects.create(
            user=request.user,
            address=address,
            payment_method=payment_method,
            total_amount=total_amount
        )

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class UpdateCartItemByProductView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, product_id):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart_item = get_object_or_404(CartItem, cart=cart, product__id=product_id)
        quantity = int(request.data.get('quantity', 1))
        cart_item.quantity = quantity
        cart_item.save()
        return Response({'message': 'Quantity updated'}, status=status.HTTP_200_OK)


class RemoveFromCartByProductView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, product_id):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart_item = get_object_or_404(CartItem, cart=cart, product__id=product_id)
        cart_item.delete()
        return Response({'message': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)
