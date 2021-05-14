import {
    GET_FOLDERS,
    CHOOSE_FOLDER,
    CHOOSE_FILES,
    FILE_DELETE,
    CONTACT_LIST, ADD_CONTACT,
} from '../types';

const INITIAL_STATE = {
    global: null,
    other: null,
    folderList: null,
    fileList: null,
    contactList: null
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
        case FILE_DELETE: {
            const files = state.fileList.files.filter(el => el.fid !== action.payload.fid)
            return {...state, fileList: {...state.fileList, files}};
        }
        case CONTACT_LIST:
            return {...state, contactList: action.payload}
        case ADD_CONTACT:
            return {...state, contactList: [...state.contactList, action.payload]}
        default:
            return state;
    }
}