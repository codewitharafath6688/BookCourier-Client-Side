// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALtkTotO1spdhcDO6z3YC6oTlY1O0cqe0",
  authDomain: "bookcourier-auth.firebaseapp.com",
  projectId: "bookcourier-auth",
  storageBucket: "bookcourier-auth.firebasestorage.app",
  messagingSenderId: "1097526656554",
  appId: "1:1097526656554:web:d17f3410c8dd21ced1cd53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);