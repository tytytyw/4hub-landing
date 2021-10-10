export const tags = ['Фото', 'Видео', 'Музыка', 'Документы', 'Другое'];

export const colors = [
    {dark: '#efeeee', light: '#efeeee', color: 'grey', name: 'grey'},
    {dark: '#c4aa8f', light: 'rgb(254, 220, 184)', color: 'rgb(254, 220, 184)', name: 'wheat'},
    {dark: '#326bc1', light: 'rgb(64, 134, 242)', color: 'rgb(64, 134, 242)', name: 'blue'},
    {dark: '#27967a', light: 'rgb(52, 198, 162)', color: 'rgb(52, 198, 162)', name: 'green'},
    {dark: '#cb8d40', light: 'rgb(249, 173, 80)', color: 'rgb(249, 173, 80)', name: 'orange'},
    {dark: '#c15862', light: 'rgb(244, 112, 125)', color: 'rgb(244, 112, 125)', name: 'pink'},
    {dark: '#792794', light: 'rgb(160, 51, 195)', color: 'rgb(160, 51, 195)', name: 'purple'},
    {dark: '#992928', light: 'rgb(194, 52, 51)', color: 'rgb(194, 52, 51)', name: 'red'},
    {dark: '#267d8d', light: 'rgb(52, 174, 196)', color: 'rgb(52, 174, 196)', name: 'aqua'},
    {dark: 'rgb(161,98,125)', light: 'rgb(196, 118, 151)', color: 'rgb(196, 118, 151)', name: 'brown'},
    {dark: '#40289b', light: 'rgb(81, 52, 197)', color: 'rgb(81, 52, 197)', name: 'darkblue'}
];

export const signs = ['triangle', 'circle', 'heart', 'star', 'pentagon', 'rectangle', 'notification', 'stop', 'shield-2', 'like', 'price-tag'];

export const smiles = [
    'angry', 'angry-2', 'bored', 'confused', 'cool', 'favorite', 'grinning', 'happy', 'happy-2', 'in-love', 'kissing', 'nerd',
    'quiet', 'sad', 'shocked', 'smart', 'smiling', 'surprised', 'suspicious', 'thinking', 'tongue-out', 'unhappy'
];

export const contextMenuFile = {
    main: [
        {name: 'Расшарить', img: 'share', type: 'share'},
        {name: 'Скопировать ссылку', img: 'link-4', type: 'copyLink'},
        {name: 'Редактировать файл', img: 'edit', type: 'customize'},
        {name: 'Ред. несколько файлов', img: 'editSeveral', type: 'customizeSeveral'},
        {name: 'Переместить в архив', img: 'archive', type: 'archive'},
        {name: 'Сжать в Zip', img: 'zip', type: 'intoZip'},
        {name: 'Сжать несколько файлов в Zip', img: 'severalZip', type: 'intoZipSeveral'},
        {name: 'Свойства', img: 'info', type: 'properties'},
        {name: 'Загрузить', img: 'download-blue', type: 'download'},
        {name: 'Печать', img: 'print-2', type: 'print'},
    ],
    additional: [{name: 'Удалить', img: 'garbage', type: 'delete'}]
};

export const contextMenuProfile = {
    main: [
        {name: 'Мой профиль', img: 'profile-icon'},
        {name: 'Служба поддержки', img: 'question-icon'},
        {name: 'Настройки', img: 'settings-icon'},
    ],
    additional: [
        {name: 'Выход', img: 'sign-out-icon'},
    ]
};

export const contextMenuFilters = {
    main: [
        {name: `По имени от А до Я`, reverseName: 'По имени от Я до А', img: '', ext: 'byName'},
        {name: `По дате добавления/создания`, reverseName: 'По дате добавления/создания', img: '', ext: 'byDateCreated&sort_reverse=1'},
        {name: 'По дате изменения', reverseName: 'По дате изменения', img: '', ext: 'byDateChanged&sort_reverse=1'},
        {name: 'По дате последнего открытия', reverseName: 'По дате последнего открытия', img: '', ext: 'byDateOpened'},
        {name: 'По размеру (от больших к малым)', reverseName: 'По размеру (от малых к большим)', img: '', ext: 'bySize&sort_reverse=1'},
        {name: 'По размеру (от малых к большим)', reverseName: '', img: '', ext: 'bySize'},
        {name: 'По типу', reverseName: 'По типу U+21FD', img: '', ext: 'byType'},
        {name: 'По тэгам', reverseName: 'По тэгам', img: '', ext: 'byTags'},
    ],
    additional: []
};

export const contextMenuCreateFile = {
    other: [
        {name: 'ONLYOFFICE', img: 'microsoft-oneOffice'},
    ],
    microsoft: [
        {name: 'Документ Word', img: 'word', ext: 'docx'},
        {name: 'Книга Excel', img: 'excel', ext: 'xlsx'},
        {name: 'Презентация PowerPoint', img: 'powerpoint', ext: 'pptx'},
    ],
    google: [
        {name: 'Документ Google', img: 'google-doc'},
        {name: 'Таблица Google', img: 'google-table'},
        {name: 'Презентация Google', img: 'google-presentation'},
    ],
};

