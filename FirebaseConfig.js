import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBHyL5JrB-ZERIEDE3J2YKHVQ7s1u4xjck",
  authDomain: "db-6ed88.firebaseapp.com",
  projectId: "db-6ed88",
  storageBucket: "db-6ed88.appspot.com",
  messagingSenderId: "668445323774",
  appId: "1:668445323774:web:1367dae69e1458959350af",
  measurementId: "G-JGKQW7371Z"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.firestore();
export const auth = firebase.auth();
export const FieldValue = firebase.firestore.FieldValue;
