import { combineReducers } from 'redux';
import startPage from './startPage';
import PrivateCabinet from './PrivateCabinet';
import programs from "./programs";

export default combineReducers({
    user: startPage,
    PrivateCabinet: PrivateCabinet,
    programs: programs,
})