// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // If Firebase is available, enhance with social login
    const hasFirebase = typeof window !== 'undefined' && window.firebase && window.firebase.apps;

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitBtn = loginForm.querySelector('.btn-primary');

    // Form validation functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
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
    emailInput.addEventListener('blur', function () {
        const email = this.value.trim();
        if (email === '') {
            showError(this, 'Email is required');
        } else if (!validateEmail(email)) {
            showError(this, 'Please enter a valid email address');
        } else {
            showSuccess(this);
        }
    });

    passwordInput.addEventListener('blur', function () {
        const password = this.value;
        if (password === '') {
            showError(this, 'Password is required');
        } else if (!validatePassword(password)) {
            showError(this, 'Password must be at least 6 characters');
        } else {
            showSuccess(this);
        }
    });

    // Clear validation on input
    emailInput.addEventListener('input', function () {
        clearValidation(this);
    });

    passwordInput.addEventListener('input', function () {
        clearValidation(this);
    });

    // Form submission (email/password demo only)
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = loginForm.querySelector('input[name="remember"]').checked;

        // Validate all fields
        let isValid = true;

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

        if (!isValid) {
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate login process
        setTimeout(() => {
            // Store user data (in a real app, this would be handled by a backend)
            const userData = {
                email: email,
                name: email.split('@')[0], // Simple name extraction
                remember: remember
            };
            localStorage.setItem('fyndUser', JSON.stringify(userData));

            // Show success message
            showNotification('Login successful! Redirecting...');

            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        }, 2000);
    });

    // Social login wiring (Google)
    const googleBtn = document.getElementById('googleSignIn');
    if (googleBtn && window.FyndAuth && typeof window.FyndAuth.signInWithGoogle === 'function') {
        googleBtn.addEventListener('click', async function (e) {
            e.preventDefault();
            try {
                const user = await window.FyndAuth.signInWithGoogle();
                if (user && user.email) {
                    const userData = {
                        email: user.email,
                        name: user.displayName || user.email.split('@')[0]
                    };
                    localStorage.setItem('fyndUser', JSON.stringify(userData));
                    showNotification('Login successful! Redirecting...');
                    window.location.href = 'home.html';
                }
            } catch (err) {
                showNotification('Google sign-in failed');
            }
        });
    }

    // Forgot password link
    const forgotLink = document.querySelector('.forgot-link');
    if (forgotLink) {
        forgotLink.addEventListener('click', function (e) {
            e.preventDefault();
            showNotification('Password reset feature coming soon!');
        });
    }

    // Check if user is already logged in
    const userData = localStorage.getItem('fyndUser');
    if (userData) {
        // User is already logged in, redirect to home
        window.location.href = 'home.html';
    }
});
