import api from '../../api'

import {
    ADD_RECENT_FILES,
    ADD_RECENT_FOLDERS,
    CHOOSE_FILES,
    CHOOSE_ALL_FILES,
    CHOOSE_FOLDER,
    CONTACT_LIST,
    FILE_DELETE,
    GET_FOLDERS,
    CHOOSE_RECENT_FILES,
    CUSTOMIZE_FILE,
    GET_PROGRAM_FOLDERS,
    GET_RECENT_PROGRAMS,
    GET_TOP_LIST_PROGRAMS,
    GET_CATEGORIES,
    GET_PROGRAMS,
    GET_SAFES,
    GET_DEVICES,
    GET_CONNECTED_CONTACTS,
    SET_SIZE,
} from '../types';

const folders = [
    {name: 'all', nameRu: 'Общая папка', path: 'global/all'},
    {name: 'video', nameRu: 'Фильмы', path: 'global/video'},
    {name: 'music', nameRu: 'Музыка', path: 'global/music'},
    {name: 'images', nameRu: 'Изображения', path: 'global/images'},
    {name: 'docs', nameRu: 'Документы', path: 'global/docs'},
];

export const onGetFolders = () => async (dispatch, getState) => {
    // TODO - Need to modify page && item per page state
    api.get(`/ajax/get_folders.php?uid=${getState().user.uid}&page=${1}&items_per_page=${20}`)
        .then(res => {
            const f = {};
            // const res = {};
            // const resp = "{"global":{"all":{"folders":[{"name":"TempFolder","path":"global/all/TempFolder","tags":"\u0414\u0440\u0443\u0433\u043e\u0435","is_pass":0,"is_lock":0,"deadline":0,"color":"green","fig":null,"emo":"cool","folders":{"folders":[],"files_count":0}},{"name":"temp","path":"global/all/temp","tags":"\u0424\u043e\u0442\u043e","is_pass":0,"is_lock":0,"deadline":0,"color":"red","fig":"stop","emo":"happy-2","folders":{"folders":[],"files_count":0}},{"name":"testPass","path":"global/all/testPass","tags":"\u0412\u0438\u0434\u0435\u043e","is_pass":1,"is_lock":0,"deadline":0,"color":"pink","fig":"star","emo":"smart","folders":{"folders":[],"files_count":0}}],"files_count":0},"video":{"folders":[],"files_count":0},"music":{"folders":[],"files_count":0},"docs":{"folders":[],"files_count":0},"images":{"folders":[],"files_count":0}},"other":{"folders":[{"name":"1223","path":"other/1223","tags":"\u0412\u0438\u0434\u0435\u043e","is_pass":1,"is_lock":0,"deadline":0,"color":"blue","fig":"rectangle","emo":"bored","folders":{"folders":[{"name":"123","path":"other/1223/123","tags":"\u0412\u0438\u0434\u0435\u043e","is_pass":1,"is_lock":0,"deadline":0,"color":"blue","fig":"pentagon","emo":"cool","folders":{"folders":[],"files_count":0}}],"files_count":0}},{"name":"HelloFolder","path":"other/HelloFolder","tags":null,"is_pass":0,"is_lock":0,"deadline":0,"color":"rgb(249, 173, 80)","fig":null,"emo":null,"folders":{"folders":[],"files_count":0}},{"name":"NewFolder","path":"other/NewFolder","tags":"\u0424\u043e\u0442\u043e","is_pass":1,"is_lock":0,"deadline":0,"color":"purple","fig":"pentagon","emo":"cool","folders":{"folders":[{"name":"123","path":"other/NewFolder/123","tags":null,"is_pass":1,"is_lock":0,"deadline":0,"color":"green","fig":"pentagon","emo":null,"folders":{"folders":[],"files_count":0}},{"name":"test","path":"other/NewFolder/test","tags":"\u0424\u043e\u0442\u043e","is_pass":1,"is_lock":0,"deadline":0,"color":"darkblue","fig":"rectangle","emo":"cool","folders":{"folders":[],"files_count":0}}],"files_count":0}},{"name":"NewTest","path":"other/NewTest","tags":null,"is_pass":0,"is_lock":0,"deadline":0,"color":"rgb(244, 112, 125)","fig":null,"emo":"cool","folders":{"folders":[],"files_count":0}},{"name":"TestFolder","path":"other/TestFolder","tags":"\u0424\u043e\u0442\u043e","is_pass":0,"is_lock":0,"deadline":0,"color":"blue","fig":"triangle","emo":"nerd","folders":{"folders":[{"name":"123","path":"other/TestFolder/123","tags":"\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b","is_pass":0,"is_lock":0,"deadline":0,"color":"green","fig":"star","emo":"cool","folders":{"folders":[],"files_count":0}}],"files_count":0}}],"files_count":0}}";
            // res.data = JSON.parse(resp);
            // console.log(res);
            if (res.data?.global) {
                f.global = folders.map(el => {
                    return {
                        name: el.name,
                        nameRu: el.nameRu,
                        path: el.path,
                        folders: res.data.global[el.name].folders,
                        files: res.data.global[el.name].files,
                        files_count: res.data.global[el.name].files_count
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
    const files = await api.post(`/ajax/lsjson.php?uid=${getState().user.uid}&dir=${path}&page=${1}&items_per_page=${20}`);

    dispatch({
        type: CHOOSE_FILES,
        payload: {files: files.data, path}
    })
};

export const onChooseAllFiles = () => async (dispatch, getState) => {
    const files = await api.post(`/ajax/file_list_all.php?uid=${getState().user.uid}&page=${1}&items_per_page=${20}`);

    dispatch({
        type: CHOOSE_ALL_FILES,
        payload: {files: files.data, path: 'global/all'}
    })
};

export const onDeleteFile = (file) => {
    return {
        type: FILE_DELETE,
        payload: file
    }
};

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

};

export const onAddRecentFolders = () => async (dispatch, getState) => {

    api.post(`ajax/dir_recent.php?uid=${getState().user.uid}`)
        .then(res => {
            const newFolders = res.data.map(folder => {
                if(folder.path.split('/')[0] === 'global' && folder.path.split('/').length === 2) {
                    const newFolder = folder;
                    folders.forEach(f => f.path === folder.path ? newFolder.name = f.nameRu : undefined);
                    return newFolder
                } else {return folder}
            });
            dispatch({
                type: ADD_RECENT_FOLDERS,
                payload: newFolders
            })
        })
        .catch(err => console.log(err))
};

export const onAddRecentFiles = () => async (dispatch, getState) => {

    api.post(`/ajax/history_files.php?uid=${getState().user.uid}`)
        .then(res => {
            dispatch({
                type: ADD_RECENT_FILES,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};

export const onChooseRecentFile = (file) => {
    return{
        type: CHOOSE_RECENT_FILES,
        payload: file
    }
};

export const onCustomizeFile = (file) => {
    return{
        type: CUSTOMIZE_FILE,
        payload: file
    }
};


//SAFE

export const onGetSafes = () => async (dispatch, getState) => {
    dispatch({
        type: GET_SAFES,
        payload: [
            {
                id: 1,
                name: 'Пароли',
                emo: 'nerd'
            },
            {
                id: 2,
                name: 'Имя сейфа',
                tag: 'Дизайн'
            },
            {
                id: 3,
                name: 'Имя сейфа',
                emo: 'cool',
                fig: 'like'
            },
            {
                id: 4,
                name: 'Имя сейфа',
            },
            {
                id: 5,
                name: 'Имя сейфа',
            },
        ]
    })
};


// PROGRAMS

export const onGetProgramFolders = () => async (dispatch, getState) => {
    dispatch({
        type: GET_PROGRAM_FOLDERS,
        payload: [
            {
                id: 1,
                icon: 'folder-5',
                name: "office",
                nameRu: "Офис",
                path: "global/video"
            },
            {
                id: 2,
                icon: 'folder-4',
                name: "design_program",
                nameRu: "Программы для дизайна",
                path: "global/video",
                symbol: './assets/PrivateCabinet/locked.svg',
                emo: 'happy'
            },
            {
                id: 3,
                icon: 'folder-4',
                name: "montaj_program",
                nameRu: "Программы для монтажа",
                path: "global/video"
            },
            {
                id: 4,
                icon: 'folder-4',
                name: "study_program",
                nameRu: "Программы для обучения",
                path: "global/video"
            },
            {
                id: 5,
                icon: 'folder-4',
                name: "games",
                nameRu: "Игры",
                path: "global/video"
            },
            {
                id: 6,
                icon: 'folder-4',
                name: "other",
                nameRu: "Разное",
                path: "global/video"
            },
        ]
    })
};

export const onGetRecentPrograms = () => async (dispatch, getState) => {
    dispatch({
        type: GET_RECENT_PROGRAMS,
        payload: [
            {
                id: 1,
                icon: 'slack-2',
                name: 'slack',
                nameRu: 'Slack',
                path: "global/video"
            },
            {
                id: 2,
                icon: 'chrome',
                name: 'chrome',
                nameRu: 'Google Chrome',
                path: "global/video",
            },
        ]
    })
};

export const onGetTopListPrograms = () => async (dispatch, getState) => {
    dispatch({
        type: GET_TOP_LIST_PROGRAMS,
        payload: [
            {
                id: 1,
                name: 'Primer pro',
                program: 'premier_pro',
                size: '10 MB',
            },
            {
                id: 2,
                name: 'Adobe XD',
                program: 'adobe_xd',
                size: '10 MB',
            },
            {
                id: 3,
                name: 'Slack',
                program: 'slack',
                size: '10 MB',
            },
            {
                id: 4,
                name: 'Skype',
                program: 'skype',
                size: '10 MB',
            },
            {
                id: 5,
                name: 'Media-encoder',
                program: 'media_encoder',
                size: '10 MB',
            },
            {
                id: 6,
                name: 'Google chrome',
                program: 'chrome',
                size: '10 MB',
            },
        ]
    })
};

export const onGetCategories = () => async (dispatch, getState) => {
    dispatch({
        type: GET_CATEGORIES,
        payload: [
            {
                id: 1,
                name: 'Все',
                type: 'all',
            },
            {
                id: 2,
                name: 'Творчество',
                type: 'art',
            },
            {
                id: 3,
                name: 'Программы',
                type: 'programs',
            },
            {
                id: 4,
                name: 'Месенжеры',
                type: 'messengers',
            },
            {
                id: 5,
                name: 'Офис',
                type: 'office',
            },
            {
                id: 6,
                name: 'Развлечения',
                type: 'games',
            },
            {
                id: 7,
                name: 'Другое',
                type: 'other',
            },
        ]
    })
};

export const onGetPrograms = (folderId) => async (dispatch, getState) => {
    dispatch({
        type: GET_PROGRAMS,
        payload: [
            {
                id: 1,
                name: 'Sketch',
                icon: './assets/PrivateCabinet/sketch.svg',
                category: 2,
                site: 'Sketch.com',
                price: 25,
                rating: '4,4',
                votes: 256
            },
            {
                id: 2,
                name: 'Photoshop',
                icon: './assets/PrivateCabinet/adobe.svg',
                category: 2,
                site: 'Photoshop.com',
                price: 30,
                rating: '4,5',
                votes: 124
            },
            {
                id: 3,
                name: 'Ai',
                icon: './assets/PrivateCabinet/ai.svg',
                category: 2,
                site: 'Ai.com',
                price: 25,
                rating: '4,2',
                votes: 256
            },
            {
                id: 4,
                name: 'Sketch',
                icon: './assets/PrivateCabinet/adobe-2.svg',
                category: 2,
                site: 'Sketch.com',
                price: 25,
                rating: '4,4',
                votes: 256
            },
            {
                id: 5,
                name: 'Acrobat',
                icon: './assets/PrivateCabinet/acrobat.svg',
                category: 2,
                site: 'Acrobat.com',
                price: 20,
                rating: '4',
                votes: 223
            },
            {
                id: 6,
                name: 'Zeplin',
                icon: './assets/PrivateCabinet/icZeplin.svg',
                category: 2,
                site: 'Zeplin.com',
                price: 35,
                rating: '5',
                votes: 360
            },
        ]
    })
};



// DEVICES


export const onGetDevices = () => async (dispatch, getState) => {
    dispatch({
        type: GET_DEVICES,
        payload: [
            {
                id: 1,
                name: 'iPhone 11 pro max',
                device: 'iphone'
            },
            {
                id: 2,
                name: 'iMac pro',
                device: 'imac'
            },
            {
                id: 3,
                name: 'MacBook pro',
                device: 'macbookpro'
            },
            {
                id: 4,
                name: 'Планшет',
                device: 'ipad11'
            },
            {
                id: 5,
                name: 'Неопознаный обьект',
                device: false
            },
        ]
    })
};


export const onGetConnectedContacts = () => async (dispatch, getState) => {
    dispatch({
        type: GET_CONNECTED_CONTACTS,
        payload: [
            {
                id: 1,
                name: 'Алина Квиталина',
                active: 1,
                image: './assets/PrivateCabinet/avatars/a1.svg'
            },
            {
                id: 2,
                name: 'Катерина',
                active: 0,
                image: './assets/PrivateCabinet/avatars/a2.svg'
            },
            {
                id: 3,
                name: 'Антон Медведев',
                active: 1,
                image: './assets/PrivateCabinet/avatars/a3.svg'
            },
            {
                id: 4,
                name: 'Коваленко Андрей',
                active: 0,
                image: './assets/PrivateCabinet/avatars/a4.svg'
            }
        ]
    })
};

export const onSetFileSize = (size) => {
    return {
        type: SET_SIZE,
        payload: size
    }
}
