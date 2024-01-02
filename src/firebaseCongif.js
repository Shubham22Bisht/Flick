import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup} from "@firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAibz_JtPvubpLw-jOYDkUXFb7D_WhJ1WI",
    authDomain: "flick-8f1fb.firebaseapp.com",
    projectId: "flick-8f1fb",
    storageBucket: "flick-8f1fb.appspot.com",
    messagingSenderId: "168806451894",
    appId: "1:168806451894:web:5eb142b499e35b2d0b3417",
    measurementId: "G-H5RQ69TW2M"

  };

  const app=initializeApp(firebaseConfig);
  export const auth=getAuth(app);
  export const googleAuthProvider=new GoogleAuthProvider();
