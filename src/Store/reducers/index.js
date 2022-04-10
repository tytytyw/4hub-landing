import { combineReducers } from "redux";
import startPage from "./startPage";
import Cabinet from "./Cabinet";

export default combineReducers({
  user: startPage,
  Cabinet: Cabinet
});
