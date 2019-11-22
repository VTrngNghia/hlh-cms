import axios from "../../shared/axios-hlh.js";
import {updateObject} from "../../shared/utility.js";
import * as actionTypes from "./actionTypes.js";

export const createClass = (token, classInfo) => {
  return dispatch => {
    dispatch(createClassStart());
    axios.post("/classes.json", classInfo)
      .then(res => {
        classInfo = updateObject(classInfo, {id: res.data.name});
        dispatch(createClassSuccess(classInfo));
      })
      .catch(err => dispatch(createClassFail(err)));
  };
  
  function createClassStart() {
    return {type: actionTypes.CREATE_CLASS_START};
  }
  
  function createClassSuccess(classInfo) {
    return {type: actionTypes.CREATE_CLASS_SUCCESS, newClass: classInfo};
  }
  
  function createClassFail(error) {
    return {type: actionTypes.CREATE_CLASS_FAIL, error};
  }
};

export const fetchClasses = (token, userId) => {
  return dispatch => {
    dispatch(fetchClassesStart());
    axios.get("/classes.json")
      .then(res => {
        const fetchedClasses = [];
        for (let key in res.data) {
          fetchedClasses.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchClassesSuccess(fetchedClasses));
      })
      .catch(err => dispatch(fetchClassesFail(err)));
    
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
};

export const updateClass = (token, classInfo) => {
  return dispatch => {
    dispatch(updateClassStart());
    const id = classInfo.id;
    delete classInfo.id;
    
    // console.log(updatedClass);
    axios.put("/classes/" + id + ".json", classInfo)
      .then(res => {
        const updatedClass = updateObject(res.data, {id: id});
        dispatch(updateClassSuccess(updatedClass));
      })
      .catch(err => dispatch(updateClassFail(err)));
  };
  
  function updateClassStart() {
    return {type: actionTypes.UPDATE_CLASS_START};
  }
  
  function updateClassFail(err) {
    return {err, type: actionTypes.UPDATE_CLASS_FAIL};
  }
  
  function updateClassSuccess(updatedClass) {
    return {updatedClass: updatedClass, type: actionTypes.UPDATE_CLASS_SUCCESS};
  }
  
};
