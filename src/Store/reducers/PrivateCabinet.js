import {
    GET_FOLDERS
} from '../types';

const INITIAL_STATE = {
    global: null,
    other: null
};

export default function startPage(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_FOLDERS: {
            return {...state, ...action.payload};
        }
        // case USER_INFO: {
        //     return {...state, userInfo: action.payload};
        // }
        default:
            return state;
    }
}