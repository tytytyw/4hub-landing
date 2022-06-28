import { combineReducers } from "redux";
import startPage from "./startPage";
import Cabinet from "./Cabinet";
import { TasksReducer } from "./TasksReducer";
import { CalendarReducer } from "./CalendarReducer";

export default combineReducers({
  user: startPage,
  Cabinet: Cabinet,
  Tasks: TasksReducer,
  Calendar: CalendarReducer
});
