// import * as firebase from "firebase";
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const config = {
  apiKey: "AIzaSyDNQZudIFbiq5j1rfx2IEhTYm-sw_GhONU",
  authDomain: "hanoilindyhop.firebaseapp.com",
  databaseURL: "https://hanoilindyhop.firebaseio.com",
  projectId: "hanoilindyhop",
  storageBucket: "hanoilindyhop.appspot.com",
  messagingSenderId: "397406125827",
  appId: "1:397406125827:web:97c64fa0daa016d398f336",
  measurementId: "G-9NRW0FX5VW"
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseAuth = firebaseApp.auth();
export const db = firebaseApp.firestore();

