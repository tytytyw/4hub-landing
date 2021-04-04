import {
    LOG_DATA
} from '../types/startPageTypes';

export const onLog = (log) => {
    return {
        type: LOG_DATA,
        payload: log
    };
};