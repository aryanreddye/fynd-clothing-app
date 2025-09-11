// Fynd-Clothing Global JavaScript

const AppState = {
  cart: JSON.parse(localStorage.getItem('fyndCart')) || [],
  wishlist: JSON.parse(localStorage.getItem('fyndWishlist')) || [],
  currentPage: window.location.pathname.split('/').pop() || 'welcome.html'
};

function saveState() {
  localStorage.setItem('fyndCart', JSON.stringify(AppState.cart));
  localStorage.setItem('fyndWishlist', JSON.stringify(AppState.wishlist));
}

function navigateTo(page) {
  window.location.href = `../html/${page}`;
}

function setActiveNavItem() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  
  const currentPage = AppState.currentPage;
  let activeItem;
  
  switch(currentPage) {
    case 'home.html': activeItem = document.querySelector('.nav-item[data-page="home"]'); break;
    case 'wishlist.html': activeItem = document.querySelector('.nav-item[data-page="wishlist"]'); break;
    case 'cart.html': activeItem = document.querySelector('.nav-item[data-page="cart"]'); break;
    case 'profile.html': activeItem = document.querySelector('.nav-item[data-page="profile"]'); break;
  }
  
  if (activeItem) activeItem.classList.add('active');
}

function addToCart(product) {
  const existingItem = AppState.cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    AppState.cart.push({ ...product, quantity: 1 });
  }
  saveState();
  updateCartBadge();
  showNotification('Added to cart!');
}

function removeFromCart(productId) {
  AppState.cart = AppState.cart.filter(item => item.id !== productId);
  saveState();
  updateCartBadge();
}

function updateCartBadge() {
  const cartBadge = document.querySelector('.cart-badge');
  if (cartBadge) {
    const totalItems = AppState.cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

function addToWishlist(product) {
  if (!AppState.wishlist.find(item => item.id === product.id)) {
    AppState.wishlist.push(product);
    saveState();
    showNotification('Added to wishlist!');
  }
}

function removeFromWishlist(productId) {
  AppState.wishlist = AppState.wishlist.filter(item => item.id !== productId);
  saveState();
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed; top: 100px; right: 20px; background: #d4af37; color: #000;
    padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    z-index: 10000; transform: translateX(100%); transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  setTimeout(() => notification.style.transform = 'translateX(0)', 100);
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

function formatPrice(price) {
  return `₹${price.toFixed(2)}`;
}

function getProducts() {
  return [
    // Female clothing
    { id: 1, name: "Luxury Silk Blouse", price: 1289.99, category: "Tops", gender: "female", image: "../images/img1.png" },
    { id: 2, name: "Elegant Evening Dress", price: 199.99, category: "Dresses", gender: "female", image: "../images/img2.jpg" },
    { id: 3, name: "Classic White Shirt", price: 59.99, category: "Tops", gender: "female", image: "../images/img3.jpg" },
    { id: 4, name: "Cashmere Sweater", price: 149.99, category: "Tops", gender: "female", image: "../images/img4.jpg" },
    { id: 5, name: "Summer Floral Dress", price: 129.99, category: "Dresses", gender: "female", image: "../images/img5.jpg" },
    { id: 6, name: "Silk Camisole", price: 79.99, category: "Tops", gender: "female", image: "../images/img6.jpg" },
    { id: 7, name: "Cocktail Dress", price: 179.99, category: "Dresses", gender: "female", image: "../images/img7.jpg" },
    { id: 8, name: "Knit Cardigan", price: 99.99, category: "Outerwear", gender: "female", image: "../images/img8.jpg" },
    { id: 8, name: "Knit Cardigan", price: 99.99, category: "Outerwear", gender: "female", image: "../images/img9.jpg" },
    { id: 8, name: "Knit Cardigan", price: 99.99, category: "Outerwear", gender: "female", image: "../images/img10.jpg" },
    { id: 8, name: "Knit Cardigan", price: 99.99, category: "Outerwear", gender: "female", image: "../images/img11.jpg" },
    { id: 8, name: "Knit Cardigan", price: 99.99, category: "Outerwear", gender: "female", image: "../images/img12.jpg" },
    { id: 8, name: "Knit Cardigan", price: 99.99, category: "Outerwear", gender: "female", image: "../images/img13.jpg" },
    { id: 8, name: "Knit Cardigan", price: 99.99, category: "Outerwear", gender: "female", image: "../images/img14.jpg" },
    { id: 8, name: "Knit Cardigan", price: 99.99, category: "Outerwear", gender: "female", image: "../images/img15.jpg" },
    
    // Male clothing
    { id: 9, name: "Premium Denim Jacket", price: 129.99, category: "Outerwear", gender: "male", image: "../images/img1.1.png" },
    { id: 10, name: "Tailored Trousers", price: 79.99, category: "Bottoms", gender: "male", image: "../images/img1.2.png" },
    { id: 11, name: "Classic Oxford Shirt", price: 69.99, category: "Tops", gender: "male", image: "../images/img1.3.png" },
    { id: 12, name: "Wool Blazer", price: 189.99, category: "Outerwear", gender: "male", image: "../images/img1.4.png" },
    { id: 13, name: "Chino Pants", price: 89.99, category: "Bottoms", gender: "male", image: "../images/img1.5.jpg" },
    { id: 14, name: "Polo Shirt", price: 49.99, category: "Tops", gender: "male", image: "../images/img1.6.png" },
    { id: 15, name: "Leather Jacket", price: 299.99, category: "Outerwear", gender: "male", image: "../images/img1.7.jpg" },
    { id: 16, name: "Slim Fit Jeans", price: 99.99, category: "Bottoms", gender: "male", image: "../images/img1.8.png" }
  ];
}

function initApp() {
  AppState.currentPage = window.location.pathname.split('/').pop() || 'welcome.html';
  setActiveNavItem();
  updateCartBadge();
  
  const mainContent = document.querySelector('.main-content');
  if (mainContent) mainContent.classList.add('fade-in');
}

initApp();