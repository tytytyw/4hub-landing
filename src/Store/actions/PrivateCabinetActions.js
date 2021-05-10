import api from '../../api';
import {
    GET_FOLDERS,
    CHOOSE_FOLDER,
    CHOOSE_FILES,
} from '../types';

export const onGetFolders = () => async (dispatch, getState) => {
    const folders = [
        {name: 'all', nameRu: 'Общая папка', path: 'global/all'},
        {name: 'video', nameRu: 'Фильмы', path: 'global/video'},
        {name: 'music', nameRu: 'Музыка', path: 'global/music'},
        {name: 'images', nameRu: 'Изображения', path: 'global/images'},
        {name: 'docs', nameRu: 'Документы', path: 'global/docs'},
    ];
    api.get(`/ajax/get_folders.php?uid=${getState().user.uid}`)
        .then(res => {
            const f = {};
            if(res.data?.global) {
                f.global = folders.map(el => {
                    return {
                        name: el.name,
                        nameRu: el.nameRu,
                        path: el.path,
                        folders: res.data.global[el.name].folders,
                        files: res.data.global[el.name].files
                    }
                });
            }
            if(res.data?.other) f.other = res.data.other
            dispatch({
                type: GET_FOLDERS,
                payload: f
            });
        })
        .catch(err => console.log(err))
};

export const onChooseFolder = (folders, path) => {
    return {
        type: CHOOSE_FOLDER,
        payload: {folders, path}
    }
};

export const onChooseFiles = (path) => async (dispatch, getState) => {
    const files = await api.post(`/ajax/lsjson.php?uid=${getState().user.uid}&dir=${path}`);

    dispatch({
        type: CHOOSE_FILES,
        payload: {files: files.data, path}
    })
};