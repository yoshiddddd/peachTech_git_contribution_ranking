// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "peachtech-contribution-rkg.firebaseapp.com",
    projectId: "peachtech-contribution-rkg",
    storageBucket: "peachtech-contribution-rkg.appspot.com",
    messagingSenderId: "916764851076",
    appId: "1:916764851076:web:d39cdfeb757af7509e7bd1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)