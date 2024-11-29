// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnNZqdL82wy4kehNV435p0T3_nFXXUSfM",
  authDomain: "app-8d163.firebaseapp.com",
  projectId: "app-8d163",
  storageBucket: "app-8d163.firebasestorage.app",
  messagingSenderId: "922563450818",
  appId: "1:922563450818:web:cc7d9efa6fc591d2a8685b",
  measurementId: "G-L83KNKGGVL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
