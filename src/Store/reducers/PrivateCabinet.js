import {
    GET_FOLDERS,
    CHOOSE_FOLDER,
    CHOOSE_FILES,
} from '../types';

const INITIAL_STATE = {
    global: null,
    other: null,
    folderList: null,
    fileList: null
};

export default function startPage(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_FOLDERS: {
            return {...state, ...action.payload};
        }
        case CHOOSE_FOLDER: {
            return {...state, folderList: action.payload};
        }
        case CHOOSE_FILES: {
            return {...state, fileList: action.payload};
        }
        default:
            return state;
    }
}