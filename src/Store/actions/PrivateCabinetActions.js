import api from '../../api';
import {
    GET_FOLDERS,
} from '../types';

export const onGetFolders = () => (dispatch, getState) => {
    const folders = [
        {name: 'all', nameRu: 'Общая папка'},
        {name: 'video', nameRu: 'Фильмы'},
        {name: 'music', nameRu: 'Музыка'},
        {name: 'images', nameRu: 'Изображения'},
        {name: 'docs', nameRu: 'Документы'},
    ];
    api.get(`/ajax/get_folders.php?uid=${getState().user.uid}`)
        .then(res => {
            const f = {};
            if(res.data?.global) {
                f.global = folders.map(el => {
                    return {
                        name: el.name,
                        nameRu: el.nameRu,
                        folders: res.data.global[el.name].folders,
                        files: res.data.global[el.name].files
                    }
                });
            }
            if(res.data?.other) f.other = res.data.other
            dispatch({
                type: GET_FOLDERS,
                payload: f
            })
        })
        .catch(err => console.log(err))
};