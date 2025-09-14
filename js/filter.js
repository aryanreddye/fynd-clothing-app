document.addEventListener('DOMContentLoaded', () => {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const optionsSection = document.querySelector('.options');
    const applyBtn = document.querySelector('.apply-btn');
    const clearBtn = document.querySelector('.clear-btn');

    // Filter options data with counts
    const filterOptions = {
        style: [
            { id: 'casual', label: 'Casual', count: 45 },
            { id: 'formal', label: 'Formal', count: 32 },
            { id: 'party', label: 'Party Wear', count: 28 },
            { id: 'ethnic', label: 'Ethnic', count: 36 },
            { id: 'sports', label: 'Sports', count: 20 }
        ],
        brand: [
            { id: 'zara', label: 'Zara', count: 25 },
            { id: 'hm', label: 'H&M', count: 30 },
            { id: 'levis', label: "Levi's", count: 22 },
            { id: 'nike', label: 'Nike', count: 18 },
            { id: 'adidas', label: 'Adidas', count: 20 }
        ],
        price: [
            { id: 'under-1000', label: 'Under ₹1000', range: [0, 1000] },
            { id: '1000-2000', label: '₹1000 - ₹2000', range: [1000, 2000] },
            { id: '2000-3000', label: '₹2000 - ₹3000', range: [2000, 3000] },
            { id: '3000-5000', label: '₹3000 - ₹5000', range: [3000, 5000] },
            { id: 'above-5000', label: 'Above ₹5000', range: [5000, Infinity] }
        ],
        category: [
            { id: 'tops', label: 'Tops', count: 40 },
            { id: 'dresses', label: 'Dresses', count: 35 },
            { id: 'pants', label: 'Pants', count: 25 },
            { id: 'skirts', label: 'Skirts', count: 20 },
            { id: 'outerwear', label: 'Outerwear', count: 15 }
        ],
        color: [
            { id: 'black', label: 'Black', count: 30 },
            { id: 'white', label: 'White', count: 28 },
            { id: 'red', label: 'Red', count: 20 },
            { id: 'blue', label: 'Blue', count: 25 },
            { id: 'pink', label: 'Pink', count: 18 }
        ],
        size: [
            { id: 'xs', label: 'XS', count: 20 },
            { id: 's', label: 'S', count: 30 },
            { id: 'm', label: 'M', count: 35 },
            { id: 'l', label: 'L', count: 30 },
            { id: 'xl', label: 'XL', count: 25 }
        ]
    };

    // Get saved filters from localStorage
    let selectedFilters = JSON.parse(localStorage.getItem('fyndFilters')) || {};

    // Initialize active category
    let activeCategory = 'style';

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Update active category and render options
            activeCategory = btn.dataset.category;
            renderOptions(activeCategory);
        });
    });

    function renderOptions(category) {
        const options = filterOptions[category];
        const selectedForCategory = selectedFilters[category] || [];

        optionsSection.innerHTML = `
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div class="options-grid">
                ${options.map(option => `
                    <label class="option-item">
                        <input type="checkbox" 
                               name="${category}" 
                               value="${option.id}"
                               ${selectedForCategory.includes(option.id) ? 'checked' : ''}>
                        <span class="option-label">${option.label}</span>
                        ${option.count ? `<span class="option-count">(${option.count})</span>` : ''}
                    </label>
                `).join('')}
            </div>
        `;

        // Add change event listeners to checkboxes
        const checkboxes = optionsSection.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                updateSelectedFilters(category, checkbox.value, checkbox.checked);
            });
        });
    }

    // Update selected filters
    function updateSelectedFilters(category, value, isChecked) {
        if (!selectedFilters[category]) {
            selectedFilters[category] = [];
        }

        if (isChecked) {
            selectedFilters[category].push(value);
        } else {
            selectedFilters[category] = selectedFilters[category].filter(v => v !== value);
        }

        // Remove empty categories
        if (selectedFilters[category].length === 0) {
            delete selectedFilters[category];
        }

        // Save to localStorage
        localStorage.setItem('fyndFilters', JSON.stringify(selectedFilters));
    }

    // Clear all filters
    clearBtn.addEventListener('click', () => {
        selectedFilters = {};
        localStorage.setItem('fyndFilters', JSON.stringify(selectedFilters));
        renderOptions(activeCategory);
    });

    // Apply filters and return to home page
    applyBtn.addEventListener('click', () => {
        localStorage.setItem('fyndFilters', JSON.stringify(selectedFilters));
        window.location.href = 'home.html';
    });

    // Initialize with first category
    renderOptions(activeCategory);
});