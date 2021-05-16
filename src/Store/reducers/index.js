import { combineReducers } from 'redux';
import startPage from './startPage';
import PrivateCabinet from './PrivateCabinet';

export default combineReducers({
    user: startPage,
    PrivateCabinet: PrivateCabinet,
})