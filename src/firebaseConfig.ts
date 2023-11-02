import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAczV3MPDibY5O7WwNIvk10wmToMBV92E4",
  authDomain: "vaivem-eb6fa.firebaseapp.com",
  projectId: "vaivem-eb6fa",
  storageBucket: "vaivem-eb6fa.appspot.com",
  messagingSenderId: "859501099388",
  appId: "1:859501099388:web:32e69a5ed9598f2ce88cf9",
  measurementId: "G-31JKZWT507"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
