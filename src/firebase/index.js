// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj-ygSeu2rquiloy2Bz_Pi5JyjEz07AUg",
  authDomain: "reacttemplate-5475a.firebaseapp.com",
  projectId: "reacttemplate-5475a",
  storageBucket: "reacttemplate-5475a.appspot.com",
  messagingSenderId: "910348689500",
  appId: "1:910348689500:web:28a5818322e1966f964699"
  // apiKey: process.env.REACT_APP_apiKey,
  // authDomain: process.env.REACT_APP_authDomain,
  // projectId: process.env.REACT_APP_projectId,
  // storageBucket: process.env.REACT_APP_storageBucket,
  // messagingSenderId: process.env.REACT_APP_messagingSenderId,
  // appId:process.env.REACT_APP_appId
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export {firebaseAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword}