import {updateObject} from "../../shared/utility.js";
import * as actionTypes from "../actionTypes.js";

const initialState = {
  classes: [],
  isLoading: false,
  firstAvailableClassId: "",
};

const createClassStart = state => updateObject(state, {isLoading: true});
const createClassSuccess = state => updateObject(state, {isLoading: false});
const createClassFail = (state, action) => updateObject(state, {
  isLoading: false, error: action.error,
});


const fetchClassesStart = state => updateObject(state, {isLoading: true});
const fetchClassesSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    classes: action.classes,
  });
};
const fetchClassesFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: action.error,
  });
};

const updateClassStart = state => updateObject(state, {isLoading: true});
const updateClassSuccess = state => updateObject(state, {isLoading: false,});
const updateClassFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: action.error,
  });
};


const submitClassStart = state => updateObject(state, {isLoading: true});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_CLASS_START:
      return submitClassStart(state);
    case actionTypes.CREATE_CLASS_START:
      return createClassStart(state);
    case actionTypes.CREATE_CLASS_FAIL:
      return createClassFail(state, action);
    case actionTypes.CREATE_CLASS_SUCCESS:
      return createClassSuccess(state, action);
    case actionTypes.FETCH_CLASSES_START:
      return fetchClassesStart(state);
    case actionTypes.FETCH_CLASSES_FAIL:
      return fetchClassesFail(state, action);
    case actionTypes.FETCH_CLASSES_SUCCESS:
      return fetchClassesSuccess(state, action);
    case actionTypes.UPDATE_CLASS_START:
      return updateClassStart(state);
    case actionTypes.UPDATE_CLASS_FAIL:
      return updateClassFail(state, action);
    case actionTypes.UPDATE_CLASS_SUCCESS:
      return updateClassSuccess(state);
    default:
      return state;
  }
};

export default reducer;
