// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdUjXCTADYo9Y1CQWXvG8_qMJEEVe3UiI",
  authDomain: "attarra-e80ee.firebaseapp.com",
  projectId: "attarra-e80ee",
  storageBucket: "attarra-e80ee.appspot.com",
  messagingSenderId: "35231514717",
  appId: "1:35231514717:web:a310f6eddd89d2df84cdb4",
  measurementId: "G-GXQBZL6QEF",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
