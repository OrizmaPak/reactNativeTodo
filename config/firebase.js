// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1dt_Fzr6axH7hZnp22-hHmbaCWzDhS68",
  authDomain: "petrongtodo.firebaseapp.com",
  projectId: "petrongtodo",
  storageBucket: "petrongtodo.appspot.com",
  messagingSenderId: "992981415521",
  appId: "1:992981415521:web:3a079547c1cc2804719c20"
};


let app;

// Check if the app has already been initialized
try {
  app = getApp();
} catch (error) {
  // If the app hasn't been initialized, initialize it
  app = initializeApp(firebaseConfig);
}

export { app };