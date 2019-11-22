import {updateJSONArrayById, updateObject} from "../../shared/utility.js";
import * as actionTypes from "../actions/actionTypes.js";

const initialState = {
  classes              : [],
  isLoading            : false,
  firstAvailableClassId: "",
};

const createClassStart = (state) => {
  return updateObject(state, {isLoading: true});
};

const createClassFail    = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error    : action.error,
  });
};
const createClassSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    classes  : state.classes.concat(action.newClass),
  });
};

const fetchClassesStart   = (state) => {
  return updateObject(state, {isLoading: true});
};
const fetchClassesFail    = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error    : action.error,
  });
};
const fetchClassesSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    classes  : action.classes,
  });
};

const updateClassStart   = (state) => {
  return updateObject(state, {isLoading: true});
};
const updateClassFail    = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error    : action.error,
  });
};
const updateClassSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    classes  : updateJSONArrayById(state.classes, action.updatedClass),
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
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
      return updateClassSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
