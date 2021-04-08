import api from '../../api';
import {
    LOG_DATA,
    USER_INFO,

} from '../types/startPageTypes';

export const onLog = (log) => {
    return {
        type: LOG_DATA,
        payload: log
    };
};

export const onGetUserInfo = () => (dispatch, getState) => {
    api.get(`/ajax/user_get.php?uid=${getState().user.uid}`)
        .then(res => {
            dispatch({
                type: USER_INFO,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
};

export const onGetFolders = () => (dispatch, getState) => {
    api.get(`/ajax/get_folders.php?uid=${getState().user.uid}`)
        .then(res => {
            console.log(res);
            // dispatch({
            //     type: USER_INFO,
            //     payload: res.data
            // })
        })
        .catch(err => console.log(err))
};