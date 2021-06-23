import {PERSONAL_SETTINGS, PERSONAL_SETTINGS_THEME, RESET_PERSONAL_SETTINGS} from '../types'

export const setPersonalSettings = data => async (dispatch, getState) => {
    dispatch({
        type: PERSONAL_SETTINGS,
        payload: data
    })
}

export const setPersonalTheme = data => async (dispatch, getState) => {
    dispatch({
        type: PERSONAL_SETTINGS_THEME,
        payload: data
    })
}

export const resetPersonalSettings = () => async (dispatch, getState) => {
    dispatch({
        type: RESET_PERSONAL_SETTINGS
    })
}