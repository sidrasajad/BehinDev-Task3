// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDGBFbpmixPPlLpsZr0KYkHpbAb1q1_CeI",
  authDomain: "messaging-app-89dd2.firebaseapp.com",
  databaseURL: "https://messaging-app-89dd2-default-rtdb.firebaseio.com",
  projectId: "messaging-app-89dd2",
  storageBucket: "messaging-app-89dd2.appspot.com",
  messagingSenderId: "231475274639",
  appId: "1:231475274639:web:91a6a85de06e50560421fa",
  measurementId: "G-RQRGDDMRLL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
