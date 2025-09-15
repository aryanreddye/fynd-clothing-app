import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
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

// --- Firebase Config ---
const firebaseConfig = {
    apiKey: "AIzaSyDt0qjH1_AicVJTt7XdGiPQH3w0qudOZ_w",
    authDomain: "fynd-ee754.firebaseapp.com",
    projectId: "fynd-ee754",
    storageBucket: "fynd-ee754.appspot.com",
    messagingSenderId: "619665587456",
    appId: "1:619665587456:web:615f5e42503a02004187e5"
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// --- Create / Update User Document in Firestore ---
async function createUserDocument(user, additionalData = {}) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    const baseData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || additionalData.name || user.email.split("@")[0],
        photoURL: user.photoURL || null,
        cart: [],
        wishlist: [],
        ...additionalData
    };

    if (!userSnap.exists()) {
        // Create new user doc
        await setDoc(userRef, {
            ...baseData,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        });
        return baseData;
    } else {
        // Update login time
        await updateDoc(userRef, {
            lastLogin: new Date().toISOString(),
            ...additionalData
        });
        return { ...userSnap.data(), ...additionalData };
    }
}

// --- Google Sign-In ---
async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await createUserDocument(user);
        return user;
    } catch (error) {
        console.error("Google sign-in error:", error);
        throw error;
    }
}

// --- Sign Out ---
async function signOutUser() {
    try {
        await signOut(auth);
        localStorage.removeItem("user");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error signing out:", error);
        throw error;
    }
}

// --- Cart Operations ---
async function addToCartDB(userId, product) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { cart: arrayUnion(product) });
}

async function removeFromCartDB(userId, product) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { cart: arrayRemove(product) });
}

// --- Wishlist Operations ---
async function addToWishlistDB(userId, product) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { wishlist: arrayUnion(product) });
}

async function removeFromWishlistDB(userId, product) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { wishlist: arrayRemove(product) });
}

// --- Get User Data ---
async function getUserData(userId) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
}

// --- Auth State Listener ---
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userData = await createUserDocument(user);
        localStorage.setItem("user", JSON.stringify(userData));
    } else {
        localStorage.removeItem("user");
    }
});

// --- Exports ---
export {
    auth,
    db,
    signInWithGoogle,
    signOutUser,
    addToCartDB,
    removeFromCartDB,
    addToWishlistDB,
    removeFromWishlistDB,
    getUserData,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    createUserDocument
};
