import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpuGH-COAEfAqdqP1k8JVNop_LS30qBuw",
  authDomain: "kobra-app-65339.firebaseapp.com",
  projectId: "kobra-app-65339",
  storageBucket: "kobra-app-65339.appspot.com",
  messagingSenderId: "559186847211",
  appId: "1:559186847211:web:c917b116089d987b6da5ae",
  measurementId: "G-9ZKE89WRZD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
