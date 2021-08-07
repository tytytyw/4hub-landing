import api from '../../api';
import axios from 'axios';

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
    SET_WORKELEMENTSVIEW,
    GET_PROJECT_FOLDER,
    GET_PROJECTS,
    GET_JOURNAL_FOLDERS,
    SEARCH,
    CHOOSE_SHARED_FILES,
    SET_CALENDAR_DATE,
    SET_CALENDAR_EVENTS,
    SORT_FILES,
    LOAD_FILES,
} from '../types';

const CancelToken = axios.CancelToken;

const folders = [
    {name: 'all', nameRu: 'Общая папка', path: 'global/all'},
    {name: 'video', nameRu: 'Фильмы', path: 'global/video'},
    {name: 'music', nameRu: 'Музыка', path: 'global/music'},
    {name: 'images', nameRu: 'Изображения', path: 'global/images'},
    {name: 'docs', nameRu: 'Документы', path: 'global/docs'},
];

export const onGetFolders = () => async (dispatch, getState) => {
    // TODO - Need to modify page && item per page state `&page=${1}&items_per_page=${20}`
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

export const onChooseFiles = (path, search, page, set, setLoad, repeat) => async (dispatch, getState) => {
    const searched = search ? `&search=${search}` : '';
    const cancelChooseFiles = CancelToken.source();
    window.cancellationTokens = {cancelChooseFiles}
        const url = `/ajax/lsjson.php?uid=${getState().user.uid}&dir=${path}${searched}&page=${page}&per_page=${10}&sort=${getState().PrivateCabinet.sort}`;
        await api.get(url,{
            cancelToken: cancelChooseFiles.token
        }).then(files => {
            //TODO - Need to check sort by creationDate, modificationDate, byName

            //TODO - Need to delete !!!TESTING ENVIRONMENT!!!!!
            // files.data.forEach(el => console.log(el.ctime))

            page > 1
                ? dispatch({
                    type: LOAD_FILES,
                    payload: {files: files.data, path}
                })
                : dispatch({
                    type: CHOOSE_FILES,
                    payload: {files: files.data, path}
                })
            if(set) set(files.data.length);
            if(setLoad) {
                new  Promise(async resolve => await resolve( setLoad(false)))
                    .then(() => {if(repeat) repeat()})
            }
        })
            .catch(e => console.log(e))
            .finally(() => {delete window.cancellationTokens.cancelChooseFiles});
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

export const onGetSafes = (data = []) => async (dispatch, getState) => {
    dispatch({
        type: GET_SAFES,
        payload: data
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
    console.log(new Date())
    api.get(`/ajax/devices_list.php?uid=${getState().user.uid}`)
        .then(res => {
            if(res.data.ok === 1) {
                let list = [];
                Object.entries(res.data.devices).forEach(device => {
                    let obj = {
                        id: device[1].id,
                        name: device[1].data.browser,
                        os: device[1].data.platform,
                        device: device[1].data.device_type || 'unknown',
                        last_visit: device[1]?.ut_last?.split(' ')[0] || ''
                    }
                    list.push(obj);
                })
                dispatch({
                    type: GET_DEVICES,
                    payload: list
                })
            }
        })
        .catch(err => console.log(err))
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

// PROJECT

export const onGetProjects = () => async (dispatch, getState) => {
    dispatch({
        type: GET_PROJECTS,
        payload: [
            {id: 1, name: 'Проект 1', tasks: 3, icon: '', tag: 'Тег', emo: 'angry', fig: 'triangle', blocked: false},
            {id: 2, name: 'Проект 2', tasks: 0, icon: '', tag: '', emo: '', fig: '', blocked: true},
            {id: 3, name: 'Проект 3', tasks: 1, icon: '', tag: '', emo: '', fig: '', blocked: false},
            {id: 4, name: 'Проект 4', tasks: 0, icon: '', tag: '', emo: '', fig: '', blocked: false}
        ]
    })
}

export const onGetProjectFolders = () => async (dispatch, getState) => {

    const folders = [
        {
            id: 1,
            icon: 'folder-blue',
            name: "Дизайн Файл",
            symbol: './assets/PrivateCabinet/locked.svg',
            emo: 'happy',
            projectId: 1,
        },
        {
            id: 2,
            icon: 'folder-yellow',
            name: "Payment Design",
            projectId: 2,
        },
        {
            id: 3,
            icon: 'folder-green',
            name: "App Design",
            projectId: 1,
        },
    ]

    dispatch({
        type: GET_PROJECT_FOLDER,
        payload: folders
    })
}


// JOURNAL

export const onGetJournalFolders = (folders) => ({
    type: GET_JOURNAL_FOLDERS,
    payload: [
        {
            id: 1,
            icon: 'my-files',
            name: "Весь список",
        },
        {
            id: 2,
            icon: 'shared-files',
            name: "Расшаренные файлы",
        },
        {
            id: 3,
            icon: 'downloaded-files',
            name: "Загруженные файлы",
        },
        {
            id: 4,
            icon: 'downloaded-link',
            name: "Загруженные ссылки",
        },
        {
            id: 5,
            icon: 'my-folders',
            name: "Мои папки",
        },
        {
            id: 6,
            icon: 'my-files',
            name: "Мои файлы",
        },
        {
            id: 7,
            icon: 'programs',
            name: "Программы",
        },
        {
            id: 8,
            icon: 'project',
            name: "Совместный проект",
        },
        {
            id: 9,
            icon: 'archive',
            name: "Архив",
        },
        {
            id: 9,
            icon: 'trash-cart',
            name: "Корзина",
        },
    ]
})



export const onSetFileSize = (size) => {
    return {
        type: SET_SIZE,
        payload: size
    }
}

export const onSetWorkElementsView = (view) => {
    return {
        type: SET_WORKELEMENTSVIEW,
        payload: view
    }
}

// CALENDAR PAGE
export const setCalendarDate = date => {
    return {
        type: SET_CALENDAR_DATE,
        payload: date
    }
}

export const setCalendarEvents = events => {
    return {
        type: SET_CALENDAR_EVENTS,
        payload: [
            {
                name: 'Сдать задачу за 2020 год',
                term: 'С 12 августа По 16 августа 2020',
                tag: 'Отчет',
                sender: 'Недельская Алина Квиталина',
                avatar: 'a1',
                ctime: '14:45',
                date: new Date('2021-07-29 09:00'),
                type: 1
            },
            {
                name: 'Сдать задачу за 2020 год',
                term: 'С 12 августа По 16 августа 2020',
                tag: 'Отчет',
                sender: 'Недельская Алина Квиталина',
                avatar: 'a1',
                ctime: '14:45',
                date: new Date('2021-07-25 12:00'),
                type: 2
            },
            {
                name: 'Сдать задачу за 2020 год',
                term: 'С 12 августа По 16 августа 2020',
                tag: 'Отчет',
                sender: 'Недельская Алина Квиталина',
                avatar: 'a1',
                ctime: '14:45',
                date: new Date('2021-07-26 22:00'),
                type: 3,
            },
        ]
    }
}

export const onSearch = (value) => {
    return {
        type: SEARCH,
        payload: value
    }
}

// SHARED FILES
export const onGetSharedFiles  = (day, mounth) => async (dispatch, getState) => {
    try {
        const res = await api.get(`/ajax/file_share_get.php?uid=${getState().user.uid}&m=${mounth}`)
        dispatch({
            type: CHOOSE_SHARED_FILES,
            payload: res.data.data
        })
    } catch (e) {
        console.log(e);
    }
}

export const onSortFile = (filter) => {
    return {
        type: SORT_FILES,
        payload: filter
    }
}