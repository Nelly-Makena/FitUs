from django.shortcuts import render, get_object_or_404, redirect
from .models import Category, Product, Order, OrderItem
from .cart import Cart
from .forms import CheckoutForm

def product_list(request):
    products = Product.objects.filter(available=True)
    categories = Category.objects.all()
    return render(request, 'shop/product_list.html', {'products': products, 'categories': categories})

def category_products(request, slug):
    category = get_object_or_404(Category, slug=slug)
    products = category.products.filter(available=True)
    categories = Category.objects.all()
    return render(request, 'shop/product_list.html', {'products': products, 'categories': categories, 'current_category': category})

def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug, available=True)
    return render(request, 'shop/product_detail.html', {'product': product})

# CART
def cart_detail(request):
    cart = Cart(request)
    return render(request, 'shop/cart.html', {'cart': cart})

def cart_add(request, product_id):
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    cart.add(product=product)
    return redirect('cart_detail')

def cart_remove(request, product_id):
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    cart.remove(product)
    return redirect('cart_detail')

# CHECKOUT
def checkout(request):
    cart = Cart(request)
    if request.method == 'POST':
        form = CheckoutForm(request.POST)
        if form.is_valid():
            order = Order.objects.create(
                full_name=form.cleaned_data['full_name'],
                email=form.cleaned_data['email'],
                address=form.cleaned_data['address'],
                phone=form.cleaned_data['phone'],
                total=cart.get_total_price()
            )
            for item in cart:
                OrderItem.objects.create(
                    order=order,
                    product=item['product'],
                    price=item['price'],
                    quantity=item['quantity']
                )
            cart.clear()
            return render(request, 'shop/order_success.html', {'order': order})
    else:
        form = CheckoutForm()
    return render(request, 'shop/checkout.html', {'cart': cart, 'form': form})

