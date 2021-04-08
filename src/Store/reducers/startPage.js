import {
    LOG_DATA,
    USER_INFO
} from '../types/startPageTypes';

const INITIAL_STATE = {
    uid: '', //"43e2bbc56f41f48b08d3ebee3a8f4b1f"
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