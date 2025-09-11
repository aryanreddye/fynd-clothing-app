// signup.js
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const submitBtn = signupForm.querySelector(".btn-primary");

  // 🔹 Validation helpers
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function validatePassword(password) {
    return password.length >= 6;
  }
  function validateName(name) {
    return name.trim().length >= 2;
  }

  // 🔹 Form submit
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const terms = signupForm.querySelector('input[name="terms"]').checked;
    const newsletter = signupForm.querySelector('input[name="newsletter"]').checked;

    if (!validateName(name)) return alert("Name must be at least 2 characters");
    if (!validateEmail(email)) return alert("Please enter a valid email");
    if (!validatePassword(password)) return alert("Password must be at least 6 characters");
    if (password !== confirmPassword) return alert("Passwords do not match");
    if (!terms) return alert("Please accept the Terms & Conditions");

    // 🔄 Loading state
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
      // ✅ Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Save name in Firebase Auth profile
      await updateProfile(userCredential.user, { displayName: name });

      // ✅ Save user data in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: name,
        email: email,
        newsletter: newsletter,
        createdAt: new Date().toISOString()
      });

      alert("Account created successfully! 🎉 Redirecting...");
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  });

  // 🔹 Already logged in? Redirect
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "home.html";
    }
  });
});
