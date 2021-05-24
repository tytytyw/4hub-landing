import api from '../../api'

import {
    ADD_RECENT_FILES,
    ADD_RECENT_FOLDERS,
    CHOOSE_FILES,
    CHOOSE_FOLDER,
    CONTACT_LIST,
    FILE_DELETE,
    GET_FOLDERS,
    CHOOSE_RECENT_FILES
} from '../types';


export const onGetFolders = () => async (dispatch, getState) => {
    const folders = [
        {name: 'all', nameRu: 'Общая папка', path: 'global/all'},
        {name: 'video', nameRu: 'Фильмы', path: 'global/video'},
        {name: 'music', nameRu: 'Музыка', path: 'global/music'},
        {name: 'images', nameRu: 'Изображения', path: 'global/images'},
        {name: 'docs', nameRu: 'Документы', path: 'global/docs'},
    ];
    // TODO - Need to modify page && item per page state
    api.get(`/ajax/get_folders.php?uid=${getState().user.uid}&page=${1}&items_per_page=${20}`)
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
    const files = await api.post(`/ajax/lsjson.php?uid=${getState().user.uid}&dir=${path}&page=${1}&items_per_page=${20}`);

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

// TODO - Need to change mock on recent folders from server
export const onAddRecentFolders = () => async (dispatch, getState) => {
    const mock = [
        {
        color: "green",
        deadline: 0,
        emo: "cool",
        fig: null,
        folders: [],
        is_lock: 0,
        is_pass: 0,
        name: "TempFolder",
        path: "global/all/TempFolder",
        tags: "Другое",
        },
        {
            name:"123",
            path:"other/TestFolder/123",
            tags:"Документы",
            is_pass:0,
            is_lock:0,
            deadline:0,
            color:"green",
            fig:"star",
            emo:"cool",
        }
    ];

    api.post(`ajax/dir_recent.php?uid=${getState().user.uid}`)
        // .then(res => console.log(res))
        .catch(err => console.log(err))
    dispatch({
        type: ADD_RECENT_FOLDERS,
        payload: mock
    })
}

// TODO - Need to change mock on recent files from server
export const onAddRecentFiles = () => async (dispatch, getState) => {
    const mock = [{
        color: "rgb(52, 198, 162)",
        ctime: "01.01.1970 00:00",
        date: 1621195644,
        deadline: 2208988800,
        deny_edit: "0",
        edit_url: "",
        edit_url2: "http://fs.mh.net.ua/oo.php?fid=0088280c930a26d39d4f972d80089f74&access_token=",
        emo: "",
        ext: "JPG",
        fid: "00882801c930a26d39d4f972d80089f74",
        fig: "star",
        file: "2042f4f9b62329de09eb2e3f0baba547",
        fname: "1a46a75a1bcdebf.jpg",
        gdir: "global/all",
        is_pass: 0,
        is_preview: 1,
        mime_type: "image/jpeg",
        mtime: "16.05.2021 17:07",
        name: "1a46a75a1bcdebf.jpg",
        preview: "/upload/fd9223259c24a66f397f9f44f628b87b/global/all/2042f4f9b62329de09eb2e3f0baba547",
        size: 370267,
        size_now: "361.6 KB",
        tag: null,
        tag2: "ZZZZZZZZZZZZ",
    },
        {
            color: "rgb(52, 198, 162)",
            ctime: "01.01.1970 00:00",
            date: 1621195644,
            deadline: 2208988800,
            deny_edit: "0",
            edit_url: "",
            edit_url2: "http://fs.mh.net.ua/oo.php?fid=0088280c930a26d39d4f972d80089f74&access_token=",
            emo: "grinning",
            ext: "JPG",
            fid: "00882280c930a26d39d4f972d80089f74",
            fig: "star",
            file: "2042f4f9b62329de09eb2e3f0baba547",
            fname: "1a46a75a1bcdebf.jpg",
            gdir: "global/all",
            is_pass: 0,
            is_preview: 1,
            mime_type: "image/jpeg",
            mtime: "16.05.2021 17:07",
            name: "1a46a75a1bcdebf.jpg",
            preview: "/upload/fd9223259c24a66f397f9f44f628b87b/global/all/2042f4f9b62329de09eb2e3f0baba547",
            size: 370267,
            size_now: "361.6 KB",
            tag: null,
            tag2: "ZZZZZZZZZZZZ",
        },
        {
            color: "rgb(52, 198, 162)",
            ctime: "01.01.1970 00:00",
            date: 1621195644,
            deadline: 2208988800,
            deny_edit: "0",
            edit_url: "",
            edit_url2: "http://fs.mh.net.ua/oo.php?fid=0088280c930a26d39d4f972d80089f74&access_token=",
            emo: "grinning",
            ext: "JPG",
            fid: "00882802c930a26d39d4f2972d80089f74",
            fig: "star",
            file: "2042f4f9b62329de09eb2e3f0baba547",
            fname: "1a46a75a1bcdebf.jpg",
            gdir: "global/all",
            is_pass: 0,
            is_preview: 1,
            mime_type: "image/jpeg",
            mtime: "16.05.2021 17:07",
            name: "1a46a75a1bcdebf.jpg",
            preview: "/upload/fd9223259c24a66f397f9f44f628b87b/global/all/2042f4f9b62329de09eb2e3f0baba547",
            size: 370267,
            size_now: "361.6 KB",
            tag: null,
            tag2: "ZZZZZZZZZZZZ",
        },
        {
            color: "rgb(52, 198, 162)",
            ctime: "01.01.1970 00:00",
            date: 1621195644,
            deadline: 2208988800,
            deny_edit: "0",
            edit_url: "",
            edit_url2: "http://fs.mh.net.ua/oo.php?fid=0088280c930a26d39d4f972d80089f74&access_token=",
            emo: "grinning",
            ext: "JPG",
            fid: "01088280c930a26d39d4f972dg80089f74",
            fig: "star",
            file: "2042f4f9b62329de09eb2e3f0baba547",
            fname: "1a46a75a1bcdebf.jpg",
            gdir: "global/all",
            is_pass: 0,
            is_preview: 1,
            mime_type: "image/jpeg",
            mtime: "16.05.2021 17:07",
            name: "1a46a75a1bcdebf.jpg",
            preview: "/upload/fd9223259c24a66f397f9f44f628b87b/global/all/2042f4f9b62329de09eb2e3f0baba547",
            size: 370267,
            size_now: "361.6 KB",
            tag: 'Видео',
            tag2: "ZZZZZZZZZZZZ",
        },
        {
            color: "rgb(52, 198, 162)",
            ctime: "01.01.1970 00:00",
            date: 1621195644,
            deadline: 2208988800,
            deny_edit: "0",
            edit_url: "",
            edit_url2: "http://fs.mh.net.ua/oo.php?fid=0088280c930a26d39d4f972d80089f74&access_token=",
            emo: "grinning",
            ext: "JPG",
            fid: "0088280ca930a26d39d4f972d80089f74",
            fig: "",
            file: "2042f4f9b62329de09eb2e3f0baba547",
            fname: "1a46a75a1bcdebf.jpg",
            gdir: "global/all",
            is_pass: 0,
            is_preview: 1,
            mime_type: "image/jpeg",
            mtime: "16.05.2021 17:07",
            name: "1a46a75a1bcdebf.jpg",
            preview: "/upload/fd9223259c24a66f397f9f44f628b87b/global/all/2042f4f9b62329de09eb2e3f0baba547",
            size: 370267,
            size_now: "361.6 KB",
            tag: 'Видео',
            tag2: "ZZZZZZZZZZZZ",
        },
        {
            color: "rgb(52, 198, 162)",
            ctime: "01.01.1970 00:00",
            date: 1621195644,
            deadline: 2208988800,
            deny_edit: "0",
            edit_url: "",
            edit_url2: "http://fs.mh.net.ua/oo.php?fid=0088280c930a26d39d4f972d80089f74&access_token=",
            emo: "",
            ext: "JPG",
            fid: "0088asdf280c930a26d39d4f972d80089f74",
            fig: "star",
            file: "2042f4f9b62329de09eb2e3f0baba547",
            fname: "1a46a75a1bcdebf.jpg",
            gdir: "global/all",
            is_pass: 1,
            is_preview: 1,
            mime_type: "image/jpeg",
            mtime: "16.05.2021 17:07",
            name: "1a46a75a1bcdebf.jpg",
            preview: "/upload/fd9223259c24a66f397f9f44f628b87b/global/all/2042f4f9b62329de09eb2e3f0baba547",
            size: 370267,
            size_now: "361.6 KB",
            tag: 'Видеоfytfftfyfyt',
            tag2: "ZZZZZZZZZZZZ",
        }
        ];

    api.post(`/ajax/history_files.php?uid=${getState().user.uid}`)
        .then(res => {
            dispatch({
                type: ADD_RECENT_FILES,
                payload: mock
            })
        })
        .catch(err => console.log(err));
}

export const onChooseRecentFile = (file) => {
    return{
        type: CHOOSE_RECENT_FILES,
        payload: file
    }
}