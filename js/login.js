document.addEventListener("DOMContentLoaded", () => {
    // Check if user is already logged in FIRST
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        window.location.replace("./home.html");
        return; // Stop execution if user is logged in
    }

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const submitBtn = loginForm.querySelector("button[type=\"submit\"]");
    const googleBtn = document.getElementById("googleSignIn");

    function showNotification(message, type = "success") {
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Handle form submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!validateEmail(email)) {
            showNotification("Please enter a valid email address", "error");
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = "Logging in...";

        try {
            // Create user data
            const userData = {
                email: email,
                name: email.split("@")[0],
                cart: [],
                wishlist: []
            };

            // Store user data
            localStorage.setItem("currentUser", JSON.stringify(userData));
            showNotification("Login successful! Redirecting...");

            // Redirect after a short delay
            setTimeout(() => {
                window.location.replace("./home.html");
            }, 1000);
        } catch (error) {
            console.error("Login error:", error);
            showNotification("An error occurred. Please try again.", "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Sign In";
        }
    });

    // Handle Google sign in
    if (googleBtn) {
        googleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            try {
                // Demo user data
                const userData = {
                    email: "demo@example.com",
                    name: "Demo User",
                    cart: [],
                    wishlist: []
                };

                // Store user data
                localStorage.setItem("currentUser", JSON.stringify(userData));
                showNotification("Login successful! Redirecting...");
                
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.replace("./home.html");
                }, 1000);
            } catch (error) {
                console.error("Google login error:", error);
                showNotification("An error occurred. Please try again.", "error");
            }
        });
    }
});
