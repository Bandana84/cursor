from django.urls import path
from .views import (
    CartView,
    AddToCartView,
    UpdateCartItemView,
    RemoveFromCartView,
    AddressView,
    OrderView
)

urlpatterns = [
    path('', CartView.as_view(), name='get-cart'),
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path('update/<int:item_id>/', UpdateCartItemView.as_view(), name='update-cart-item'),
    path('remove/<int:item_id>/', RemoveFromCartView.as_view(), name='remove-from-cart'),
    path('addresses/', AddressView.as_view(), name='addresses'),
    path('order/', OrderView.as_view(), name='order'),
]
