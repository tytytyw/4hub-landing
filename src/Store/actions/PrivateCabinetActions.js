import api from '../../api';
import {CHOOSE_FILES, CHOOSE_FOLDER, CONTACT_LIST, FILE_DELETE, GET_FOLDERS} from '../types';

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
            if (res.data?.global) {
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
            if (res.data?.other) f.other = res.data.other
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

export const onDeleteFile = (file) => {
    return {
        type: FILE_DELETE,
        payload: file
    }
}

export const onGetContacts = () => async (dispatch, getState) => {

    const uid = getState().user.uid

    api.get(`/ajax/contacts_list.php?uid=${uid}`)
        .then(response => {
            const data = response.data?.data

            const newData = []
            for (const key in data) {
                newData.push(data[key])
            }

            dispatch({
                type: CONTACT_LIST,
                payload: newData.sort((a, b) => a.name?.localeCompare(b.name))
            })

        }).catch(error => {
            console.log(error)
        })

    /*dispatch({
        type: CONTACT_LIST,
        payload: [
            {
                id: 1,
                image: './assets/PrivateCabinet/avatars/a1.png',
                name: 'Аедельская Алина Квиталина',
                email: ['Квиталина@gmail.com', 'Квиталина222@gmail.com'],
                tel: ['+34234454232'],
                socials: [
                    {type: 'twitter', link: '#'},
                    {type: 'linkedin', link: '#'},
                    {type: 'facebook', link: '#'},
                ],
                messengers: [
                    {type: 'telegram', link: '#'},
                    {type: 'viber', link: '#'},
                    {type: 'whatsapp', link: '#'},
                    {type: 'skype', link: '#'},
                ]
            },
            {
                id: 2,
                image: './assets/PrivateCabinet/avatars/a1.png',
                name: 'Бедельская Алина Квиталина',
                email: ['Квиталина@gmail.com', 'Квиталина222@gmail.com'],
                tel: ['+33333333333333'],
                socials: [
                    {type: 'twitter', link: '#'},
                    {type: 'linkedin', link: '#'},
                    {type: 'facebook', link: '#'},
                ],
                messengers: [
                    {type: 'telegram', link: '#'},
                    {type: 'viber', link: '#'},
                    {type: 'whatsapp', link: '#'},
                    {type: 'skype', link: '#'},
                ]
            },
            {
                id: 3,
                image: './assets/PrivateCabinet/avatars/a1.png',
                name: 'Ведельская Алина Квиталина',
                email: ['Квиталина11@gmail.com', 'Квиталина22@gmail.com'],
                tel: ['+34234454232', '+89878767675'],
                socials: [
                    {type: 'twitter', link: '#'},
                    {type: 'linkedin', link: '#'},
                    {type: 'facebook', link: '#'},
                ],
                messengers: [
                    {type: 'telegram', link: '#'},
                    {type: 'viber', link: '#'},
                    {type: 'whatsapp', link: '#'},
                    {type: 'skype', link: '#'},
                ]
            },
        ]
    })*/
}