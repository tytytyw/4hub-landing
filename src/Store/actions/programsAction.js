import {
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


export const onGetTopListPrograms = (cat = false) => async (dispatch, getState) => {

    if (cat) {
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
    } else {
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

}


export const onGetPrograms = (folderId) => async (dispatch, getState) => {
    dispatch({
        type: GET_PROGRAMS,
        payload: [
            {
                id: 1,
                name: 'Sketch',
                icon: './assets/PrivateCabinet/sketch.svg'
            },
            {
                id: 2,
                name: 'Photoshop',
                icon: './assets/PrivateCabinet/adobe.svg'
            },
            {
                id: 3,
                name: 'Ai',
                icon: './assets/PrivateCabinet/ai.svg'
            },
            {
                id: 4,
                name: 'Sketch',
                icon: './assets/PrivateCabinet/adobe-2.svg'
            },
            {
                id: 5,
                name: 'Acrobat',
                icon: './assets/PrivateCabinet/acrobat.svg'
            },
            {
                id: 6,
                name: 'Zeplin',
                icon: './assets/PrivateCabinet/icZeplin.svg'
            },
        ]
    })
}