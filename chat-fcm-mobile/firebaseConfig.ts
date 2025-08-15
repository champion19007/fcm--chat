import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBmbjSA9JS8EEBzuNE71CC34v7ujf_bTlQ",
  authDomain: "chat-fcm-app.firebaseapp.com",
  projectId: "chat-fcm-app",
  storageBucket: "chat-fcm-app.firebasestorage.app",
  messagingSenderId: "879960857162",
  appId: "1:879960857162:web:f7849b331ae2c8413f64b3"
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,

});