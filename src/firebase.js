// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebase = {
    apiKey: "AIzaSyBTR0xUBi16UD7GQLosXOz9Yz3UfJ7856M",
    authDomain: "games-c3adb.firebaseapp.com",
    projectId: "games-c3adb",
    storageBucket: "games-c3adb.firebasestorage.app",
    messagingSenderId: "541688677560",
    appId: "1:541688677560:web:d210295f66ea2673f1a04d",
};

const app = initializeApp(firebase);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
