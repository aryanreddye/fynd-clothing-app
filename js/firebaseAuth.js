// Firebase Auth helper for Fynd (Google + profile storage)

(function(){
	// Replace with your Firebase config
	const firebaseConfig = {
        apiKey: "AIzaSyDt0qjH1_AicVJTt7XdGiPQH3w0qudOZ_w",
        authDomain: "fynd-ee754.firebaseapp.com",
        projectId: "fynd-ee754",
        storageBucket: "fynd-ee754.firebasestorage.app",
        messagingSenderId: "619665587456",
        appId: "1:619665587456:web:615f5e42503a02004187e5"
	};

	if (typeof firebase !== 'undefined' && !firebase.apps.length) {
		try {
			firebase.initializeApp(firebaseConfig);
			console.log('Firebase initialized successfully');
		} catch (error) {
			console.error('Firebase initialization error:', error);
		}
	} else if (typeof firebase === 'undefined') {
		console.error('Firebase SDK not loaded');
	} else {
		console.log('Firebase already initialized');
	}

	const db = typeof firebase !== 'undefined' ? firebase.firestore() : null;

	async function upsertUser(user) {
		if (!db || !user || !user.uid) return;
		const ref = db.collection('users').doc(user.uid);
		const data = {
			uid: user.uid,
			email: user.email || null,
			displayName: user.displayName || null,
			photoURL: user.photoURL || null,
			providerId: (user.providerData && user.providerData[0] && user.providerData[0].providerId) || 'google.com',
			updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
			createdAt: firebase.firestore.FieldValue.serverTimestamp()
		};
		try {
			await ref.set(data, { merge: true });
		} catch (e) {
			console.error('Failed to save user', e);
		}
	}

	async function signInWithGoogle() {
		if (typeof firebase === 'undefined') throw new Error('Firebase not loaded');
		
		try {
			const provider = new firebase.auth.GoogleAuthProvider();
			// Add scopes if needed
			provider.addScope('email');
			provider.addScope('profile');
			
			const result = await firebase.auth().signInWithPopup(provider);
			const user = result.user;
			
			console.log('Google sign-in successful:', user);
			await upsertUser(user);
			return user;
		} catch (error) {
			console.error('Google sign-in error:', error);
			throw error;
		}
	}

	async function signOut() {
		if (typeof firebase === 'undefined') return;
		try {
			await firebase.auth().signOut();
		} catch (_) {}
	}

	window.FyndAuth = {
		signInWithGoogle,
		signOut
	};
})();


