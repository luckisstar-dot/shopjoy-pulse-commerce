
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJmL0bxw2B5M349P-8KpphcBFMcdtT2ss",
  authDomain: "shop-project-7d0b0.firebaseapp.com",
  projectId: "shop-project-7d0b0",
  storageBucket: "shop-project-7d0b0.firebasestorage.app",
  messagingSenderId: "875043531801",
  appId: "1:875043531801:web:c65860a9917701dc2dce88",
  measurementId: "G-9GJ0WNDR54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, auth, db, storage, analytics };

