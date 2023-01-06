// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJOh_pz_-3idNdbMos68s9ljS3jwtDUSE",
  authDomain: "quiz-template-app-nuxt.firebaseapp.com",
  projectId: "quiz-template-app-nuxt",
  storageBucket: "quiz-template-app-nuxt.appspot.com",
  messagingSenderId: "515140297198",
  appId: "1:515140297198:web:0ddc055ebb3e7ba12c2eff"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default (context, inject) => {
  inject('firebase', firebaseApp)
}