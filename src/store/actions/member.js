import {db} from "../../firebase";
import * as roles from "../../shared/roles";
import {
  displayDate,
  isEmpty,
  toTimestamp,
  updateObject
} from "../../shared/utility";
import * as actionTypes from "../actionTypes";


const fetchMembersStart = () => {
  return {
    type: actionTypes.FETCH_MEMBERS_START,
  };
};

const fetchMembersFail = (error) => {
  return {
    type: actionTypes.FETCH_MEMBERS_FAIL,
    error,
  };
};

const fetchMembersSuccess = (members) => {
  return {
    type: actionTypes.FETCH_MEMBERS_SUCCESS,
    members,
  };
};

export const fetchMembers = (token, userId, role) => {
  return dispatch => {
    dispatch(fetchMembersStart());
    db.collection("members").get()
      .then(res => {
        const fetchedMembers = [];
        res.forEach(doc => {
          let fetchedMember = {...doc.data()};
          if (role === roles.TEACHER && !fetchedMember.isTeacher) return;
          
          fetchedMember = updateObject(fetchedMember, {
            dateRegistered: displayDate(fetchedMember.dateRegistered.toDate()),
            id: doc.id
          });
          fetchedMembers.push(fetchedMember);
        });
        
        dispatch(fetchMembersSuccess(fetchedMembers));
      })
      .catch(err => {
        console.log(err);
        fetchMembersFail(err);
      });
  };
};

export const submitMember = (token, memberInfo, role) => {
  return dispatch => {
    dispatch(submitMemberStart());
    
    const id = memberInfo.id;
    memberInfo = updateObject(memberInfo, {
      dateRegistered: toTimestamp(memberInfo.dateRegistered)
    });
    delete memberInfo.id;
    if (isEmpty(id)) createMember(dispatch, memberInfo, role);
    else updateMember(dispatch, id, memberInfo, role);
  };
};

function createMember(dispatch, memberInfo, roleToRefetch) {
  dispatch(createMemberStart());
  memberInfo = updateObject(memberInfo, {
    isActive: true,
    isTeacher: false,
    role: roles.MEMBER
  });
  db.collection("members").add(memberInfo)
    .then(() => {
      dispatch(createMemberSuccess());
      dispatch(fetchMembers("", "", roleToRefetch));
    })
    .catch(err => {
      console.log(err);
      dispatch(createMemberFail(err));
    });
}

function updateMember(dispatch, memberId, memberInfo, roleToRefetch) {
  dispatch(updateMemberStart());
  console.log("Member to submit. ID:", memberId, "Info:", memberInfo);
  
  db.collection("members").doc(memberId).set(memberInfo)
    .then(() => {
      dispatch(updateMemberSuccess());
      dispatch(fetchMembers("", "", roleToRefetch));
    })
    .catch(err => {
      console.log(err);
      dispatch(updateMemberFail(err));
    });
}

function submitMemberStart() {
  return {type: actionTypes.SUBMIT_MEMBER_START};
}
function createMemberStart() {
  return {type: actionTypes.CREATE_MEMBER_START};
}
function createMemberSuccess() {
  return {type: actionTypes.CREATE_MEMBER_SUCCESS};
}
function createMemberFail(error) {
  return {type: actionTypes.CREATE_MEMBER_FAIL, error,};
}
function updateMemberStart() {
  return {type: actionTypes.UPDATE_MEMBER_START};
}
function updateMemberSuccess() {
  return {type: actionTypes.UPDATE_MEMBER_SUCCESS,};
}
function updateMemberFail(error) {
  return {type: actionTypes.FETCH_MEMBERS_FAIL, error,};
}

