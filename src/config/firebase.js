import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    // Pegar configuración de Firebase Console
    apiKey: "AIzaSyB3pmrbiri9Ivwb3SInzNzxBlC4QNM1CVE",
    authDomain: "micomidafavorita-2f506.firebaseapp.com",
    projectId: "micomidafavorita-2f506",
    storageBucket: "micomidafavorita-2f506.firebasestorage.app",
    messagingSenderId: "710554809756",
    appId: "1:710554809756:web:b7fb308d220296ecd50459",
    measurementId: "G-E09E2ZZ92J"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);