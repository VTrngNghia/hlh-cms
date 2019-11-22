import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig.js";

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAppAuth = firebaseApp.auth();
