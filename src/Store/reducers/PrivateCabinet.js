import {
    GET_FOLDERS,
    CHOOSE_FOLDER,
    CHOOSE_FILES,
    FILE_DELETE,
<<<<<<< HEAD
    CONTACT_LIST
=======
    CONTACT_LIST,
    ADD_CONTACT,
    ADD_RECENT_FOLDERS,
    ADD_RECENT_FILES,
>>>>>>> fe1f798acfaeafe28a2664e68fb7fd8a2b9c512a
} from '../types';

const INITIAL_STATE = {
    global: null,
    other: null,
    folderList: null,
    fileList: null,
    contactList: null,
    recentFolders: null,
    recentFiles: null,
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
<<<<<<< HEAD
=======
        case ADD_CONTACT:
            return {...state, contactList: [...state.contactList, action.payload]}
        case ADD_RECENT_FOLDERS:
            return {...state, recentFolders: action.payload}
        case ADD_RECENT_FILES:
            return {...state, recentFiles: action.payload}
>>>>>>> fe1f798acfaeafe28a2664e68fb7fd8a2b9c512a
        default:
            return state;
    }
}