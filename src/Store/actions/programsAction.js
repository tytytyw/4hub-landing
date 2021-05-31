import {
    GET_CATEGORIES,
    GET_PROGRAMS,
    GET_PROGRAMS_FOLDERS, GET_RECENT_PROGRAMS, GET_TOP_LIST_PROGRAMS
} from '../types'

export const onGetFolders = () => async (dispatch, getState) => {
    dispatch({
        type: GET_PROGRAMS_FOLDERS,
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
}

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
}

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
}

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
}

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
}