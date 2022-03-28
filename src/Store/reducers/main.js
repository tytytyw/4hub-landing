import {
    CHANGE_LANGUAGE,
    PERSONAL_SETTINGS,
    PERSONAL_SETTINGS_THEME,
    PREVIEW_THEME,
    RESET_PERSONAL_SETTINGS
} from '../types'
import {getStorageItem} from "../../generalComponents/StorageHelper";

const INITIAL_STATE = {
    personalSettings: {
        theme: 'blue',
        lang: getStorageItem('lang') ?? 'ru',
        notify: false
    },
    previewTheme: null
}

export default function main(state = INITIAL_STATE, action) {
    switch(action.type) {
        case PERSONAL_SETTINGS:
            return {...state, personalSettings: action.payload}
        case PREVIEW_THEME:
            return {...state, previewTheme: action.payload}
        case PERSONAL_SETTINGS_THEME:
            return {...state, personalSettings: {...state.personalSettings, theme: action.payload}}
        case RESET_PERSONAL_SETTINGS:
            return {...state, personalSettings: INITIAL_STATE.personalSettings}
        case CHANGE_LANGUAGE:
            return {...state, personalSettings: {...state.personalSettings, lang: action.payload}}
        default:
            return state;
    }
}