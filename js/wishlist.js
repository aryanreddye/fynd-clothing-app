// Wishlist Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const wishlistContainer = document.getElementById('wishlistContainer');
    const wishlistCount = document.getElementById('wishlistCount');

    // Load wishlist items
    function loadWishlist() {
        const wishlist = AppState.wishlist;
        
        // Update wishlist count
        wishlistCount.textContent = wishlist.length;
        
        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = `
                <div class="empty-wishlist">
                    <i class="fas fa-heart"></i>
                    <h3>Your wishlist is empty</h3>
                    <p>Start swiping right on clothes to add them to your wishlist</p>
                    <a href="home.html" class="btn-shop-now">Start Swiping</a>
                </div>
            `;
            return;
        }

        wishlistContainer.innerHTML = wishlist.map(item => `
            <div class="wishlist-item" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="wishlist-item-image">
                <div class="wishlist-item-info">
                    <div class="wishlist-item-category">${item.category}</div>
                    <h3 class="wishlist-item-title">${item.name}</h3>
                    <div class="wishlist-item-price">${formatPrice(item.price)}</div>
                    <div class="wishlist-item-actions">
                        <button class="btn-add-to-cart" onclick="addToCartFromWishlist(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                        <button class="btn-remove" onclick="removeFromWishlistAndUpdate(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Global functions for wishlist actions
    window.addToCartFromWishlist = function(product) {
        addToCart(product);
        showNotification('Added to cart! 🛒');
    };

    window.removeFromWishlistAndUpdate = function(productId) {
        // Remove from wishlist
        removeFromWishlist(productId);
        showNotification('Removed from wishlist ❌');
        
        // Reload the wishlist display
        loadWishlist();
    };

    // Initialize
    loadWishlist();
    
    // Check authentication
    checkAuth().then(isAuthenticated => {
        if (!isAuthenticated) {
            window.location.href = 'login.html';
        }
    });
});
