import api from '../../api';

import {
    LOG_CHANGE
} from '../types/startPageTypes';

export const onLog = (log) => {
    return {
        type: LOG_CHANGE,
        payload: log
    };
};