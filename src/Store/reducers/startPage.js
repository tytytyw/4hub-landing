import {
    LOG_CHANGE
} from '../types/startPageTypes';

const INITIAL_STATE = {
    log: false
};

export default function startPage(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOG_CHANGE: {
            return {...state, log: action.type};
        }
        default:
            return state;
    }
}