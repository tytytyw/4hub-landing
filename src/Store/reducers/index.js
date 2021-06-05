import { combineReducers } from 'redux';
import startPage from './startPage';
import PrivateCabinet from './PrivateCabinet';
import programs from "./programs";
import mainReducer from "./main";

export default combineReducers({
    main: mainReducer,
    user: startPage,
    PrivateCabinet: PrivateCabinet,
    programs: programs,
})