export const tags = ['Фото', 'Видео', 'Музыка', 'Документы','Другое'];

export const colors = [
    {dark: '#efeeee', light: '#efeeee', color: 'grey'},
    {dark: '#c4aa8f', light: 'rgb(254, 220, 184)', color: 'rgb(254, 220, 184)', name: 'wheat'},
    {dark: '#326bc1', light: 'rgb(64, 134, 242)', color: 'rgb(64, 134, 242)', name: 'blue'},
    {dark: '#27967a', light: 'rgb(52, 198, 162)', color: 'rgb(52, 198, 162)', name: 'green'},
    {dark: '#cb8d40', light: 'rgb(249, 173, 80)', color: 'rgb(249, 173, 80)', name: 'orange'},
    {dark: '#c15862', light: 'rgb(244, 112, 125)', color: 'rgb(244, 112, 125)', name: 'pink'},
    {dark: '#792794', light: 'rgb(160, 51, 195)', color: 'rgb(160, 51, 195)', name: 'purple'},
    {dark: '#992928', light: 'rgb(194, 52, 51)', color: 'rgb(194, 52, 51)', name: 'red'},
    {dark: '#267d8d', light: 'rgb(52, 174, 196)', color: 'rgb(52, 174, 196)', name: 'aqua'},
    {dark: '#a0602a', light: 'rgb(196, 118, 151)', color: 'rgb(196, 118, 151)', name: 'brown'},
    {dark: '#40289b', light: 'rgb(81, 52, 197)', color: 'rgb(81, 52, 197)', name: 'darkblue'}
];

export const signs = ['triangle', 'circle', 'heart', 'star', 'pentagon', 'rectangle', 'notification', 'stop', 'shield-2', 'like', 'price-tag'];

export const smiles = [
    'angry', 'angry-2', 'bored', 'confused', 'cool', 'favorite', 'grinning', 'happy', 'happy-2', 'in-love', 'kissing', 'nerd',
    'quiet', 'sad', 'shocked', 'smart', 'smiling', 'surprised', 'suspicious', 'thinking', /*'tongue-out', 'unhappy'*/
];

export const contextMenuFile = {
    main: [
        {name: 'Переслать', img: 'resend'},
        {name: 'Расшарить', img: 'shareFile'},
        {name: 'Скопировать ссылку', img: 'link-4'},
        {name: 'Редактировать файл', img: 'settings-work-tool'},
        {name: 'Ред. несколько файлов', img: 'editSeveral'},
        {name: 'Переместить в ахрив', img: 'archive'},
        {name: 'Сжать в Zip', img: 'zip'},
        {name: 'Свойства', img: 'info'},
        {name: 'Загрузить', img: 'download-blue'},
        {name: 'Печать', img: 'print-2'},
        ],
    additional: [{name: 'Удалить файл', img: 'garbage'}]
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

export const contextMenuFolder = {
    main: [
        {name: 'Переслать', img: 'resend'},
        {name: 'Настроить доступ', img: 'shareFile'},
        {name: 'Скопировать сслылку', img: 'link-4'},
        {name: 'Добавить папку', img: 'settings-work-tool'},
        {name: 'Свойства', img: 'info'},
    ],
    additional: [{name: 'Удалить файл', img: 'garbage'}]
};

export const contextMenuSubFolder = {
    main: [
        {name: 'Переслать', img: 'resend'},
        {name: 'Настроить доступ', img: 'shareFile'},
        {name: 'Скопировать сслылку', img: 'link-4'},
        {name: 'Свойства', img: 'info'},
    ],
    additional: [{name: 'Удалить файл', img: 'garbage'}]
}

export const previewTypes = ['application/msword', 'application/excel'];
export const previewFormats = ['doc', 'xls', 'ppt', 'txt'];
