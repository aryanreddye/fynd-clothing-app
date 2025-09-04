// Cart Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cartContainer');
    const cartSummary = document.getElementById('cartSummary');

    // Load cart items
    function loadCart() {
        const cart = AppState.cart;
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Start shopping to add items to your cart</p>
                    <a href="home.html" class="btn-shop-now">Shop Now</a>
                </div>
            `;
            cartSummary.innerHTML = '';
            return;
        }

        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="btn-remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        renderCartSummary();
    }

    // Render cart summary
    function renderCartSummary() {
        const cart = AppState.cart;
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 10 : 0;
        const total = subtotal + shipping;

        cartSummary.innerHTML = `
            <div class="summary-row">
                <span>Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>${formatPrice(shipping)}</span>
            </div>
            <div class="summary-row">
                <span>Total</span>
                <span class="summary-total">${formatPrice(total)}</span>
            </div>
            <button class="btn-checkout" onclick="checkout()" ${cart.length === 0 ? 'disabled' : ''}>
                Proceed to Checkout
            </button>
        `;
    }

    // Global functions for cart actions
    window.updateQuantity = function(productId, newQuantity) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            const item = AppState.cart.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
                saveState();
                updateCartBadge();
                loadCart();
            }
        }
    };

    window.removeFromCart = function(productId) {
        AppState.cart = AppState.cart.filter(item => item.id !== productId);
        saveState();
        updateCartBadge();
        showNotification('Item removed from cart');
        loadCart();
    };

    window.checkout = function() {
        if (AppState.cart.length === 0) {
            showNotification('Your cart is empty');
            return;
        }
        
        showNotification('Checkout feature coming soon!');
    };

    // Initialize
    loadCart();
    
    // Check authentication
    const userData = localStorage.getItem('fyndUser');
    if (!userData) {
        // User not logged in, redirect to login
        window.location.href = 'login.html';
    }
});
