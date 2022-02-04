import {
    GET_FOLDERS,
    CHOOSE_FOLDER,
    CHOOSE_FILES,
    LOAD_FILES,
    FILE_DELETE,
    SAFE_FILE_DELETE,
    CONTACT_LIST,
    COMPANY_CONTACT_LIST,
    COMPANY_DOCUMENTS,
    ADD_RECENT_FOLDERS,
    ADD_RECENT_FILES,
    CHOOSE_RECENT_FILES,
    CUSTOMIZE_FILE,
    CUSTOMIZE_SAFE_FILE,
    GET_PROGRAM_FOLDERS,
    GET_PROGRAMS,
    GET_RECENT_PROGRAMS,
    GET_TOP_LIST_PROGRAMS,
    GET_CATEGORIES,
    GET_SAFES,
    CODE_TEL,
    AUTHORIZED_SAFE,
    CHOOSE_SAFE_FILELIST,
    LOAD_SAFE_FILELIST,
    GET_DEVICES,
    GET_CONNECTED_CONTACTS,
    SET_SIZE,
    SET_WORKELEMENTSVIEW,
    GET_PROJECT_FOLDER,
    GET_PROJECTS,
    GET_JOURNAL_FOLDERS,
    SET_CALENDAR_DATE,
    SET_CALENDAR_EVENTS,
    SEARCH,
    CHOOSE_SHARED_FILES,
    CHOOSE_ARCHIVE_FILES,
    SORT_FILES,
    SET_FILTER_COLOR,
    SET_FILTER_EMOJI,
    SET_FILTER_FIGURE,
    SET_REVERSE_CRITERION,
    SET_FILES_PATH,
    CHOOSE_GUEST_SHARED_FILES,
    NULLIFY_FILTERS,
    SET_SELECTED_DEVICE,
    SET_SELECTED_USER,
    SET_DRAGGED,
    LOAD_PROJECT_FILES,
    SET_CHOSEN_FOLDER,
    SET_CHOSEN_PROJECT,
    LOAD_FILES_NEXT,
    CHOOSE_FILES_NEXT,
    SET_NEXT_FILES_TO_PREVIOUS, SET_PAINT,
    CHAT_GROUPS_LIST,
    RESENT_CHATS_LIST,
    SECRET_CHATS_LIST,
    CHAT_SELECTED_CONTACT,
    CHAT_ID_USER,
    SECRET_CHAT_DELETE,
    GET_MESSAGES,
    ADD_NEW_MESSAGE,
    SET_MESSAGE_LIFE_TIME,
    CHAT_GROUP_DELETE, SET_MODALS,
} from '../types'

