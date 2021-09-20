import { combineReducers } from 'redux';
import startPage from './startPage';
import Cabinet from './Cabinet';
import main from "./main";

export default combineReducers({
    main: main,
    user: startPage,
    Cabinet: Cabinet,
})