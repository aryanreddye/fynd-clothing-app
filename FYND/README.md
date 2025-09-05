# Fynd Clothing App

A modern, Tinder-like clothing discovery app built with HTML, CSS, and JavaScript. Now available as a Progressive Web App (PWA)!

## 🚀 New PWA Features

- **Installable**: Add to home screen on mobile and desktop
- **Offline Support**: Works without internet connection
- **App-like Experience**: Full-screen mode without browser UI
- **Push Notifications**: Stay updated with new arrivals
- **Background Sync**: Sync data when connection is restored

## Features

### 🏠 Home Page - Tinder-like Interface
- **Card Stack Layout**: Clothes are displayed as swipeable cards stacked on top of each other
- **Swipe Gestures**: 
  - Swipe right to add to wishlist (with heart animation)
  - Swipe left to skip
  - Touch and mouse support for desktop and mobile
- **Gender Toggle**: iOS-style toggle button in the top right corner
  - Switch between male and female clothing
  - Only shows clothes for the selected gender
- **Centered Brand**: "Fynd" logo is perfectly centered in the header
- **Swipe Buttons**: Manual swipe buttons for easy interaction

### 💝 Wishlist Page
- **Swipe History**: Shows all items you've swiped right on
- **Item Count**: Displays the number of items in your wishlist
- **Two Actions Per Item**:
  - **Add to Cart**: Move item from wishlist to shopping cart
  - **Remove**: Remove item from wishlist completely
- **Empty State**: Helpful message when wishlist is empty

### 🛒 Cart & Profile
- **Enhanced Cart**: 
  - Perfectly round cart badge with proper styling
  - Functional remove buttons for each item
  - Quantity controls with +/- buttons
  - Real-time total calculation
- **User profile management**
- **Persistent data storage**

## How to Use

1. **Start Swiping**: Open the home page and start swiping through clothes
2. **Gender Selection**: Use the toggle in the top right to switch between male/female clothing
3. **Add to Wishlist**: Swipe right on clothes you like
4. **Manage Wishlist**: Go to the wishlist page to add items to cart or remove them
5. **Shop**: Add items from your wishlist to your cart and checkout

## Technical Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Touch & Mouse Support**: Swipe gestures work on both touch devices and desktop
- **Smooth Animations**: Card transitions and swipe effects
- **Local Storage**: Wishlist and cart data persists between sessions
- **Modern UI**: Clean, iOS-inspired design with gold accents
- **Enhanced Typography**: Custom Cinzel font for the Fynd logo
- **PWA Ready**: Service worker, manifest, and offline capabilities

## File Structure

```
├── html/
│   ├── home.html          # Tinder-like swiping interface
│   ├── wishlist.html      # Wishlist management
│   ├── cart.html          # Shopping cart
│   ├── profile.html       # User profile
│   ├── login.html         # Login page
│   └── signup.html        # Registration page
├── css/
│   ├── global.css         # Global styles and variables
│   ├── home.css           # Home page swiping styles
│   ├── wishlist.css       # Wishlist page styles
│   └── [other].css        # Other page styles
├── js/
│   ├── global.js          # Global functions and product data
│   ├── home.js            # Swiping logic and card management
│   ├── wishlist.js        # Wishlist functionality
│   ├── pwa.js             # PWA registration and management
│   └── [other].js         # Other page scripts
├── icons/
│   ├── icon.svg           # Source icon for PWA
│   └── README.md          # Icon generation instructions
├── manifest.json          # PWA manifest file
├── sw.js                  # Service worker for offline support
└── README.md
```

## Getting Started

1. Clone or download the project
2. Open `html/home.html` in your web browser
3. Start swiping through clothes!

## PWA Installation

### Mobile (Chrome/Edge)
1. Open the app in your browser
2. Tap the "Add to Home Screen" prompt, or
3. Tap the menu (⋮) → "Add to Home Screen"

### Desktop (Chrome/Edge)
1. Open the app in your browser
2. Click the install icon (📱) in the address bar, or
3. Press Ctrl+Shift+I → Application → Manifest → Install

### iOS Safari
1. Open the app in Safari
2. Tap the share button (📤)
3. Tap "Add to Home Screen"

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Recent Updates

### ✅ Fixed Issues
1. **Cart Badge**: Now perfectly round with proper styling
2. **Remove Button**: Functional remove buttons in cart with proper styling
3. **FYND Logo**: Enhanced with custom Cinzel font and improved typography
4. **PWA Implementation**: Full Progressive Web App support with offline capabilities

### 🔮 Future Enhancements

- User authentication system
- Product categories and filters
- Size selection
- Payment integration
- Social sharing features
- Product recommendations
- Push notifications
- Advanced offline features
