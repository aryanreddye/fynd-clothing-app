// Home Page JavaScript - Tinder-like Interface

document.addEventListener('DOMContentLoaded', function() {
    const cardStack = document.getElementById('cardStack');
    const swipeLeftBtn = document.getElementById('swipeLeft');
    const swipeRightBtn = document.getElementById('swipeRight');
    const genderBtns = document.querySelectorAll('.gender-btn');
    
    let allProducts = [];
    let currentProducts = [];
    let currentCardIndex = 0;
    let currentGender = 'female';
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let currentCard = null;

    // Load products
    function loadProducts() {
        allProducts = getProducts();
        filterProductsByGender();
        renderCardStack();
    }

    // Filter products by gender
    function filterProductsByGender() {
        currentProducts = allProducts.filter(product => {
            return product.gender === currentGender;
        });
        currentCardIndex = 0;
    }

    // Render card stack
    function renderCardStack() {
        if (currentProducts.length === 0) {
            cardStack.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tshirt"></i>
                    <h3>No more clothes!</h3>
                    <p>Try switching gender or check back later for new items</p>
                </div>
            `;
            return;
        }

        cardStack.innerHTML = '';
        
        // Create cards for the next few items
        const cardsToShow = Math.min(3, currentProducts.length - currentCardIndex);
        
        for (let i = 0; i < cardsToShow; i++) {
            const product = currentProducts[currentCardIndex + i];
            const card = createCard(product, i);
            cardStack.appendChild(card);
        }

        // Set up the current card for interactions
        currentCard = cardStack.querySelector('.clothing-card');
        if (currentCard) {
            setupCardInteractions(currentCard);
        }
    }

    // Create a card element
    function createCard(product, index) {
        const card = document.createElement('div');
        card.className = 'clothing-card';
        card.style.zIndex = 100 - index;
        card.style.transform = `scale(${1 - index * 0.05}) translateY(${index * 10}px)`;
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="card-image">
            <div class="card-info">
                <div class="card-category">${product.category}</div>
                <h3 class="card-title">${product.name}</h3>
                <div class="card-price">${formatPrice(product.price)}</div>
            </div>
            <div class="swipe-indicator left">NOPE</div>
            <div class="swipe-indicator right">LIKE</div>
        `;
        
        return card;
    }

    // Setup card interactions
    function setupCardInteractions(card) {
        // Touch events
        card.addEventListener('touchstart', handleTouchStart);
        card.addEventListener('touchmove', handleTouchMove);
        card.addEventListener('touchend', handleTouchEnd);
        
        // Mouse events
        card.addEventListener('mousedown', handleMouseDown);
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseup', handleMouseUp);
        card.addEventListener('mouseleave', handleMouseUp);
    }

    // Touch event handlers
    function handleTouchStart(e) {
        e.preventDefault();
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        currentCard.classList.add('dragging');
    }

    function handleTouchMove(e) {
        e.preventDefault();
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        const rotation = deltaX * 0.1;
        
        currentCard.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
        
        // Show swipe indicators first commit 
        if (deltaX > 50) {
            currentCard.querySelector('.swipe-indicator.right').classList.add('show');
            currentCard.querySelector('.swipe-indicator.left').classList.remove('show');
        } else if (deltaX < -50) {
            currentCard.querySelector('.swipe-indicator.left').classList.add('show');
            currentCard.querySelector('.swipe-indicator.right').classList.remove('show');
        } else {
            currentCard.querySelectorAll('.swipe-indicator').forEach(indicator => {
                indicator.classList.remove('show');
            });
        }
    }

    function handleTouchEnd(e) {
        if (!isDragging) return;
        
        isDragging = false;
        currentCard.classList.remove('dragging');
        
        const deltaX = currentX - startX;
        const threshold = 100;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                swipeRight();
            } else {
                swipeLeft();
            }
        } else {
            // Reset card position
            currentCard.style.transform = '';
            currentCard.querySelectorAll('.swipe-indicator').forEach(indicator => {
                indicator.classList.remove('show');
            });
        }
    }

    // Mouse event handlers
    function handleMouseDown(e) {
        e.preventDefault();
        startX = e.clientX;
        currentX = startX;
        isDragging = true;
        currentCard.classList.add('dragging');
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        
        currentX = e.clientX;
        const deltaX = currentX - startX;
        const rotation = deltaX * 0.1;
        
        currentCard.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
        
        // Show swipe indicators
        if (deltaX > 50) {
            currentCard.querySelector('.swipe-indicator.right').classList.add('show');
            currentCard.querySelector('.swipe-indicator.left').classList.remove('show');
        } else if (deltaX < -50) {
            currentCard.querySelector('.swipe-indicator.left').classList.add('show');
            currentCard.querySelector('.swipe-indicator.right').classList.remove('show');
        } else {
            currentCard.querySelectorAll('.swipe-indicator').forEach(indicator => {
                indicator.classList.remove('show');
            });
        }
    }

    function handleMouseUp(e) {
        if (!isDragging) return;
        
        isDragging = false;
        currentCard.classList.remove('dragging');
        
        const deltaX = currentX - startX;
        const threshold = 100;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                swipeRight();
            } else {
                swipeLeft();
            }
        } else {
            // Reset card position
            currentCard.style.transform = '';
            currentCard.querySelectorAll('.swipe-indicator').forEach(indicator => {
                indicator.classList.remove('show');
            });
        }
    }

    // Swipe functions
    function swipeLeft() {
        if (!currentCard || currentCardIndex >= currentProducts.length) return;
        
        currentCard.classList.add('swiped-left');
        setTimeout(() => {
            currentCardIndex++;
            renderCardStack();
        }, 300);
    }

    function swipeRight() {
        if (!currentCard || currentCardIndex >= currentProducts.length) return;
        
        const currentProduct = currentProducts[currentCardIndex];
        addToWishlist(currentProduct);
        showNotification('Added to wishlist! 💕');
        
        currentCard.classList.add('swiped-right');
        setTimeout(() => {
            currentCardIndex++;
            renderCardStack();
        }, 300);
    }

    // Button click handlers
    swipeLeftBtn.addEventListener('click', swipeLeft);
    swipeRightBtn.addEventListener('click', swipeRight);

    // Gender toggle handlers
    genderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            genderBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentGender = this.getAttribute('data-gender');
            filterProductsByGender();
            renderCardStack();
        });
    });

    // Initialize
    loadProducts();
    
    // Check authentication
    const userData = localStorage.getItem('fyndUser');
    if (!userData) {
        window.location.href = 'login.html';
    }
});
