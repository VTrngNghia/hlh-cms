import axios from "../../shared/axios-hlh.js";
import {updateObject} from "../../shared/utility";
import * as actionTypes from "../actionTypes";

const createMemberStart = () => {
  return {type: actionTypes.CREATE_MEMBER_START};
};

const createMemberFail = (error) => {
  return {
    type: actionTypes.CREATE_MEMBER_FAIL,
    error,
  };
};

const createMemberSuccess = (memberId, memberInfo) => {
  return {
    type: actionTypes.CREATE_MEMBER_SUCCESS,
    memberId, memberInfo,
  };
};

const updateMemberStart = () => {
  return {type: actionTypes.UPDATE_MEMBER_START};
};

const updateMemberSuccess = (updatedMember) => {
  return {
    type: actionTypes.UPDATE_MEMBER_SUCCESS,
    updatedMember,
  };
};

const updateMemberFail = (error) => {
  return {
    type: actionTypes.FETCH_MEMBERS_FAIL,
    error,
  };
};

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

export const createMember = (token, memberInfo) => {
  return dispatch => {
    dispatch(createMemberStart());
    memberInfo = updateObject(memberInfo, {
      isActive : true,
      isTeacher: false,
    });
    axios.post("/members.json", memberInfo)
      .then(res => dispatch(createMemberSuccess(res.data.name, memberInfo)))
      .catch(err => dispatch(createMemberFail(err)));
  };
};

export const fetchMembers = (token, userId, role) => {
  return dispatch => {
    dispatch(fetchMembersStart());
    // const queryParams = "?auth=" + token + "&orderBy='userId'&equalTo=" + userId + "'";
    axios.get("/members.json")
      .then(res => {
        const fetchedMembers = [];
        for (let key in res.data) {
          if (role === "teacher" && !res.data[key].isTeacher) continue;
          fetchedMembers.push({
            ...res.data[key],
            id: key,
          });
        }
        
        dispatch(fetchMembersSuccess(fetchedMembers));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchMembersFail(err));
      });
  };
};

export const updateMember = (token, memberInfo) => {
  return dispatch => {
    dispatch(updateMemberStart());
    const id = memberInfo.id;
    delete memberInfo.id;
    // console.log(memberInfo);
    axios.put("/members/" + id + ".json", memberInfo)
      .then(res => dispatch(updateMemberSuccess(updateObject(res.data, {id: id}))))
      .catch(err => dispatch(updateMemberFail(err)));
  };
};

