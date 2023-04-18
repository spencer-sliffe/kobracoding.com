// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpuGH-COAEfAqdqP1k8JVNop_LS30qBuw",
  authDomain: "kobra-app-65339.firebaseapp.com",
  projectId: "kobra-app-65339",
  storageBucket: "kobra-app-65339.appspot.com",
  messagingSenderId: "559186847211",
  appId: "1:559186847211:web:c917b116089d987b6da5ae",
  measurementId: "G-9ZKE89WRZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);