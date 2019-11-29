// initialise firebase app
import {db, firebaseAuth} from '../../firebase';
import {updateObject} from "../../shared/utility";
import * as actionTypes from "./actionTypes.js";

const requestLogin = () => {
  return {
    type: actionTypes.LOGIN_REQUEST,
  };
};

const receiveLogin = user => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user,
  };
};

const loginError = () => {
  return {
    type: actionTypes.LOGIN_FAILURE,
  };
};

const requestLogout = () => {
  return {
    type: actionTypes.LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

const logoutError = () => {
  return {
    type: actionTypes.LOGOUT_FAILURE,
  };
};

const verifyRequest = () => {
  return {
    type: actionTypes.VERIFY_REQUEST,
  };
};

const verifySuccess = () => {
  return {
    type: actionTypes.VERIFY_SUCCESS,
  };
};

// actual login user logic
export const loginUser = (email, password, callback) => dispatch => {
  // return the login request message
  dispatch(requestLogin());
  // auth with firebase using signInWithEmailAndPassword
  // if success then take user as successfully log in
  // if fail then send login error
  firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      let {user} = res;
      db.collection("members").doc(user.uid).get()
        .then(res => {
          user = updateObject(user, {role: res.data().role});
          dispatch(receiveLogin(user));
          callback();
        })
        .catch(err =>
          console.log("Error getting user.UID from collection Members:", err));
    })
    .catch(err => {
      console.log("Login error:", err);
      dispatch(loginError(err));
    });
};

export const logoutUser = (callback) => dispatch => {
  dispatch(requestLogout());
  firebaseAuth.signOut()
    .then(() => {
      dispatch(receiveLogout());
      callback();
    })
    .catch(error => {
      //Do something with the error if you want!
      dispatch(logoutError(error));
    });
};

// This method look for pre-existing user session and re-establish it
// this happen on refresh
export const verifyAuth = (callbackOnNotLoggedin) => dispatch => {
  dispatch(verifyRequest());
  firebaseAuth.onAuthStateChanged(user => {
    if (user !== null) {
  
      db.collection("members").doc(user.uid).get()
        .then(res => {
          user = updateObject(user, {role: res.data().role});
          dispatch(receiveLogin(user));
        })
        .catch(err =>
          console.log("Error getting user.UID from collection Members:", err));
    }
    else {
      callbackOnNotLoggedin();
    }
    dispatch(verifySuccess());
  });
};
