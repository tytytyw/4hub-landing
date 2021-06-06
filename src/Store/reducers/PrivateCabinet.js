import {
    GET_FOLDERS,
    CHOOSE_FOLDER,
    CHOOSE_FILES,
    FILE_DELETE,
    CONTACT_LIST,
    ADD_RECENT_FOLDERS,
    ADD_RECENT_FILES,
    CHOOSE_RECENT_FILES,
    CUSTOMIZE_FILE,
    GET_PROGRAM_FOLDERS,
    GET_PROGRAMS,
    GET_RECENT_PROGRAMS,
    GET_TOP_LIST_PROGRAMS,
    GET_CATEGORIES,
    GET_SAFES
} from '../types';

const INITIAL_STATE = {
    global: null,
    other: null,
    folderList: null,
    fileList: null,
    contactList: null,
    recentFolders: null,
    recentFiles: null,
    chosenRecentFile: null,

    //PROGRAMS
    programFolders: [],
    programs: [],
    recentPrograms: [],
    topListPrograms: [],
    categories: [],

    //SAFE
    safes: []
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
        case ADD_RECENT_FOLDERS:
            return {...state, recentFolders: action.payload}
        case ADD_RECENT_FILES:
            return {...state, recentFiles: action.payload}
        case CHOOSE_RECENT_FILES:
            return {...state, chosenRecentFile: action.payload}
        case CUSTOMIZE_FILE: {
            const files = state.fileList.files.map(file => {
                if(file.fid !== action.payload.fid) return file;
                return action.payload;
            });
            return {...state, fileList: {...state.fileList, files}}
        }


        // PROGRAMS
        case GET_PROGRAM_FOLDERS:
            return {...state, programFolders: action.payload}
        case GET_PROGRAMS:
            return {...state, programs: action.payload}
        case GET_RECENT_PROGRAMS:
            return {...state, recentPrograms: action.payload}
        case GET_TOP_LIST_PROGRAMS:
            return {...state, topListPrograms: action.payload}
        case GET_CATEGORIES:
            return {...state, categories: action.payload}

        case GET_SAFES:
            return {...state, safes: action.payload}

        default:
            return state;
    }
}