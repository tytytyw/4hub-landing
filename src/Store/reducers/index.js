import { combineReducers } from 'redux';
import startPage from './startPage';

export default combineReducers({
    user: startPage,
})