export const contextMenuProjects = {
    main: [
        {name: 'Добавить участника', img: 'add-user', type: 'addMember'},
        {name: 'Скопировать ссылку и поделиться', img: 'perm-set', type: 'copyLink'},
        {name: 'Создать папку', img: 'add-folder', type: 'addFolder'},
        {name: 'Редактировать', img: 'rename', type: 'customize'},
        {name: 'Архивировать', img: 'archive', type: 'archive'},
        {name: 'Все участники', img: 'all-users'},
        {name: 'Свойства', img: 'property', margin: true, type: 'propertiesProject'},

    ],
    additional: [
        {name: 'Покинуть проект', img: 'leave', type: 'leave'},
        {name: 'Удалить проект', img: 'delete', type: 'delete'},
    ]
};

export const contextMenuFolderGeneral = {
    main: [
        // {name: 'Расшарить', img: 'resend'},
        {name: 'Скопировать ссылку и поделиться', img: 'shareFile'},
        {name: 'Добавить папку', img: 'settings-work-tool'},
        {name: 'Свойства', img: 'info'},
    ],
    additional: []
};

export const contextMenuFolder = {
    main: [
        {name: 'Редактировать', img: 'edit', type: 'customizeFolder'},
        {name: 'Расшарить', img: 'resend'},
        {name: 'Скопировать ссылку и поделиться', img: 'shareFile'},
        {name: 'Добавить папку', img: 'settings-work-tool'},
        {name: 'Свойства', img: 'info'},
        {name: 'Удалить папку', img: 'garbage'}
    ],
    additional: []
};

export const contextMenuSubFolder = {
    main: [
        {name: 'Редактировать', img: 'edit', type: 'customizeFolder'},
        {name: 'Доступ и экспорт', img: 'shareFile', type: "setAccessFolder"},
        {name: 'Свойства', img: 'info', type: "propertiesFolder"},
        {name: 'Удалить папку', img: 'garbage', type: 'deleteFolder'}
    ],
    additional: []
}

export const contextMenuDevice = {
    main: [
        {name: 'Отключить устройство', img: 'edit', type: 'disconnectDevice'},
        {name: 'Отключить все устройства', img: 'shareFile', type: "disconnectAllDevice"}
    ],
    additional: []
}

export const contextMenuSafeItem = {
    main: [
        {name: 'Предоставить доступ', img: 'download-blue'},
        {name: 'Редактировать', img: 'edit', type: 'customizeSafe'},
        {name: 'Настроить', img: 'settings-work-tool'},
        {name: 'Свойства', img: 'info', type: 'propertiesSafe'},
    ],
    additional: [
        {name: 'Удалить', img: 'garbage'}
    ]
}


// Programs
export const contextProgramFolder = {
    main: [
        {name: 'Переслать', img: 'resend'},
        {name: 'Расшарить', img: 'shareFile'},
        {name: 'Скопировать ссылку', img: 'link-4'},
        {name: 'Редактировать файл', img: 'edit'},
        {name: 'Переместить в архив', img: 'archive'},
        {name: 'Свойства', img: 'info'},
    ],
    additional: [
        {name: 'Удалить файл', img: 'garbage'}
    ]
}

export const contextProgram = {
    main: [
        {name: 'Открыть', img: 'open-file-button'},
        {name: 'Переслать', img: 'resend'},
        {name: 'Скопировать ссылку', img: 'link-4'},
    ],
    additional: [
        {name: 'Удалить файл', img: 'garbage'}
    ]
}


export const previewTypes = ['application/msword', 'application/excel'];
export const previewFormats = ['doc', 'xls', 'ppt', 'rtf', 'xlt', 'csv'];



//Project
export const projectIcons = ['lamp', 'coworking','rocket', 'suitcase', 'clipboard', 'thunder', 'pen'];

export const figuresPaint = [
    {id: 1, figure: 'font'},
    {id: 2, figure: 'circle-outlined'},
    {id: 3, figure: 'square-outlined'},
    {id: 4, figure: 'arrow-outlined'},
    {id: 5, figure: 'pencil-outlined'},
    {id: 6, figure: 'brush-outlined'},
];

export const colorsPaint = [
    {id: 1, color: '#E0A512', colorRGBA: 'rgba(224,165,18,0.2)'},
    {id: 2, color: '#9C0050', colorRGBA: 'rgba(156,0,80,0.2)'},
    {id: 3, color: '#BEBEBE', colorRGBA: 'rgba(190,190,190,0.2)'},
    {id: 4, color: '#CD0C21', colorRGBA: 'rgba(205,12,33,0.2)'},
    {id: 5, color: '#000000', colorRGBA: 'rgba(0,0,0,0.2)'},
    {id: 6, color: '#5026B8', colorRGBA: 'rgba(80,38,184,0.2)'},
    {id: 7, color: '#04C6F4', colorRGBA: 'rgba(4,198,244,0.2)'},
    {id: 8, color: '#6D3FD7', colorRGBA: 'rgba(109,63,215,0.2)'},
    {id: 9, color: '#67AB3E', colorRGBA: 'rgba(103,171,62,0.2)'},
]

export const dotsPaint = [
    {id: 1, width: 16},
    {id: 2, width: 14},
    {id: 3, width: 12},
    {id: 4, width: 10},
    {id: 5, width: 8},
    {id: 6, width: 6},
    {id: 7, width: 5},
    {id: 8, width: 2},
]