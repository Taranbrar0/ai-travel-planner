// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHqcOekHsXz4Av4XCpzdsN9H0aYnFj8dY",
  authDomain: "ai-tripplanner-8c899.firebaseapp.com",
  projectId: "ai-tripplanner-8c899",
  storageBucket: "ai-tripplanner-8c899.appspot.com",
  messagingSenderId: "299930923973",
  appId: "1:299930923973:web:ffb76dfd526a6ceb29d1ac",
  measurementId: "G-7XDSQ8XHGE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);