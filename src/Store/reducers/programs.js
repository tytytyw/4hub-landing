import {
    GET_PROGRAMS_FOLDERS,
    GET_RECENT_PROGRAMS,
    GET_PROGRAMS,
    GET_TOP_LIST_PROGRAMS
} from '../types'

const INITIAL_STATE = {
    programFolders: [],
    programs: [],
    recentPrograms: [],
    topListPrograms: []
}

export default function programs(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_PROGRAMS_FOLDERS:
            return {...state, programFolders: action.payload}
        case GET_PROGRAMS:
            return {...state, programs: action.payload}
        case GET_RECENT_PROGRAMS:
            return {...state, recentPrograms: action.payload}
        case GET_TOP_LIST_PROGRAMS:
            return {...state, topListPrograms: action.payload}
        default:
            return state
    }
}