// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcTE1H8HwzO9JrndAqCOVMxfTobarj6d4",
  authDomain: "projects-1889e.firebaseapp.com",
  projectId: "projects-1889e",
  storageBucket: "projects-1889e.appspot.com",
  messagingSenderId: "8155756503",
  appId: "1:8155756503:web:f7c49e615f688155d8bd92",
  measurementId: "G-Q43MGG5P2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)