// login.js
import { 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { auth, db } from './firebase.js';

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const submitBtn = loginForm.querySelector('btn-primary');
    const googleBtn = document.getElementById('googleSignIn');

    // === Email + Password Login ===
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            return showNotification('Please enter both email and password', 'error');
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Logging in...";

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Ensure Firestore doc exists
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName || "",
                    createdAt: new Date().toISOString(),
                    cart: [],
                    wishlist: []
                });
            }

            showNotification('Login successful! Redirecting...', 'success');

            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);

        } catch (error) {
            console.error("Login error:", error);
            let errorMessage = "Failed to login. Please try again.";
            if (error.code === "auth/user-not-found") {
                errorMessage = "No account found with this email.";
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password. Try again.";
            }
            showNotification(errorMessage, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Login";
        }
    });

    // === Google Login ===
    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            const provider = new GoogleAuthProvider();

            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;

                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    await setDoc(userDocRef, {
                        uid: user.uid,
                        email: user.email,
                        name: user.displayName,
                        createdAt: new Date().toISOString(),
                        cart: [],
                        wishlist: []
                    });
                }

                showNotification('Google login successful! Redirecting...', 'success');

                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);

            } catch (error) {
                console.error("Google login error:", error);
                showNotification("Google login failed. Try again.", 'error');
            }
        });
    }

    // === Auto redirect if already logged in ===
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = "home.html";
        }
    });
});

// Simple Notification
function showNotification(message, type = "info") {
    alert(`${type.toUpperCase()}: ${message}`);
}
