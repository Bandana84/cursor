from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from django.views.decorators.csrf import csrf_protect
from products.models import Product, Banner, ProductImage
from carts.models import Order, Cart
from User.models import CustomUser
from django.urls import reverse

@csrf_protect
def admin_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None and user.is_staff:
            login(request, user)
            return redirect('admin_dashboard')
        else:
            messages.error(request, 'Invalid credentials or insufficient permissions')
    
    return render(request, 'admin_panel/login.html')

@login_required
def admin_logout(request):
    logout(request)
    return redirect('admin_login')

@login_required
def admin_dashboard(request):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    context = {
        'product_count': Product.objects.count(),
        'active_orders_count': Order.objects.filter(status__in=['Pending', 'Processing']).count(),
        'user_count': CustomUser.objects.count(),
        'active_banners_count': Banner.objects.filter(is_active=True).count(),
        'active_carts_count': Cart.objects.count(),
        'recent_orders': Order.objects.all().order_by('-created_at')[:5],
    }
    return render(request, 'admin_panel/dashboard.html', context)

@login_required
def product_list(request):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    products = Product.objects.all().prefetch_related('images').order_by('-created_at')
    return render(request, 'admin_panel/product_list.html', {'products': products})

@login_required
def product_add(request):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    if request.method == 'POST':
        # Handle product creation
        name = request.POST.get('name')
        price = request.POST.get('price')
        offer_price = request.POST.get('offer_price', price)  # Default to regular price if not provided
        category = request.POST.get('category')
        description = request.POST.get('description')
        in_stock = request.POST.get('in_stock') == 'on'
        
        product = Product.objects.create(
            name=name,
            price=price,
            offer_price=offer_price,
            category=category,
            description=description,
            in_stock=in_stock
        )
        
        # Handle multiple images
        images = request.FILES.getlist('images')
        for image in images:
            ProductImage.objects.create(product=product, image=image)
        
        messages.success(request, 'Product created successfully!')
        return redirect('admin_products')
    
    # Pass category choices to the template
    categories = [{'id': choice[0], 'name': choice[1]} for choice in Product.CATEGORY_CHOICES]
    return render(request, 'admin_panel/product_form.html', {'categories': categories})

@login_required
def product_edit(request, product_id):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    product = get_object_or_404(Product, id=product_id)
    
    if request.method == 'POST':
        # Handle product update
        product.name = request.POST.get('name')
        product.price = request.POST.get('price')
        product.stock = request.POST.get('stock')
        product.category = request.POST.get('category')
        product.description = request.POST.get('description')
        product.is_active = request.POST.get('is_active') == 'on'
        
        # Handle multiple images
        images = request.FILES.getlist('images')
        if images:
            # Delete existing images if requested
            if request.POST.get('clear_images') == 'on':
                product.images.all().delete()
            
            # Add new images
            for image in images:
                ProductImage.objects.create(product=product, image=image)
        
        product.save()
        messages.success(request, 'Product updated successfully!')
        return redirect('admin_products')
    
    # Pass category choices to the template
    categories = [{'id': choice[0], 'name': choice[1]} for choice in Product.CATEGORY_CHOICES]
    return render(request, 'admin_panel/product_form.html', {'product': product, 'categories': categories})

@login_required
def product_delete(request, product_id):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    product = get_object_or_404(Product, id=product_id)
    
    if request.method == 'POST':
        product.delete()
        messages.success(request, 'Product deleted successfully!')
        return redirect('admin_products')
    
    return render(request, 'admin_panel/product_confirm_delete.html', {'product': product})

@login_required
def order_list(request):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    orders = Order.objects.all().order_by('-created_at')
    return render(request, 'admin_panel/order_list.html', {'orders': orders})

@login_required
def order_detail(request, order_id):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    order = get_object_or_404(Order, id=order_id)
    
    if request.method == 'POST':
        # Handle order status update
        new_status = request.POST.get('status')
        if new_status in ['Pending', 'Processing', 'Delivered', 'Cancelled']:
            order.status = new_status
            order.save()
            messages.success(request, 'Order status updated successfully!')
            return redirect('admin_orders')
    
    return render(request, 'admin_panel/order_detail.html', {'order': order})

