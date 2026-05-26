import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_2GhSclYUM7FpiG5jQg-fL03PPAAeUnQ",
  authDomain: "gangamakhana-8fe9c.firebaseapp.com",
  projectId: "gangamakhana-8fe9c",
  storageBucket: "gangamakhana-8fe9c.firebasestorage.app",
  messagingSenderId: "551218226341",
  appId: "1:551218226341:web:d13d50ca8720f36fd6594c",
  measurementId: "G-R0PK5Z9KFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
