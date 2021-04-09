import {
    LOG_DATA,
    USER_INFO
} from '../types';

const INITIAL_STATE = {
    uid: '',
    userInfo: null
};

export default function startPage(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOG_DATA: {
            return {...state, uid: action.payload};
        }
        case USER_INFO: {
            return {...state, userInfo: action.payload};
        }
        default:
            return state;
    }
}
