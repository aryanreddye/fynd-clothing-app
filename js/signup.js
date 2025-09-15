// signup.js
import { 
    getAuth, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { auth, db } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitBtn = signupForm.querySelector('.btn-primary');

    // Helper: show small notifications
    function showNotification(message, type = 'info') {
        alert(`${type.toUpperCase()}: ${message}`); // replace with custom toast later
    }

    // === FORM SUBMIT HANDLER ===
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const terms = signupForm.querySelector('input[name="terms"]').checked;
        const newsletter = signupForm.querySelector('input[name="newsletter"]').checked;

        // --- Basic validation ---
        if (!name || name.length < 2) {
            return showNotification('Name must be at least 2 characters', 'error');
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return showNotification('Please enter a valid email address', 'error');
        }
        if (!password || password.length < 6) {
            return showNotification('Password must be at least 6 characters', 'error');
        }
        if (password !== confirmPassword) {
            return showNotification('Passwords do not match', 'error');
        }
        if (!terms) {
            return showNotification('You must accept the Terms & Conditions', 'error');
        }

        // Disable button while processing
        submitBtn.disabled = true;
        submitBtn.textContent = "Creating account...";

        try {
            // --- Create user in Firebase Auth ---
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // --- Save extra data in Firestore ---
            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                newsletter,
                createdAt: new Date().toISOString(),
                cart: [],
                wishlist: []
            });

            showNotification('Account created successfully!', 'success');
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1500);

        } catch (error) {
            console.error(error);
            let msg = 'Something went wrong. Please try again.';
            if (error.code === 'auth/email-already-in-use') {
                msg = 'This email is already registered. Try logging in.';
            }
            showNotification(msg, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Sign Up";
        }
    });

    // If already logged in, redirect
    auth.onAuthStateChanged((user) => {
        if (user) {
            window.location.href = "home.html";
        }
    });
});
