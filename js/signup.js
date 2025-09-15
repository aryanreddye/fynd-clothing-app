// signup.js
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const submitBtn = signupForm.querySelector(".btn-primary");

    function showNotification(message, type = "info") {
        alert(`${type.toUpperCase()}: ${message}`);
    }

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const terms = signupForm.querySelector('input[name="terms"]').checked;
        const newsletter = signupForm.querySelector('input[name="newsletter"]').checked;

        if (!name || name.length < 2) return showNotification("Name must be at least 2 characters", "error");
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showNotification("Please enter a valid email address", "error");
        if (!password || password.length < 6) return showNotification("Password must be at least 6 characters", "error");
        if (password !== confirmPassword) return showNotification("Passwords do not match", "error");
        if (!terms) return showNotification("You must accept the Terms & Conditions", "error");

        submitBtn.disabled = true;
        submitBtn.textContent = "Creating account...";

        try {
            // Firebase Auth user creation
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save extra profile data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name,
                email,
                newsletter,
                createdAt: new Date().toISOString(),
                cart: [],
                wishlist: []
            });

            showNotification("Account created successfully!", "success");
            window.location.href = "home.html"; // redirect immediately

        } catch (error) {
            console.error(error);
            let msg = "Something went wrong. Please try again.";
            if (error.code === "auth/email-already-in-use") {
                msg = "This email is already registered. Try logging in.";
            }
            showNotification(msg, "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Sign Up";
        }
    });

    // Auto redirect if already logged in
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = "home.html";
        }
    });
});
