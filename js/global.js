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
    { 
      id: 1, 
      name: "Luxury Silk Red", 
      price: 2999.99, 
      category: "tops", 
      gender: "female", 
      image: "../images/img1.png",
      style: "formal",
      brand: "zara",
      color: "red",
      size: ["s", "m", "l"]
    },
    { 
      id: 2, 
      name: "Pink Casual Dress", 
      price: 1999.99, 
      category: "dresses", 
      gender: "female", 
      image: "../images/img2.jpg",
      style: "casual",
      brand: "hm",
      color: "pink",
      size: ["xs", "s", "m", "l"]
    },
    { 
      id: 3, 
      name: "Elegant Pink Top", 
      price: 1599.99, 
      category: "tops", 
      gender: "female", 
      image: "../images/img3.jpg",
      style: "party",
      brand: "zara",
      color: "pink",
      size: ["s", "m", "l"]
    },
    { 
      id: 4, 
      name: "Summer Yellow Top", 
      price: 1499.99, 
      category: "tops", 
      gender: "female", 
      image: "../images/img4.jpg",
      style: "casual",
      brand: "levis",
      color: "yellow",
      size: ["xs", "s", "m"]
    },
    { 
      id: 5, 
      name: "Luxury Black Formal", 
      price: 2999.99, 
      category: "dresses", 
      gender: "female", 
      image: "../images/img5.jpg",
      style: "formal",
      brand: "zara",
      color: "black",
      size: ["s", "m", "l", "xl"]
    },
    { 
      id: 6, 
      name: "Cute Pink Top", 
      price: 1799.99, 
      category: "tops", 
      gender: "female", 
      image: "../images/img6.jpg",
      style: "casual",
      brand: "hm",
      color: "pink",
      size: ["xs", "s", "m"]
    },
    { 
      id: 7, 
      name: "Pink Party Dress", 
      price: 1799.99, 
      category: "dresses", 
      gender: "female", 
      image: "../images/img7.jpg",
      style: "party",
      brand: "zara",
      color: "pink",
      size: ["s", "m", "l"]
    },
    { 
      id: 8, 
      name: "Elegant Green Jacket", 
      price: 1999.99, 
      category: "outerwear", 
      gender: "female", 
      image: "../images/img8.jpg",
      style: "casual",
      brand: "levis",
      color: "green",
      size: ["s", "m", "l", "xl"]
    },
    { 
      id: 9, 
      name: "Purple Party Dress", 
      price: 1999.99, 
      category: "outerwear", 
      gender: "female", 
      image: "../images/img9.jpg",
      style: "party",
      brand: "zara",
      color: "purple",
      size: ["xs", "s", "m", "l"]
    },
    { 
      id: 10, 
      name: "Black Luxury Coat", 
      price: 3999.99, 
      category: "outerwear", 
      gender: "female", 
      image: "../images/img10.jpg",
      style: "formal",
      brand: "zara",
      color: "black",
      size: ["s", "m", "l"]
    },
    { 
      id: 11, 
      name: "Casual Orange Top", 
      price: 999.99, 
      category: "tops", 
      gender: "female", 
      image: "../images/img11.jpg",
      style: "casual",
      brand: "hm",
      color: "orange",
      size: ["xs", "s", "m", "l"]
    },
    { 
      id: 12, 
      name: "Floral Summer Dress", 
      price: 999.99, 
      category: "dresses", 
      gender: "female", 
      image: "../images/img12.jpg",
      style: "casual",
      brand: "hm",
      color: "white",
      size: ["s", "m", "l"]
    },
    { 
      id: 13, 
      name: "Pink Party Top", 
      price: 1999.99, 
      category: "tops", 
      gender: "female", 
      image: "../images/img13.jpg",
      style: "party",
      brand: "zara",
      color: "pink",
      size: ["xs", "s", "m"]
    },
    { 
      id: 14, 
      name: "Floral Cardigan", 
      price: 2999.99, 
      category: "outerwear", 
      gender: "female", 
      image: "../images/img14.jpg",
      style: "casual",
      brand: "hm",
      color: "white",
      size: ["s", "m", "l", "xl"]
    },
    { 
      id: 15, 
      name: "Red Luxury Coat", 
      price: 4999.99, 
      category: "outerwear", 
      gender: "female", 
      image: "../images/img15.jpg",
      style: "formal",
      brand: "zara",
      color: "red",
      size: ["m", "l", "xl"]
    },
    
    // Male clothing
    { 
      id: 16, 
      name: "Blue Formal Suit", 
      price: 3999.99, 
      category: "outerwear", 
      gender: "male", 
      image: "../images/img1.1.png",
      style: "formal",
      brand: "zara",
      color: "blue",
      size: ["m", "l", "xl"]
    },
    { 
      id: 17, 
      name: "White Formal Shirt", 
      price: 1999.99, 
      category: "tops", 
      gender: "male", 
      image: "../images/img1.2.png",
      style: "formal",
      brand: "levis",
      color: "white",
      size: ["s", "m", "l", "xl"]
    },
    { 
      id: 18, 
      name: "Black Casual Tee", 
      price: 1699.99, 
      category: "tops", 
      gender: "male", 
      image: "../images/img1.3.png",
      style: "casual",
      brand: "hm",
      color: "black",
      size: ["s", "m", "l"]
    },
    { 
      id: 19, 
      name: "Grey Sports Jacket", 
      price: 1899.99, 
      category: "outerwear", 
      gender: "male", 
      image: "../images/img1.4.png",
      style: "sports",
      brand: "nike",
      color: "grey",
      size: ["m", "l", "xl"]
    },
    { 
      id: 20, 
      name: "Black Hoodie", 
      price: 2999.99, 
      category: "outerwear", 
      gender: "male", 
      image: "../images/img1.5.jpg",
      style: "casual",
      brand: "adidas",
      color: "black",
      size: ["s", "m", "l", "xl"]
    },
    { 
      id: 21, 
      name: "Denim Jacket", 
      price: 4999.99, 
      category: "outerwear", 
      gender: "male", 
      image: "../images/img1.6.png",
      style: "casual",
      brand: "levis",
      color: "blue",
      size: ["m", "l", "xl"]
    },
    { 
      id: 22, 
      name: "Denim Jeans", 
      price: 1899.99, 
      category: "pants", 
      gender: "male", 
      image: "../images/img1.7.jpg",
      style: "casual",
      brand: "levis",
      color: "blue",
      size: ["s", "m", "l", "xl"]
    },
    { 
      id: 23, 
      name: "Track Pants", 
      price: 1499.99, 
      category: "pants", 
      gender: "male", 
      image: "../images/img1.8.png",
      style: "sports",
      brand: "nike",
      color: "black",
      size: ["s", "m", "l"]
    }
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