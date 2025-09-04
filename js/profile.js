// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.getElementById('profileContainer');

    // Load profile data
    function loadProfile() {
        const userData = JSON.parse(localStorage.getItem('fyndUser') || '{}');
        const cart = AppState.cart;
        const wishlist = AppState.wishlist;
        
        if (!userData.email) {
            // No user data, redirect to login
            window.location.href = 'login.html';
            return;
        }

        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const totalSpent = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

        profileContainer.innerHTML = `
            <div class="profile-card">
                <div class="profile-avatar">
                    ${userData.name ? userData.name.charAt(0).toUpperCase() : userData.email.charAt(0).toUpperCase()}
                </div>
                <div class="profile-info">
                    <h2 class="profile-name">${userData.name || 'User'}</h2>
                    <p class="profile-email">${userData.email}</p>
                </div>
                
                <div class="profile-stats">
                    <div class="stat-item">
                        <div class="stat-number">${totalItems}</div>
                        <div class="stat-label">Cart Items</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${wishlist.length}</div>
                        <div class="stat-label">Wishlist</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${formatPrice(totalSpent)}</div>
                        <div class="stat-label">Total Spent</div>
                    </div>
                </div>
                
                <div class="profile-actions">
                    <button class="btn-edit-profile" onclick="editProfile()">
                        Edit Profile
                    </button>
                    <button class="btn-logout" onclick="logout()">
                        Logout
                    </button>
                </div>
            </div>
        `;
    }

    // Global functions for profile actions
    window.editProfile = function() {
        showNotification('Edit profile feature coming soon!');
    };

    window.logout = function() {
        if (confirm('Are you sure you want to logout?')) {
            // Clear user data
            localStorage.removeItem('fyndUser');
            localStorage.removeItem('fyndCart');
            localStorage.removeItem('fyndWishlist');
            
            // Redirect to welcome page immediately
            window.location.href = '../index.html';
        }
    };

    // Initialize
    loadProfile();
});
