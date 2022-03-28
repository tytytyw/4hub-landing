import {
    CHANGE_LANGUAGE,
    PERSONAL_SETTINGS,
    PERSONAL_SETTINGS_THEME,
    PREVIEW_THEME,
    RESET_PERSONAL_SETTINGS
} from '../types'

export const setPersonalSettings = data => async (dispatch) => {
    dispatch({
        type: PERSONAL_SETTINGS,
        payload: data
    })
}

export const setPersonalTheme = data => async (dispatch) => {
    dispatch({
        type: PERSONAL_SETTINGS_THEME,
        payload: data
    })
}

export const setPreviewTheme = data => async (dispatch) => {
    dispatch({
        type: PREVIEW_THEME,
        payload: data
    })
}

export const resetPersonalSettings = () => async (dispatch) => {
    dispatch({
        type: RESET_PERSONAL_SETTINGS
    })
}

export const changeLanguage = (lang) => async (dispatch) => {
    dispatch({
        type: CHANGE_LANGUAGE,
        payload: lang
    })
}