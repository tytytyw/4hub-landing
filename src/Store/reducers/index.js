import { combineReducers } from "redux";
import startPage from "./startPage";
import Cabinet from "./Cabinet";
import { TasksReducer } from "./TasksReducer";

export default combineReducers({
  user: startPage,
  Cabinet: Cabinet,
  Tasks: TasksReducer
});
