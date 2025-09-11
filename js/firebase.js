// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDt0qjH1_AicVJTt7XdGiPQH3w0qudOZ_w",
  authDomain: "fynd-ee754.firebaseapp.com",
  projectId: "fynd-ee754",
  storageBucket: "fynd-ee754.firebasestorage.app",
  messagingSenderId: "619665587456",
  appId: "1:619665587456:web:615f5e42503a02004187e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth + Google Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Firestore
export const db = getFirestore(app);
