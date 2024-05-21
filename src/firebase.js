// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCugaO0sf_QbpShSfjH6p8bPhblN1qqOJY",
  authDomain: "kckk-c923b.firebaseapp.com",
  projectId: "kckk-c923b",
  storageBucket: "kckk-c923b.appspot.com",
  messagingSenderId: "92318683566",
  appId: "1:92318683566:web:3ccb97ea5cfed072c1783f",
  measurementId: "G-ZCKGPDP7SF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
