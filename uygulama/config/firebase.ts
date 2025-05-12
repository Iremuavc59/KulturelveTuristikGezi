// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6qc-JcpMg9yM8aiwDgPD4-GgTwqCqAOM",
  authDomain: "kulturelweb.firebaseapp.com",
  projectId: "kulturelweb",
  storageBucket: "kulturelweb.firebasestorage.app",
  messagingSenderId: "271151845616",
  appId: "1:271151845616:web:bd15448a12aa14843df235"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);