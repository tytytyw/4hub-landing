import {
    GET_FOLDERS,
    CHOOSE_FOLDER
} from '../types';

const INITIAL_STATE = {
    global: null,
    other: null,
    folderList: null,
};

export default function startPage(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_FOLDERS: {
            return {...state, ...action.payload};
        }
        case CHOOSE_FOLDER: {
            return {...state, folderList: action.payload};
        }
        default:
            return state;
    }
}