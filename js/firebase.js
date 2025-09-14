// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDt0qjH1_AicVJTt7XdGiPQH3w0qudOZ_w",
    authDomain: "fynd-ee754.firebaseapp.com",
    projectId: "fynd-ee754",
    storageBucket: "fynd-ee754.appspot.com",  // Fixed storage bucket URL
    messagingSenderId: "619665587456",
    appId: "1:619665587456:web:615f5e42503a02004187e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Auth state observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        };
        localStorage.setItem('user', JSON.stringify(userData));
        createUserDocument(user);
    } else {
        // User is signed out
        localStorage.removeItem('user');
    }
});

// Create or update user document in Firestore
async function createUserDocument(user) {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        try {
            await setDoc(userRef, {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                cart: [],
                wishlist: [],
                createdAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error creating user document:", error);
        }
    }
}

// Google Sign In
async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Error during Google sign in:", error);
        throw error;
    }
}

// Sign Out
async function signOutUser() {
    try {
        await signOut(auth);
        localStorage.removeItem('user');
        window.location.href = '/html/login.html';
    } catch (error) {
        console.error("Error signing out:", error);
        throw error;
    }
}

// Cart Operations
async function addToCartDB(userId, product) {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            cart: arrayUnion(product)
        });
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
}

async function removeFromCartDB(userId, product) {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            cart: arrayRemove(product)
        });
    } catch (error) {
        console.error("Error removing from cart:", error);
        throw error;
    }
}

// Wishlist Operations
async function addToWishlistDB(userId, product) {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            wishlist: arrayUnion(product)
        });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        throw error;
    }
}

async function removeFromWishlistDB(userId, product) {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            wishlist: arrayRemove(product)
        });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        throw error;
    }
}

// Get user's data
async function getUserData(userId) {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            return userSnap.data();
        }
        return null;
    } catch (error) {
        console.error("Error getting user data:", error);
        throw error;
    }
}

// Export all necessary functions and objects
export {
    auth,
    db,
    signInWithGoogle,
    signOutUser,
    addToCartDB,
    removeFromCartDB,
    addToWishlistDB,
    removeFromWishlistDB,
    getUserData
};
