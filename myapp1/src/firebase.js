// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9hj4pV5ttuHPPnXgFAi8-y0ZC1aK1QJQ",
  authDomain: "orchids-3a662.firebaseapp.com",
  projectId: "orchids-3a662",
  storageBucket: "orchids-3a662.appspot.com",
  messagingSenderId: "925644242753",
  appId: "1:925644242753:web:f7ca4ef1e515e72e8f6bc0",
  measurementId: "G-7YWNTW093X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };