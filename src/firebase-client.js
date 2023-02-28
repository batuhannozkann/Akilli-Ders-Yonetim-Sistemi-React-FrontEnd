// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjS6xbJTxgKdOhqErx6Y8CEr-q14Nn3wE",
  authDomain: "adysproject-e71bf.firebaseapp.com",
  projectId: "adysproject-e71bf",
  storageBucket: "adysproject-e71bf.appspot.com",
  messagingSenderId: "79540060035",
  appId: "1:79540060035:web:cc2527f7c1d9bebdbcc0b6",
  measurementId: "G-FDFZPRFBH1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
