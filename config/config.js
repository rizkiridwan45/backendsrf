import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAb2v-fYQZW8CrRv4N9Ee9a-8ntNM-fqWw",
    authDomain: "fir-apiapi.firebaseapp.com",
    databaseURL: "https://fir-apiapi-default-rtdb.firebaseio.com",
    projectId: "fir-apiapi",
    storageBucket: "fir-apiapi.firebasestorage.app",
    messagingSenderId: "297649995130",
    appId: "1:297649995130:web:e6f8947ee3ce593d092ac3"
  
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log('JWT_SECRET:', process.env.JWT_SECRET);

export default db; // Ekspor db