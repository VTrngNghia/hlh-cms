import {db} from "../../firebase";
import {displayDate, isEmpty, toTimestamp} from "../../shared/utility";
import {updateObject} from "../../shared/utility.js";
import * as actionTypes from "../actionTypes.js";

export const submitClass = (token, classInfo) => {
  return dispatch => {
    dispatch(submitClassStart());
    
    const id = classInfo.id;
    classInfo = updateObject(classInfo, {
      dateFrom: toTimestamp(classInfo.dateFrom),
      dateTo: toTimestamp(classInfo.dateTo),
    });
    delete classInfo.id;
    console.log("Class info to be submitted", classInfo);
    
    if (isEmpty(id)) {
      dispatch(createClassStart());
      db.collection("classes").add(classInfo)
        .then(() => {
          dispatch(createClassSuccess());
          dispatch(fetchClasses("", ""));
        })
        .catch(err => {
          console.log(err);
          dispatch(createClassFail(err));
        });
    }
    
    else {
      dispatch(updateClassStart());
      db.collection("classes").doc(id).set(classInfo)
        .then(() => {
          dispatch(updateClassSuccess());
          dispatch(fetchClasses("", ""));
        })
        .catch(err => {
          console.log(err);
          dispatch(updateClassFail(err));
        });
    }
  };
};

export const fetchClasses = (token, userId) => {
  return dispatch => {
    dispatch(fetchClassesStart());
    db.collection("classes").get()
      .then(res => {
        const fetchedClasses = [];
        res.forEach(doc => {
          let fetchedClass = {id: doc.id, ...doc.data()};
          fetchedClass = updateObject(fetchedClass, {
            dateFrom: displayDate(fetchedClass.dateFrom.toDate()),
            dateTo: displayDate(fetchedClass.dateTo.toDate())
          });
          fetchedClasses.push(fetchedClass);
        });
        dispatch(fetchClassesSuccess(fetchedClasses));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchClassesFail(err));
      });
  };
};

function fetchClassesStart() {
  return {type: actionTypes.FETCH_CLASSES_START};
}
function fetchClassesFail(error) {
  return {type: actionTypes.FETCH_CLASSES_FAIL, error};
}
function fetchClassesSuccess(classes) {
  return {type: actionTypes.FETCH_CLASSES_SUCCESS, classes};
}
function submitClassStart() {
  return {type: actionTypes.SUBMIT_CLASS_START};
}
function createClassStart() {
  return {type: actionTypes.CREATE_CLASS_START};
}
function createClassFail(error) {
  return {type: actionTypes.CREATE_CLASS_FAIL, error};
}
function createClassSuccess() {
  return {type: actionTypes.CREATE_CLASS_SUCCESS};
}
function updateClassStart() {
  return {type: actionTypes.UPDATE_CLASS_START};
}
function updateClassSuccess() {
  return {type: actionTypes.UPDATE_CLASS_SUCCESS};
}
function updateClassFail(error) {
  return {type: actionTypes.UPDATE_CLASS_FAIL, error};
}