@login_required
def order_update_status(request, order_id):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    order = get_object_or_404(Order, id=order_id)
    
    if request.method == 'POST':
        new_status = request.POST.get('status')
        if new_status in ['Pending', 'Processing', 'Delivered', 'Cancelled']:
            order.status = new_status
            order.save()
            messages.success(request, 'Order status updated successfully!')
    
    return redirect('admin_orders')

@login_required
def order_delete(request, order_id):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    order = get_object_or_404(Order, id=order_id)
    
    if request.method == 'POST':
        order.delete()
        messages.success(request, 'Order deleted successfully!')
        return redirect('admin_orders')
    
    return render(request, 'admin_panel/order_confirm_delete.html', {'order': order})

@login_required
def user_list(request):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    users = CustomUser.objects.all()
    return render(request, 'admin_panel/user_list.html', {'users': users})

@login_required
def user_add(request):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        is_staff = request.POST.get('is_staff') == 'on'
        is_active = request.POST.get('is_active') == 'on'
        
        user = CustomUser.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            is_staff=is_staff,
            is_active=is_active
        )
        messages.success(request, 'User created successfully!')
        return redirect('admin_users')
    
    return render(request, 'admin_panel/user_form.html')

@login_required
def user_edit(request, user_id):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    user = get_object_or_404(CustomUser, id=user_id)
    
    if request.method == 'POST':
        user.username = request.POST.get('username')
        user.email = request.POST.get('email')
        user.first_name = request.POST.get('first_name')
        user.last_name = request.POST.get('last_name')
        user.is_staff = request.POST.get('is_staff') == 'on'
        user.is_active = request.POST.get('is_active') == 'on'
        
        if request.POST.get('password'):
            user.set_password(request.POST.get('password'))
        
        user.save()
        messages.success(request, 'User updated successfully!')
        return redirect('admin_users')
    
    return render(request, 'admin_panel/user_form.html', {'user': user})

@login_required
def user_delete(request, user_id):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    user = get_object_or_404(CustomUser, id=user_id)
    
    if request.method == 'POST':
        user.delete()
        messages.success(request, 'User deleted successfully!')
        return redirect('admin_users')
    
    return render(request, 'admin_panel/user_confirm_delete.html', {'user': user})

@login_required
def banner_list(request):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    banners = Banner.objects.all()
    return render(request, 'admin_panel/banner_list.html', {'banners': banners})

@login_required
def banner_add(request):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    if request.method == 'POST':
        title = request.POST.get('title')
        subtitle = request.POST.get('subtitle')
        image = request.FILES.get('image')
        is_active = request.POST.get('is_active') == 'on'
        order = request.POST.get('order', 0)
        
        if title and image:
            banner = Banner.objects.create(
                title=title,
                subtitle=subtitle,
                image=image,
                is_active=is_active,
                order=order
            )
            messages.success(request, 'Banner added successfully!')
            return redirect('admin_banners')
        else:
            messages.error(request, 'Title and image are required!')
    
    return render(request, 'admin_panel/banner_form.html', {'action': 'Add'})

@login_required
def banner_edit(request, banner_id):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    banner = get_object_or_404(Banner, id=banner_id)
    
    if request.method == 'POST':
        title = request.POST.get('title')
        subtitle = request.POST.get('subtitle')
        image = request.FILES.get('image')
        is_active = request.POST.get('is_active') == 'on'
        order = request.POST.get('order', 0)
        
        if title:
            banner.title = title
            banner.subtitle = subtitle
            if image:
                banner.image = image
            banner.is_active = is_active
            banner.order = order
            banner.save()
            messages.success(request, 'Banner updated successfully!')
            return redirect('admin_banners')
        else:
            messages.error(request, 'Title is required!')
    
    return render(request, 'admin_panel/banner_form.html', {
        'banner': banner,
        'action': 'Edit'
    })

@login_required
def banner_delete(request, banner_id):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    banner = get_object_or_404(Banner, id=banner_id)
    banner.delete()
    messages.success(request, 'Banner deleted successfully!')
    return redirect('admin_banners')

@login_required
def cart_list(request):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    carts = Cart.objects.all().order_by('-created_at')
    return render(request, 'admin_panel/cart_list.html', {'carts': carts})

@login_required
def cart_detail(request, cart_id):
    if not request.user.is_staff:
        return redirect('admin_login')
    
    cart = get_object_or_404(Cart, id=cart_id)
    return render(request, 'admin_panel/cart_detail.html', {'cart': cart}) 