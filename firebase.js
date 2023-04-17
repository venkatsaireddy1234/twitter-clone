// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-14be7.firebaseapp.com",
  projectId: "twitter-clone-14be7",
  storageBucket: "twitter-clone-14be7.appspot.com",
  messagingSenderId: "992569661497",
  appId: "1:992569661497:web:8a5f3a3f89baee5d0015e8",
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
const db = getFirestore();
const storage = getStorage();
export { app, db, storage };
