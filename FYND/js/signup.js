// Signup Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitBtn = signupForm.querySelector('.btn-primary');

    // Form validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function validateName(name) {
        return name.trim().length >= 2;
    }

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        if (strength < 3) return 'weak';
        if (strength < 4) return 'medium';
        return 'strong';
    }

    function showError(input, message) {
        input.classList.remove('success');
        input.classList.add('error');
        
        let errorDiv = input.parentNode.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentNode.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    }

    function showSuccess(input) {
        input.classList.remove('error');
        input.classList.add('success');
        
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.classList.remove('show');
        }
    }

    function clearValidation(input) {
        input.classList.remove('error', 'success');
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.classList.remove('show');
        }
    }

    // Real-time validation
    nameInput.addEventListener('blur', function() {
        const name = this.value.trim();
        if (name === '') {
            showError(this, 'Name is required');
        } else if (!validateName(name)) {
            showError(this, 'Name must be at least 2 characters');
        } else {
            showSuccess(this);
        }
    });

    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email === '') {
            showError(this, 'Email is required');
        } else if (!validateEmail(email)) {
            showError(this, 'Please enter a valid email address');
        } else {
            showSuccess(this);
        }
    });

    passwordInput.addEventListener('blur', function() {
        const password = this.value;
        if (password === '') {
            showError(this, 'Password is required');
        } else if (!validatePassword(password)) {
            showError(this, 'Password must be at least 6 characters');
        } else {
            showSuccess(this);
        }
    });

    confirmPasswordInput.addEventListener('blur', function() {
        const password = passwordInput.value;
        const confirmPassword = this.value;
        if (confirmPassword === '') {
            showError(this, 'Please confirm your password');
        } else if (password !== confirmPassword) {
            showError(this, 'Passwords do not match');
        } else {
            showSuccess(this);
        }
    });

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strengthBar = this.parentNode.querySelector('.password-strength');
        
        if (!strengthBar) {
            strengthBar = document.createElement('div');
            strengthBar.className = 'password-strength';
            strengthBar.innerHTML = '<div class="password-strength-bar"></div>';
            this.parentNode.appendChild(strengthBar);
        }
        
        const bar = strengthBar.querySelector('.password-strength-bar');
        const strength = checkPasswordStrength(password);
        
        bar.className = 'password-strength-bar ' + strength;
    });

    // Clear validation on input
    nameInput.addEventListener('input', function() {
        clearValidation(this);
    });

    emailInput.addEventListener('input', function() {
        clearValidation(this);
    });

    passwordInput.addEventListener('input', function() {
        clearValidation(this);
    });

    confirmPasswordInput.addEventListener('input', function() {
        clearValidation(this);
    });

    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const terms = signupForm.querySelector('input[name="terms"]').checked;
        const newsletter = signupForm.querySelector('input[name="newsletter"]').checked;
        
        // Validate all fields
        let isValid = true;
        
        if (name === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else if (!validateName(name)) {
            showError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        } else {
            showSuccess(nameInput);
        }
        
        if (email === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }
        
        if (password === '') {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            showSuccess(passwordInput);
        }
        
        if (confirmPassword === '') {
            showError(confirmPasswordInput, 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        } else {
            showSuccess(confirmPasswordInput);
        }
        
        if (!terms) {
            showNotification('Please accept the Terms & Conditions', 'error');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate signup process
        setTimeout(() => {
            // Store user data (in a real app, this would be handled by a backend)
            const userData = {
                name: name,
                email: email,
                newsletter: newsletter
            };
            
            localStorage.setItem('fyndUser', JSON.stringify(userData));
            
            // Show success message
            showNotification('Account created successfully! Redirecting...');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
            
        }, 2000);
    });

    // Terms & Conditions link
    const termsLink = document.querySelector('.checkbox-label a');
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Terms & Conditions page coming soon!');
        });
    }

    // Check if user is already logged in
    const userData = localStorage.getItem('fyndUser');
    if (userData) {
        // User is already logged in, redirect to home
        window.location.href = 'home.html';
    }
});
