import {updateObject} from "../../shared/utility";
import * as actionTypes from "../actionTypes";

const initialState = {
  members: [],
  isLoading: false,
};

const fetchMembersStart = state => updateObject(state, {isLoading: true});
const fetchMembersSuccess = (state, action) => updateObject(state, {
  isLoading: false,
  members: action.members,
});

const fetchMembersFail = (state, action) => updateObject(state, {
  isLoading: false,
  error: action.error,
});

const submitMemberStart = state => updateObject(state, {isLoading: true});
const createMemberStart = state => updateObject(state, {isLoading: true});
const createMemberSuccess = (state) => updateObject(state, {isLoading: false,});
const createMemberFail = (state, action) => updateObject(state, {
  isLoading: false, error: action.error,
});
const updateMemberStart = (state) => updateObject(state, {isLoading: true});
const updateMemberSuccess = (state) => updateObject(state, {isLoading: false,});
const updateMemberFail = (state, action) => updateObject(state, {
  isLoading: false, error: action.error,
});


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MEMBERS_START:
      return fetchMembersStart(state);
    case actionTypes.FETCH_MEMBERS_SUCCESS:
      return fetchMembersSuccess(state, action);
    case actionTypes.FETCH_MEMBERS_FAIL:
      return fetchMembersFail(state, action);
    case actionTypes.SUBMIT_MEMBER_START:
      return submitMemberStart(state);
    case actionTypes.CREATE_MEMBER_START:
      return createMemberStart(state);
    case actionTypes.CREATE_MEMBER_SUCCESS:
      return createMemberSuccess(state);
    case actionTypes.CREATE_MEMBER_FAIL:
      return createMemberFail(state, action);
    case actionTypes.UPDATE_MEMBER_START:
      return updateMemberStart(state);
    case actionTypes.UPDATE_MEMBER_SUCCESS:
      return updateMemberSuccess(state);
    case actionTypes.UPDATE_MEMBER_FAIL:
      return updateMemberFail(state, action);
    default:
      return state;
  }
};

export default reducer;
