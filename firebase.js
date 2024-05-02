// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import {initializeApp} from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3pp9j28mGEePh3kahvieVrEK4mtqYls4",
  authDomain: "fir-auth-30ef1.firebaseapp.com",
  projectId: "fir-auth-30ef1",
  storageBucket: "fir-auth-30ef1.appspot.com",
  messagingSenderId: "863047925201",
  appId: "1:863047925201:web:cf47c2fffe4b12dc8734f0",
  measurementId: "G-Q09Z14SR1P"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

const auth = getAuth(app);
const analytics = getAnalytics(app);



export { auth };