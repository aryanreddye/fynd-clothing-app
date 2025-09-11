// login.js
import { auth, db, provider } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitBtn = loginForm.querySelector(".btn-primary");
  const googleBtn = document.getElementById("googleSignIn");

  // ✅ Form validation helpers
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  function validatePassword(password) {
    return password.length >= 6;
  }
  function showNotification(message) {
    alert(message); // Replace with your custom toast if available
  }

  // ✅ Email/Password Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!validateEmail(email)) {
      showNotification("Please enter a valid email address");
      return;
    }
    if (!validatePassword(password)) {
      showNotification("Password must be at least 6 characters");
      return;
    }

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      showNotification("Login successful! Redirecting...");
      setTimeout(() => (window.location.href = "home.html"), 1500);
    } catch (error) {
      showNotification("Error: " + error.message);
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  });

  // ✅ Google Login
  if (googleBtn) {
    googleBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user exists in Firestore
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email,
            photoURL: user.photoURL || "",
            provider: "google",
            createdAt: new Date().toISOString(),
          });
        }

        showNotification("Google login successful! Redirecting...");
        setTimeout(() => (window.location.href = "home.html"), 1500);
      } catch (err) {
        showNotification("Google sign-in failed: " + err.message);
      }
    });
  }

  // ✅ Already logged in? Redirect
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "home.html";
    }
  });

  // Forgot password placeholder
  const forgotLink = document.querySelector(".forgot-link");
  if (forgotLink) {
    forgotLink.addEventListener("click", (e) => {
      e.preventDefault();
      showNotification("Password reset feature coming soon!");
    });
  }
});
