import api from '../../api';
import {
    LOG_DATA,
    USER_INFO,
} from '../types';

export const onLog = (data) => {
    return {
        type: LOG_DATA,
        payload: data
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
