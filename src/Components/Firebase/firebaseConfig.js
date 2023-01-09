
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC6XmnY7nLzZJVoh4NSqpGFVnu8DRtDfQs",
    authDomain: "vezaplikacija.firebaseapp.com",
    projectId: "vezaplikacija",
    storageBucket: "vezaplikacija.appspot.com",
    messagingSenderId: "604566414921",
    appId: "1:604566414921:web:2accf21eba7252ea30c198",
    measurementId: "G-ZZ0QLH4BBZ"
};

const app = initializeApp(firebaseConfig);



export const storage = getStorage(app)
export const db = getFirestore(app)
export default app