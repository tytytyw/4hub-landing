import {
    GET_FOLDERS,
    CHOOSE_FOLDER,
    CHOOSE_FILES,
    CHOOSE_ALL_FILES,
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
    GET_SAFES,
    GET_DEVICES,
    GET_CONNECTED_CONTACTS,
    SET_SIZE, GET_PROJECT_FOLDER,
    GET_PROJECTS,
    GET_JOURNAL_FOLDERS,
    SET_CALENDAR_DATE, SET_CALENDAR_EVENTS,
    SEARCH, CHOOSE_SHARED_FILES,
} from '../types'

const INITIAL_STATE = {
    global: null,
    other: null,
    folderList: null,
    fileList: null,
    contactList: null,
    recentFolders: null,
    recentFiles: null,
    chosenRecentFile: null,
    size: 'big',

    //SEARCH
    search: '',

    //PROGRAMS
    programFolders: [],
    programs: [],
    recentPrograms: [],
    topListPrograms: [],
    categories: [],

    //SAFE
    safes: [],

    //PROJECT
    projects: [],
    projectFolders: [],

    //DEVICES
    devices: [],
    connectedContacts: [],

    // SHARED FILES
    sharedFiles: null,

    //JOURNAL
    journalFolders: [],

    //CALENDAR PAGE
    calendarDate: new Date(),
    calendarEvents: [],
}

export default function startPage(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_FOLDERS: {
            return {...state, ...action.payload};
        }
        case CHOOSE_FOLDER: {
            return {...state, folderList: action.payload};
        }
        case CHOOSE_FILES: {
            // TODO - Need to delete after serverside filtration is added
            const files = action.payload.files.sort((a, b) => b.date - a.date);
            return {...state, fileList: {...action.payload, files}};
        }
        case CHOOSE_ALL_FILES: {
            // TODO - Need to delete after serverside filtration is added
            const files = action.payload.files.sort((a, b) => b.date - a.date);
            return {...state, fileList: {...action.payload, files}};
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
        case SET_SIZE:
            return {...state, size: action.payload}
        //SEARCH
        case SEARCH: {
            return {...state, search: action.payload}
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

        //SAFE
        case GET_SAFES:
            return {...state, safes: action.payload}

        //PROJECT
        case GET_PROJECT_FOLDER:
            return {...state, projectFolders: action.payload}
        case GET_PROJECTS:
            return {...state, projects: action.payload}

        //DEVICES
        case GET_DEVICES:
            return {...state, devices: action.payload}
        case GET_CONNECTED_CONTACTS:
            return {...state, connectedContacts: action.payload}

        // SHARED FILES
        case CHOOSE_SHARED_FILES: {
            return {...state, sharedFiles: {...state.sharedFiles, files: action.payload}};
        }

        //JOURNAL
        case GET_JOURNAL_FOLDERS:
            return {...state, journalFolders: action.payload}

        //CALENDAR PAGE
        case SET_CALENDAR_DATE:
            return {...state, calendarDate: action.payload}

        //CALENDAR PAGE
        case SET_CALENDAR_EVENTS:
            return {...state, calendarEvents: action.payload}

        default:
            return state;
    }
}