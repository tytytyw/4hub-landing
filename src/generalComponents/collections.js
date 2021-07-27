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
    'quiet', 'sad', 'shocked', 'smart', 'smiling', 'surprised', 'suspicious', 'thinking', /*'tongue-out', 'unhappy'*/
];

export const contextMenuFile = {
    main: [
        {name: 'Расшарить', img: 'share', type: 'share'},
        {name: 'Скопировать ссылку', img: 'link-4', type: 'copyLink'},
        {name: 'Редактировать файл', img: 'settings-work-tool', type: 'customize'},
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
        {name: 'По имени', img: ''},
        {name: 'По дате добавления файла', img: ''},
        {name: 'По типу файла', img: ''},
        {name: 'По размеру', img: ''},
        {name: 'По тэгам', img: ''},
    ],
    additional: []
};

export const contextMenuCreateFile = {
    other: [
        {name: 'One Office', img: 'microsoft-oneOffice'},
    ],
    microsoft: [
        {name: 'Документ Word', img: 'word'},
        {name: 'Книга Excel', img: 'excel'},
        {name: 'Презентация PowerPoint', img: 'powerpoint'},
    ],
    google: [
        {name: 'Документ Google', img: 'google-doc'},
        {name: 'Таблица Google', img: 'google-table'},
        {name: 'Презентация Google', img: 'google-presentation'},
    ],
};

export const contextMenuProjects = {
    main: [
        {name: 'Добавить участника', img: 'add-user'},
        {name: 'Настроить доступ', img: 'perm-set'},
        {name: 'Создать папку', img: 'add-folder'},
        {name: 'Скопировать ссылку', img: 'copy-link'},
        {name: 'Переименовать', img: 'rename'},
        {name: 'Архивировать', img: 'archive'},
        {name: 'Все участники', img: 'all-users'},
        {name: 'Свойства', img: 'property', margin: true},
        {name: 'Покинуть проект', img: 'leave'},
        {name: 'Удалить проект', img: 'delete'},
    ],
    additional: []
};

export const contextMenuFolderGeneral = {
    main: [
        // {name: 'Расшарить', img: 'resend'},
        {name: 'Настроить доступ', img: 'shareFile'},
        // {name: 'Скопировать сслылку', img: 'link-4'},
        {name: 'Добавить папку', img: 'settings-work-tool'},
        {name: 'Свойства', img: 'info'},
    ],
    additional: []
};

export const contextMenuFolder = {
    main: [
        {name: 'Расшарить', img: 'resend'},
        {name: 'Настроить доступ', img: 'shareFile'},
        {name: 'Скопировать ссылку', img: 'link-4'},
        {name: 'Добавить папку', img: 'settings-work-tool'},
        {name: 'Свойства', img: 'info'},
        {name: 'Удалить папку', img: 'garbage'}
    ],
    additional: []
};

export const contextMenuSubFolder = {
    main: [
        {name: 'Расшарить', img: 'resend'},
        {name: 'Настроить доступ', img: 'shareFile'},
        {name: 'Скопировать сслылку', img: 'link-4'},
        {name: 'Свойства', img: 'info'},
        {name: 'Удалить папку', img: 'garbage'}
    ],
    additional: []
}

export const contextMenuSafeItem = {
    main: [
        {name: 'Предоставить доступ', img: 'download-blue'},
        {name: 'Редактировать', img: 'edit'},
        {name: 'Настроить', img: 'settings-work-tool'},
        {name: 'Свойства', img: 'info'},
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
        {name: 'Редактировать файл', img: 'settings-work-tool'},
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
