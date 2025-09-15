// Login Page JavaScript
import { 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { auth, db } from './firebase.js';

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const submitBtn = loginForm.querySelector('.btn-primary');
    const googleBtn = document.getElementById('googleLoginBtn');

    // Email + Password Login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (email === '' || password === '') {
            showNotification('Please enter both email and password', 'error');
            return;
        }

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // Get user document
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    // If user doc doesn't exist, create it
                    await setDoc(userDocRef, {
                        email: user.email,
                        name: user.displayName || "",
                        createdAt: new Date().toISOString(),
                        cart: [],
                        wishlist: []
                    });
                }

                showNotification('Login successful! Redirecting...', 'success');

                // Save to localStorage (optional)
                localStorage.setItem('fyndUser', JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName || ""
                }));

                // Redirect
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            })
            .catch((error) => {
                console.error("Login error:", error);
                let errorMessage = "Failed to login. Please try again.";
                if (error.code === "auth/user-not-found") {
                    errorMessage = "No account found with this email.";
                } else if (error.code === "auth/wrong-password") {
                    errorMessage = "Incorrect password. Try again.";
                }
                showNotification(errorMessage, 'error');
            })
            .finally(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            });
    });

    // Google Login
    if (googleBtn) {
        googleBtn.addEventListener('click', async function () {
            const provider = new GoogleAuthProvider();

            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;

                // Create user doc if not exists
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    await setDoc(userDocRef, {
                        email: user.email,
                        name: user.displayName,
                        createdAt: new Date().toISOString(),
                        cart: [],
                        wishlist: []
                    });
                }

                showNotification('Google login successful! Redirecting...', 'success');

                localStorage.setItem('fyndUser', JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName
                }));

                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            } catch (error) {
                console.error("Google login error:", error);
                showNotification("Google login failed. Try again.", 'error');
            }
        });
    }

    // If already logged in
    const userData = localStorage.getItem('fyndUser');
    if (userData) {
        window.location.href = 'home.html';
    }
});

// Simple Notification System
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}
