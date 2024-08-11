// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB1U1EwlmM_kxG_1BYflfgLOujVyGNRyQA",
  authDomain: "veho-7fea1.firebaseapp.com",
  projectId: "veho-7fea1",
  storageBucket: "veho-7fea1.appspot.com",
  messagingSenderId: "488503249745",
  appId: "1:488503249745:web:91062e506bdb5383d26170",
  measurementId: "G-SVZWH7JQE5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
