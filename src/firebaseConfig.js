import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    piKey: "AIzaSyCacfJ8NeCgqwH_7kI6tMsPLEGRWBaGtkQ",
    authDomain: "calcetto-fc4b9.firebaseapp.com",
    projectId: "calcetto-fc4b9",
    storageBucket: "calcetto-fc4b9.firebasestorage.app",
    messagingSenderId: "860702319098",
    appId: "1:860702319098:web:cb0fcdd2cfdf6aa5420443",
    measurementId: "G-GW7E7XSTL4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
