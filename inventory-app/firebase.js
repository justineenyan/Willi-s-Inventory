// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD-VdOjQKIduwGAXv6U9dbUQEWctfaWkyI",
  authDomain: "inventory-management-app-6020f.firebaseapp.com",
  projectId: "inventory-management-app-6020f",
  storageBucket: "inventory-management-app-6020f.appspot.com",
  messagingSenderId: "47799071897",
  appId: "1:47799071897:web:373749388e0c6b0a71f408",
  measurementId: "G-VFDK9T04QS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


export { firestore };
  