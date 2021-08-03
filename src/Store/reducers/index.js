import { combineReducers } from 'redux';
import startPage from './startPage';
import PrivateCabinet from './PrivateCabinet';
import main from "./main";

export default combineReducers({
    main: main,
    user: startPage,
    PrivateCabinet: PrivateCabinet,
})