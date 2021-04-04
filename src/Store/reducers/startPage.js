import {
    LOG_DATA
} from '../types/startPageTypes';

const INITIAL_STATE = {
    uid: ''
};

export default function startPage(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOG_DATA: {
            return {...state, uid: action.payload};
        }
        default:
            return state;
    }
}