const INITIAL_STATE = {
    global: null,
    other: null,
    folderList: null,
    fileList: null,
    contactList: null,
    companyContactList: null,
    recentFolders: null,
    recentFiles: null,
    chosenRecentFile: null,
    dragged: null,
    size: 'big',
    view: 'bars',
    //SORT && FILTER
    fileCriterion: {
        sorting: 'byDateCreated&sort_reverse=1&group=ctime',
        reverse: {byName: false},
        filters: {
            color: '',
            emoji: '',
            figure: ''
        }
    },

    //SEARCH
    search: '',

    //PROGRAMS
    programFolders: [],
    programs: [],
    recentPrograms: [],
    topListPrograms: [],
    categories: [],

    //SAFE
    safeFileList: null,
    safes: null,
    authorizedSafe: null,
    safeCodeToTel: '',

    //PROJECT
    project: {
        projects: [],
        projectFolders: {},
        files: [],
        chosenFolder: '',
        chosenProject: null,
    },


    //DEVICES
    devices: [],
    selectedDevice: null,
    selectedUser: null,
    connectedContacts: [],

    // SHARED FILES
    sharedFiles: {sharedMe: null, sharedI: null},

    // ARCHIVE
    arhiveFileList: null,

    //JOURNAL
    journalFolders: [],

    //CALENDAR PAGE
    calendarDate: new Date(),
    calendarEvents: [],


    // GUEST MODE
    guestSharedFiles: [],
    
    //COMPANY
    company: {
        documents: {
            standards: {file: null, preview: null},
            mission: {file: null, preview: null},
            viziya: {file: null, preview: null},
        }
    },

    //PAINT
    paint: {
        tool: undefined,
        color: 'rgba(0,0,0,1)',
        size: 2,
        mutualEdit: {
            open: false,
            data: [],
            destination: ''
        }
    },

    //CHAT
    chat: {
        groupsList: [],
        recentChatsList: [],
        secretChatsList: [],
        selectedContact: null,
        userId: null,
        messages: null,
        messageLifeTime: 3600,
    },

    //GLOBAL MODALS
    modals: {
        error: {open: false, message: ''},
        success: {open: false, message: '', title: ''},
        loader: false,
        share: {open: false, fids: [], fid: undefined, action_type: ''},
        previewWithComments: {open: false, files: [], chosenFile: null},
        printScreen: {open: false, result: ''},
        previewFile: {open: false, file: null}
    }

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
            return {...state, fileList: {...action.payload}};
        }
        case CHOOSE_FILES_NEXT: {
            return {...state, fileList: {...state.fileList, filesNext: action.payload}};
        }
        case LOAD_FILES: {
            const addFiles = () => {
                let f = {...state.fileList.files}
                for(let key in f) {
                    if(action.payload.files[key]) f[key] = [...f[key], ...action.payload.files[key]];
                }
                return f;
            }
            const files = Array.isArray(action.payload.files)
                ? [...state.fileList.files, ...action.payload.files]
                : addFiles()
            return {...state, fileList: {...state.fileList, files}};
        }
        case LOAD_FILES_NEXT: {
            const addFiles = () => {
                let f = {...state.fileList.files}
                for(let key in f) {
                    if(action.payload.files[key]) f[key] = [...f[key], ...action.payload.files[key]];
                }
                return f;
            }
            const files = Array.isArray(action.payload.files)
                ? [...state.fileList.files, ...action.payload.files]
                : addFiles()
            return {...state, fileList: {...state.fileList, filesNext: files}};
        }
        case SET_NEXT_FILES_TO_PREVIOUS: {
            return {
                ...state,
                fileList: {
                    files: state.fileList.filesNext.files,
                    path: action.payload,
                    filesNext: null
                }
            }
        }
        case SET_FILES_PATH: {
            return {...state, fileList: {...state.fileList, files: [], path: action.payload}};
        }
        case FILE_DELETE: {
            const files = state.fileList.files.filter(el => el.fid !== action.payload.fid);
            const filesAll = state.fileListAll ? state.fileListAll.files.filter(el => el.fid !== action.payload.fid) : null;
            return {...state, fileList: {...state.fileList, files}, fileListAll: state.fileListAll ? {...state.fileListAll, files: filesAll} : null};
        }
        case CONTACT_LIST:
            return {...state, contactList: action.payload}
        case COMPANY_CONTACT_LIST:
            return {...state, companyContactList: action.payload}
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
            const filesAll = state.fileListAll
                ? (state.fileListAll.files.map(file => {
                    if(file.fid !== action.payload.fid) return file;
                    return action.payload;
                }))
                : null;
            return {...state, fileList: {...state.fileList, files}, fileListAll: state.fileListAll ? {...state.fileListAll, files: filesAll} : null}
        }
        case CUSTOMIZE_SAFE_FILE: {
            const safeFiles = state.safeFileList.map(file => {
                if(file.fid !== action.payload.fid) return file;
                return action.payload;
            });
            return {...state, safeFileList: safeFiles}
        }
        case SET_SIZE:
            return {...state, size: action.payload}
        case SET_WORKELEMENTSVIEW:
            return {...state, view: action.payload}
        //SEARCH
        case SEARCH: {
            return {...state, search: action.payload}
        }
        //CHAT
        case CHAT_GROUPS_LIST: {
            return {...state, chat: {...state.chat, groupsList: action.payload}}
        }
        case RESENT_CHATS_LIST: {
            return {...state, chat: {...state.chat, recentChatsList: action.payload}}
        }
        case SECRET_CHATS_LIST: {
            return {...state, chat: {...state.chat, secretChatsList: action.payload}}
        }
        case CHAT_SELECTED_CONTACT: {
            return {...state, chat: {...state.chat, selectedContact: action.payload}}
        }
        case CHAT_ID_USER: {
            return {...state, chat: {...state.chat, userId: action.payload}}
        }
        case CHAT_GROUP_DELETE: {
            const groups = state.chat.groupsList.filter(gr => gr.id !== action.payload.id)
            return {...state, chat: {...state.chat, groupsList: groups}}
        }
        case SECRET_CHAT_DELETE: {
            const secretChats = state.chat.secretChatsList.filter(gr => gr.id !== action.payload.id)
            return {...state, chat: {...state.chat, secretChatsList: secretChats}}
        }
        case GET_MESSAGES: {
            return {...state, chat: {...state.chat, messages: action.payload}}
        }
        case ADD_NEW_MESSAGE: {
            return {...state, chat: {...state.chat, messages: [...state.chat.messages, action.payload]}}
        }
        case SET_MESSAGE_LIFE_TIME: {
            return {...state, chat: {...state.chat, messageLifeTime: action.payload}}
        }
        //SORT FILES
        case SORT_FILES: {
            return {...state, fileCriterion: {...state.fileCriterion, sorting: action.payload}}
        }
        case SET_FILTER_COLOR: {
            return {...state, fileCriterion: {...state.fileCriterion, filters: {...state.fileCriterion.filters, color: action.payload}}}
        }
        case SET_FILTER_FIGURE: {
            return {...state, fileCriterion: {...state.fileCriterion, filters: {...state.fileCriterion.filters, figure: action.payload}}}
        }
        case SET_FILTER_EMOJI: {
            return {...state, fileCriterion: {...state.fileCriterion, filters: {...state.fileCriterion.filters, emoji: action.payload}}}
        }
        case SET_REVERSE_CRITERION: {
            return {...state, fileCriterion: {...state.fileCriterion, reverse: {...state.fileCriterion.reverse, [action.payload]: !state.fileCriterion.reverse[action.payload]}}}
        }
        case NULLIFY_FILTERS: {
            return {
                ...state,
                fileCriterion: {sorting: 'byDateCreated&sort_reverse=1&group=ctime',
                    reverse: {byName: false},
                    filters: {
                        color: '',
                        emoji: '',
                        figure: ''
                    }}
            }
        }
        case SET_DRAGGED: {
            return {...state, dragged: action.payload}
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
        case CODE_TEL:
            return {...state, safeCodeToTel: action.payload}
        case GET_SAFES:
            return {...state, safes: action.payload}
        case AUTHORIZED_SAFE:
            return {...state, authorizedSafe: action.payload}
        case CHOOSE_SAFE_FILELIST:
            return {...state, safeFileList: {...action.payload}};
        case LOAD_SAFE_FILELIST:
            return {...state, safeFileList: {...state.safeFileList, files: [...state.safeFileList?.files, ...action.payload.files]}};
        case SAFE_FILE_DELETE: {
            const files = state.safeFileList.filter(el => el.fid !== action.payload)
            return {...state, safeFileList: files};
        }

        //PROJECT
        case GET_PROJECT_FOLDER:
            const projectFolders = {...state.project.projectFolders};
            projectFolders[action.payload.projectId] = [...action.payload.projectFolders]
            return {...state, project: {...state.project, projectFolders}}
        case GET_PROJECTS:
            return {...state, project: {...state.project, projects: action.payload}}
        case LOAD_PROJECT_FILES: {
            return {...state, project: {...state.project, files: action.payload}}
        }
        case SET_CHOSEN_FOLDER: {
            return {...state, project: {...state.project, chosenFolder: action.payload}}
        }
        case SET_CHOSEN_PROJECT: {
            return {...state, project: {...state.project, chosenProject: action.payload}}
        }

        //DEVICES
        case GET_DEVICES:
            return {...state, devices: action.payload}
        case SET_SELECTED_DEVICE:
            return {...state, selectedDevice: action.payload}
        case SET_SELECTED_USER:
            return {...state, selectedUser: action.payload}
        case GET_CONNECTED_CONTACTS:
            return {...state, connectedContacts: action.payload}

        // SHARED FILES
        case CHOOSE_SHARED_FILES: {
            return {...state, sharedFiles: {...state.sharedFiles, [action.payload.key]: {files: action.payload.files}}};
        }

        //ARCHIVE
        case CHOOSE_ARCHIVE_FILES: {
            return {...state, arhiveFileList: {...state.arhiveFileList, files: action.payload}};
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

        //GUEST MODE
        case CHOOSE_GUEST_SHARED_FILES:
            return {...state, guestSharedFiles: action.payload}

        default:
            return state;

        //COMPANY
        case COMPANY_DOCUMENTS:
            return {...state, company: {...state.company, documents: {...state.company.documents, [action.payload.type] : action.payload}}}

        //PAINT
        case SET_PAINT: {
            return {...state, paint: {...state.paint, [action.payload.key]: action.payload.value}}
        }

        //GLOBAL MODAL
        case SET_MODALS: {
            return {...state, modals: {...state.modals, [action.payload.key]: action.payload.value}}
        }
    }
}