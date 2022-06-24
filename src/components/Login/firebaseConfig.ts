// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlp4If2FRV64F12WZ8rsHpjPvS_RRuvNA",
    authDomain: "bugs-management.firebaseapp.com",
    projectId: "bugs-management",
    storageBucket: "bugs-management.appspot.com",
    messagingSenderId: "852586778964",
    appId: "1:852586778964:web:8b1fdb9cb5c3e391f238c1",
    measurementId: "G-6K1LC8SMR1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()