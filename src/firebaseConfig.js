import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    remove,
    update,
} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAvEAQJtn5GWly4E4SY3kXnbFPwPnwMlsk",
    authDomain: "game-7c76e.firebaseapp.com",
    projectId: "game-7c76e",
    storageBucket: "game-7c76e.firebasestorage.app",
    messagingSenderId: "98663584833",
    appId: "1:98663584833:web:42e7831cf6928902c622c0",
    databaseURL: "https://game-7c76e-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
