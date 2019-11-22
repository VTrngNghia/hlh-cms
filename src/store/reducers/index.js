import {combineReducers} from "redux";
import auth from "./auth";
import classReducer from "./class";
import member from "./member";

export default combineReducers({auth, member, class: classReducer});
