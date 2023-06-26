import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBoG0oDEM3eO1YXTUch7-uPEP3sHa4NghA",
    authDomain: "hackthonone-a12b0.firebaseapp.com",
    projectId: "hackthonone-a12b0",
    storageBucket: "hackthonone-a12b0.appspot.com",
    messagingSenderId: "163176774824",
    appId: "1:163176774824:web:d22ded385dec44975c969d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();