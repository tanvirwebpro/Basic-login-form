// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSdxxbvtR-VPiy5oCjvJkUwzIctGGs_UM",
  authDomain: "user-email-password-auth-b50f6.firebaseapp.com",
  projectId: "user-email-password-auth-b50f6",
  storageBucket: "user-email-password-auth-b50f6.appspot.com",
  messagingSenderId: "277979577456",
  appId: "1:277979577456:web:2a9e42184b96fdbee948b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;