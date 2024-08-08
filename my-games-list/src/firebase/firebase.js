
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyClCvx1cCqgVKpNA3frg0MVH2fC4ewC0nI",
  authDomain: "mygamelist-edec2.firebaseapp.com",
  projectId: "mygamelist-edec2",
  storageBucket: "mygamelist-edec2.appspot.com",
  messagingSenderId: "123961693136",
  appId: "1:123961693136:web:a34ca76f6874215443dfd5",
  measurementId: "G-5396380BTD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{db};

