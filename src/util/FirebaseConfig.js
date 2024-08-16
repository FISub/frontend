// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnPE-jtK4AolyNgxX_HkPpoJ66gtPUJq0",
  authDomain: "woorihealth-storage.firebaseapp.com",
  projectId: "woorihealth-storage",
  storageBucket: "woorihealth-storage.appspot.com",
  messagingSenderId: "286178546678",
  appId: "1:286178546678:web:24184803196b6bd7f8edd7",
  measurementId: "G-M460C5FQ44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL };