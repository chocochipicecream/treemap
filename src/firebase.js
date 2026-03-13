import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANF4Mw3ouhmtE61RalU9djYFNVGywRjhw",
  authDomain: "treemap-56075.firebaseapp.com",
  projectId: "treemap-56075",
  storageBucket: "treemap-56075.firebasestorage.app",
  messagingSenderId: "178071265527",
  appId: "1:178071265527:web:843f5894edc97a414533f2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);