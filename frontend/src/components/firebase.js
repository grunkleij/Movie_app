import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUmtGqCYaWzEiS-0kczEkS1n-mIGZ-nao",
  authDomain: "movie-93312.firebaseapp.com",
  projectId: "movie-93312",
  storageBucket: "movie-93312.appspot.com",
  messagingSenderId: "591821270201",
  appId: "1:591821270201:web:dea27144fef07b698dff68",
  measurementId: "G-XHX9TD26QP",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;