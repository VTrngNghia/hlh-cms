import {updateJSONArrayById, updateObject} from "../../shared/utility";
import * as actionTypes from "../actionTypes";

const initialState = {
  members  : [],
  isLoading: false,
};

const createMemberStart   = state => updateObject(state, {isLoading: true});
const createMemberFail    = (state, action) => updateObject(state, {
  isLoading: false,
  error    : action.error,
});
const createMemberSuccess = (state, action) => {
  const newMember = updateObject(action.memberData, {id: action.memberId});
  return updateObject(state, {
    isLoading: false,
    members  : state.members.concat(newMember),
  });
};

const updateMemberStart   = (state) => updateObject(state, {isLoading: true});
const updateMemberFail    = (state, action) => updateObject(state, {
  isLoading: false,
  error    : action.error,
});
const updateMemberSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    members  : updateJSONArrayById(state.members, action.updatedMember),
  });
};

const fetchMembersStart   = state => updateObject(state, {isLoading: true});
const fetchMembersFail    = (state, action) => updateObject(state, {
  isLoading: false,
  error    : action.error,
});
const fetchMembersSuccess = (state, action) => {
  return updateObject(state, {
    members  : action.members,
    isLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_MEMBER_START:
      return createMemberStart(state);
    case actionTypes.CREATE_MEMBER_FAIL:
      return createMemberFail(state, action);
    case actionTypes.CREATE_MEMBER_SUCCESS:
      return createMemberSuccess(state, action);
    case actionTypes.FETCH_MEMBERS_START:
      return fetchMembersStart(state);
    case actionTypes.FETCH_MEMBERS_FAIL:
      return fetchMembersFail(state, action);
    case actionTypes.FETCH_MEMBERS_SUCCESS:
      return fetchMembersSuccess(state, action);
    case actionTypes.UPDATE_MEMBER_START:
      return updateMemberStart(state);
    case actionTypes.UPDATE_MEMBER_FAIL:
      return updateMemberFail(state, action);
    case actionTypes.UPDATE_MEMBER_SUCCESS:
      return updateMemberSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
