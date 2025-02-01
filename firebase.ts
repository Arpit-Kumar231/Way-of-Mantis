// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtQEgmfkpJjACeudVm2hNyXTYTKE9lLt8",
  authDomain: "mantis-22c63.firebaseapp.com",
  projectId: "mantis-22c63",
  storageBucket: "mantis-22c63.firebasestorage.app",
  messagingSenderId: "848404683086",
  appId: "1:848404683086:web:6a7db77c072ac48fe3e61f",
  measurementId: "G-P9GZESTW7G",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
export { db };
