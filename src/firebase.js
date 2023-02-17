import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM_jhyqqSzLXvx6im1A2GNNDPkLIkcaVg",
  authDomain: "base-de-datos-calendario.firebaseapp.com",
  databaseURL: "https://base-de-datos-calendario-default-rtdb.firebaseio.com",
  projectId: "base-de-datos-calendario",
  storageBucket: "base-de-datos-calendario.appspot.com",
  messagingSenderId: "536832630612",
  appId: "1:536832630612:web:f265946b718aef8367b2c1",
  measurementId: "G-BC2JZMBRDB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const db = getFirestore();
