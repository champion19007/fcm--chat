// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmbjSA9JS8EEBzuNE71CC34v7ujf_bTlQ",
  authDomain: "chat-fcm-app.firebaseapp.com",
  projectId: "chat-fcm-app",
  storageBucket: "chat-fcm-app.firebasestorage.app",
  messagingSenderId: "879960857162",
  appId: "1:879960857162:web:f7849b331ae2c8413f64b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);