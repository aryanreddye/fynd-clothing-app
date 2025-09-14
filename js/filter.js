document.addEventListener('DOMContentLoaded', () => {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const optionsSection = document.querySelector('.options');

    const filterOptions = {
        style: ['Casual', 'Formal', 'Party', 'Sports', 'Ethnic'],
        brand: ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M'],
        price: ['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', 'Above ₹2000'],
        size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        color: ['Black', 'White', 'Red', 'Blue', 'Green'],
        occasion: ['Casual', 'Work', 'Party', 'Festival', 'Sports']
    };

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get category and render options
            const category = btn.dataset.category;
            renderOptions(category);
        });
    });

    function renderOptions(category) {
        const options = filterOptions[category];
        optionsSection.innerHTML = `
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div class="options-grid">
                ${options.map(option => `
                    <label class="option-item">
                        <input type="checkbox" name="${category}" value="${option}">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
        `;
    }

    // Initialize with first category
    renderOptions('style');
});