import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "map-project-626f9.firebaseapp.com",
  projectId: "map-project-626f9",
  storageBucket: "map-project-626f9.firebasestorage.app",
  messagingSenderId: "102867221487",
  appId: "1:102867221487:web:1d874ed432d9c72f75941a"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
