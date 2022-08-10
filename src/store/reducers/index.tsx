import { combineReducers } from "redux";
import UserReducer from "./UserReducer";


const appReducer =  combineReducers({
  User: UserReducer,
});
export default appReducer;

