import {imageSrc} from '../../../../generalComponents/globalVariables';

// export const categories = {
//     1: 'Все',
//     2: 'Творчество',
//     3: 'Программы',
//     4: 'Мессенджеры',
//     5: 'Офис',
//     6: 'Развлечения',
//     7: 'Другое',
// }

export const programIcons = {
    premier_pro: `${imageSrc}assets/PrivateCabinet/premier.svg`,
    adobe_xd: `${imageSrc}assets/PrivateCabinet/adobe-3.svg`,
    slack: `${imageSrc}assets/PrivateCabinet/slack.svg`,
    skype: `${imageSrc}assets/PrivateCabinet/skype.svg`,
    media_encoder: `${imageSrc}assets/PrivateCabinet/media-encoder.svg`,
    chrome: `${imageSrc}assets/PrivateCabinet/google-chrome.svg`,
}

export const categoryIcons = {
    all: `${imageSrc}assets/PrivateCabinet/rocket.svg`,
    art: `${imageSrc}assets/PrivateCabinet/brush.svg`,
    programs: `${imageSrc}assets/PrivateCabinet/computer.svg`,
    messengers: `${imageSrc}assets/PrivateCabinet/facebook-2.svg`,
    office: `${imageSrc}assets/PrivateCabinet/folder-simple.svg`,
    games: `${imageSrc}assets/PrivateCabinet/games.svg`,
    other: `${imageSrc}assets/PrivateCabinet/puzzle.svg`,
}

export const categories = {
    'Office': {
        id: 1,
        image: `${imageSrc}assets/PrivateCabinet/programs/office.svg`,
        list: [
            {
                name: '1C',
                icon: `${imageSrc}assets/PrivateCabinet/programs/1c.png`,
                link: 'http://1c.ua/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'LigaZakon',
                icon: `${imageSrc}assets/PrivateCabinet/programs/liga-zakon.svg`,
                link: 'https://www.ligazakon.ua/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'AirMail',
                icon: `${imageSrc}assets/PrivateCabinet/programs/airmail.png`,
                link: 'https://airmailapp.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'The Bat',
                icon: `${imageSrc}assets/PrivateCabinet/programs/bat.png`,
                link: 'https://www.ritlabs.com/en/products/thebat/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Mind Manager',
                icon: `${imageSrc}assets/PrivateCabinet/programs/mind-manager.png`,
                link: 'https://www.mindmanager.com/en',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Microsoft Office',
                icon: `${imageSrc}assets/PrivateCabinet/programs/microsoft-office.png`,
                link: 'https://www.microsoft.com/en-us',
                isFavourite: false,
                comments: []
            },
            {
                name: 'ABBYY FineReader',
                icon: `${imageSrc}assets/PrivateCabinet/programs/abby.png`,
                link: 'https://pdf.abbyy.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'WinScan2PDF',
                icon: `${imageSrc}assets/PrivateCabinet/more.svg`,
                link: 'https://winscan2pdf.com/',
                isFavourite: false,
                comments: []
            },
        ]
    },
    'Adobe': {
        id: 2,
        image: `${imageSrc}assets/PrivateCabinet/programs/adobe_icon.svg`,
        list: [
            {
                name: 'Adobe Photoshop',
                icon: `${imageSrc}assets/PrivateCabinet/programs/adobe/photoshop.svg`,
                link: 'https://www.adobe.com/products/photoshop.html',
                isFavourite: true,
                comments: [
                    {
                        from: 'Max Kortelov',
                        date: '01.01.2022',
                        icon: `${imageSrc}assets/PrivateCabinet/avatars/a1.svg`,
                        text: 'Some test Comments'
                    },
                    {
                        from: 'Alexey',
                        date: '03.01.2022',
                        icon: `${imageSrc}assets/PrivateCabinet/avatars/a2.svg`,
                        text: 'большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков'
                    },
                    {
                        from: 'Dmitriy Kolesnikov',
                        date: '03.02.2022',
                        icon: `${imageSrc}assets/PrivateCabinet/avatars/a3.svg`,
                        text: 'Some test Comments'
                    },
                    {
                        from: 'Makar Razumovskiy',
                        date: '03.02.2022',
                        icon: `${imageSrc}assets/PrivateCabinet/avatars/a4.svg`,
                        text: 'Some test Comments'
                    },
                ]
            },
            {
                name: 'Adobe Illustrator',
                icon: `${imageSrc}assets/PrivateCabinet/programs/adobe/illustrator.svg`,
                link: 'https://www.adobe.com/products/illustrator.html',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Adobe Procriete',
                icon: `${imageSrc}assets/PrivateCabinet/programs/adobe/procriete.svg`,
                link: 'https://fs2.mh.net.ua',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Adobe Xd',
                icon: `${imageSrc}assets/PrivateCabinet/programs/adobe/xd.svg`,
                link: 'https://www.adobe.com/products/xd.html',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Adobe Acrobat',
                icon: `${imageSrc}assets/PrivateCabinet/programs/adobe-acrobat.png`,
                link: 'https://www.adobe.com/acrobat.html',
                isFavourite: false,
                comments: []
            },
        ]
    },
    'Программирование': {
        id: 3,
        image: `${imageSrc}assets/PrivateCabinet/programs/responsive.svg`,
        list: [
            {
                name: 'JetBrains',
                icon: `${imageSrc}assets/PrivateCabinet/programs/jetbrains.svg`,
                link: 'https://www.jetbrains.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Coda',
                icon: `${imageSrc}assets/PrivateCabinet/programs/coda-io.png`,
                link: 'https://coda.io/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'DreamWeaver CS3',
                icon: `${imageSrc}assets/PrivateCabinet/programs/adobe-dreamweaver-cc.png`,
                link: 'https://www.adobe.com/products/dreamweaver.html',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Orange Pl PC',
                icon: `${imageSrc}assets/PrivateCabinet/programs/orange.png`,
                link: 'https://fs2.mh.net.ua',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Visual Studio',
                icon: `${imageSrc}assets/PrivateCabinet/programs/visual-studio.png`,
                link: 'https://visualstudio.microsoft.com/ru/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'PHP',
                icon: `${imageSrc}assets/PrivateCabinet/programs/php.png`,
                link: 'https://www.php.net/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Node.js',
                icon: `${imageSrc}assets/PrivateCabinet/programs/nodejs.png`,
                link: 'https://nodejs.org/en/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Python',
                icon: `${imageSrc}assets/PrivateCabinet/programs/python.png`,
                link: 'https://www.python.org/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Go',
                icon: `${imageSrc}assets/PrivateCabinet/programs/golang.png`,
                link: 'https://go.dev/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Advanced Outlook Repair',
                icon: `${imageSrc}assets/PrivateCabinet/programs/microsoft-outlook.png`,
                link: 'https://www.sysinfotools.com/advanced-outlook-recovery.html',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Disk Drill',
                icon: `${imageSrc}assets/PrivateCabinet/programs/disk-drill.webp`,
                link: 'https://www.disk-drill.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Easy Recovery',
                icon: `${imageSrc}assets/PrivateCabinet/more.svg`,
                link: 'https://fs2.mh.net.ua',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Partition Table Doctor',
                icon: `${imageSrc}assets/PrivateCabinet/more.svg`,
                link: 'https://www.easeus.com/data-recovery-software/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Windows',
                icon: `${imageSrc}assets/PrivateCabinet/programs/windows.png`,
                link: 'https://support.microsoft.com/ru-ru/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Linux',
                icon: `${imageSrc}assets/PrivateCabinet/programs/linux.svg`,
                link: 'https://www.linux.org/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Docker',
                icon: `${imageSrc}assets/PrivateCabinet/programs/docker.svg`,
                link: 'https://www.docker.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Crystal Disk Mark',
                icon: `${imageSrc}assets/PrivateCabinet/more.svg`,
                link: 'https://crystalmark.info/en/software/crystaldiskmark/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Everest',
                icon: `${imageSrc}assets/PrivateCabinet/programs/everest-group-research.svg`,
                link: 'https://fs2.mh.net.ua',
                isFavourite: false,
                comments: []
            },
            {
                name: 'HDD Life',
                icon: `${imageSrc}assets/PrivateCabinet/programs/hdd.svg`,
                link: 'https://hddlife.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'USB Network Gate',
                icon: `${imageSrc}assets/PrivateCabinet/programs/usb-universal.png`,
                link: 'https://www.usb-over-network.org/usb-network-gate/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'USB Over Network',
                icon: `${imageSrc}assets/PrivateCabinet/programs/usb-universal.png`,
                link: 'https://fs2.mh.net.ua',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Microsoft Network Monitor',
                icon: `${imageSrc}assets/PrivateCabinet/programs/prtg-network-monitor.png`,
                link: 'https://www.microsoft.com/en-us/download/details.aspx?id=4865',
                isFavourite: false,
                comments: []
            },
            {
                name: 'TeamViewer',
                icon: `${imageSrc}assets/PrivateCabinet/programs/teamviewer.png`,
                link: 'https://www.teamviewer.com/ru/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Ports',
                icon: `${imageSrc}assets/PrivateCabinet/programs/global-ports.png`,
                link: 'https://fs2.mh.net.ua',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Screw Drivers',
                icon: `${imageSrc}assets/PrivateCabinet/more.svg`,
                link: 'https://fs2.mh.net.ua',
                isFavourite: false,
                comments: []
            },
            {
                name: 'MSSQL',
                icon: `${imageSrc}assets/PrivateCabinet/programs/microsoft-sql.svg`,
                link: 'https://www.microsoft.com/en-us/sql-server/sql-server-downloads',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Navi Cat',
                icon: `${imageSrc}assets/PrivateCabinet/programs/navicat.png`,
                link: 'https://navicat.com/en',
                isFavourite: false,
                comments: []
            },
            {
                name: 'TrueCrypt',
                icon: `${imageSrc}assets/PrivateCabinet/programs/truecrypt-faenza.png`,
                link: 'https://fs2.mh.net.ua',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Avast',
                icon: `${imageSrc}assets/PrivateCabinet/programs/avast.png`,
                link: 'https://www.avast.com/index#pc',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Kaspersky',
                icon: `${imageSrc}assets/PrivateCabinet/programs/kaspersky.png`,
                link: 'https://www.kaspersky.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'NOD32',
                icon: `${imageSrc}assets/PrivateCabinet/programs/eset.png`,
                link: 'https://www.eset.com/uk/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'WinRAR',
                icon: `${imageSrc}assets/PrivateCabinet/programs/winrar.png`,
                link: 'https://www.win-rar.com/start.html?&L=4',
                isFavourite: false,
                comments: []
            },
            {
                name: '7Zip',
                icon: `${imageSrc}assets/PrivateCabinet/programs/7zip.png`,
                link: 'https://www.7-zip.org/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'UExtractor',
                icon: `${imageSrc}assets/PrivateCabinet/programs/iphone-backup-extractor.webp`,
                link: 'https://chrome.google.com/webstore/detail/universal-extractor-downl/pofafboibjkfombpgmfaeepeehfcfahm',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Acronis Disk Director',
                icon: `${imageSrc}assets/PrivateCabinet/programs/acronis.png`,
                link: 'https://www.acronis.com/en-eu/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Chrome',
                icon: `${imageSrc}assets/PrivateCabinet/programs/google-chrome.png`,
                link: 'https://www.google.com/chrome/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'FireFox',
                icon: `${imageSrc}assets/PrivateCabinet/programs/mozilla-firefox.png`,
                link: 'https://www.mozilla.org/ru/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Opera',
                icon: `${imageSrc}assets/PrivateCabinet/programs/opera.png`,
                link: 'https://www.opera.com/ru',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Safari',
                icon: `${imageSrc}assets/PrivateCabinet/programs/safari.png`,
                link: 'https://www.apple.com/safari/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Ultra ISO',
                icon: `${imageSrc}assets/PrivateCabinet/programs/iso.png`,
                link: 'https://www.ultraiso.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Virtual Clone Drive',
                icon: `${imageSrc}assets/PrivateCabinet/programs/virtual-clone.png`,
                link: 'https://redfox.bz/virtual-clonedrive.html',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Nero',
                icon: `${imageSrc}assets/PrivateCabinet/programs/nero.png`,
                link: 'https://www.nero.com/rus/index.php?vlang=us',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Skype',
                icon: `${imageSrc}assets/PrivateCabinet/programs/skype.png`,
                link: 'https://www.skype.com/en/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Telegram',
                icon: `${imageSrc}assets/PrivateCabinet/programs/telegram.png`,
                link: 'https://web.telegram.org/k/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Discord',
                icon: `${imageSrc}assets/PrivateCabinet/programs/discord.png`,
                link: 'https://discord.com/',
                isFavourite: false,
                comments: []
            },
        ]
    },
    'Арт': {
        id: 4,
        image: `${imageSrc}assets/PrivateCabinet/programs/palette.svg`,
        list: [
            {
                name: 'Rebelle',
                icon: `${imageSrc}assets/PrivateCabinet/programs/rebel-alliance.svg`,
                link: 'https://www.escapemotions.com/products/rebelle/about',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Procreate',
                icon: `${imageSrc}assets/PrivateCabinet/programs/procreate.png`,
                link: 'https://procreate.art/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Clip Studio Paint Pro',
                icon: `${imageSrc}assets/PrivateCabinet/programs/clip-studio.png`,
                link: 'https://www.clipstudio.net/en/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Artweaver',
                icon: `${imageSrc}assets/PrivateCabinet/more.svg`,
                link: 'https://www.artweaver.de/en',
                isFavourite: false,
                comments: []
            },
            {
                name: 'ArtRage',
                icon: `${imageSrc}assets/PrivateCabinet/programs/artrage.png`,
                link: 'https://www.artrage.com/',
                isFavourite: false,
                comments: []
            },
        ]
    },
    'Музыкальные программы': {
        id: 5,
        image: `${imageSrc}assets/PrivateCabinet/programs/music_icon.svg`,
        list: [
            {
                name: 'AIMP',
                icon: `${imageSrc}assets/PrivateCabinet/programs/aimp.png`,
                link: 'https://www.aimp.ru/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'KMPPlayer',
                icon: `${imageSrc}assets/PrivateCabinet/programs/kmplayer.png`,
                link: 'https://www.kmplayer.com/home',
                isFavourite: false,
                comments: []
            },
        ]
    },
    'Медиа': {
        id: 6,
        image: `${imageSrc}assets/PrivateCabinet/programs/digital_campaign.svg`,
        list: [
            {
                name: 'ABBYY FineReader',
                icon: `${imageSrc}assets/PrivateCabinet/programs/abby.png`,
                link: 'https://pdf.abbyy.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: '3ds Max',
                icon: `${imageSrc}assets/PrivateCabinet/programs/3ds-max.png`,
                link: 'https://www.autodesk.com/products/3ds-max/overview?term=1-YEAR&tab=subscription',
                isFavourite: false,
                comments: []
            },
            {
                name: 'ArchiCad',
                icon: `${imageSrc}assets/PrivateCabinet/programs/archicad.png`,
                link: 'https://graphisoft.com/solutions/archicad',
                isFavourite: false,
                comments: []
            },
            {
                name: 'AutoDesk AutoCad',
                icon: `${imageSrc}assets/PrivateCabinet/programs/autocad.png`,
                link: 'https://www.autodesk.com/products/autocad/overview',
                isFavourite: false,
                comments: []
            },
            {
                name: 'CoralDraw Graphics Suite',
                icon: `${imageSrc}assets/PrivateCabinet/more.svg`,
                link: 'https://find-your-software.com/corel/coreldraw-2021/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Sketch',
                icon: `${imageSrc}assets/PrivateCabinet/programs/sketch.png`,
                link: 'https://www.sketch.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'PDF XChange Editor',
                icon: `${imageSrc}assets/PrivateCabinet/programs/box-version-pdf.png`,
                link: 'https://www.tracker-software.com/product/pdf-xchange-viewer',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Boom',
                icon: `${imageSrc}assets/PrivateCabinet/programs/boom-technology.png`,
                link: 'https://boom.ru/',
                isFavourite: false,
                comments: []
            },
        ]
    },
    'Статистика': {
        id: 7,
        image: `${imageSrc}assets/PrivateCabinet/programs/seo.svg`,
        list: [
            {
                name: 'SPSS',
                icon: `${imageSrc}assets/PrivateCabinet/programs/spss.png`,
                link: 'https://www.ibm.com/analytics/spss-statistics-software',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Stata',
                icon: `${imageSrc}assets/PrivateCabinet/programs/state.png`,
                link: 'https://www.stata.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'SAS',
                icon: `${imageSrc}assets/PrivateCabinet/more.svg`,
                link: 'https://www.sas.com/ru_ru/home.html',
                isFavourite: false,
                comments: []
            },
            {
                name: 'MATLAB',
                icon: `${imageSrc}assets/PrivateCabinet/programs/matlab.png`,
                link: 'https://www.mathworks.com/products/matlab.html',
                isFavourite: false,
                comments: []
            },
            {
                name: 'JMP',
                icon: `${imageSrc}assets/PrivateCabinet/programs/jmp.png`,
                link: 'https://www.jmp.com/en_us/home.html',
                isFavourite: false,
                comments: []
            },
        ]
    },
    'Обучающие': {
        id: 8,
        image: `${imageSrc}assets/PrivateCabinet/programs/alphabet_icon.svg`,
        list: [
            {
                name: 'Scholastic Learn at Home',
                icon: `${imageSrc}assets/PrivateCabinet/programs/scholastic.png`,
                link: 'https://export.scholastic.com/en',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Brainly',
                icon: `${imageSrc}assets/PrivateCabinet/programs/brainly.png`,
                link: 'https://brainly.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'BrainPop',
                icon: `${imageSrc}assets/PrivateCabinet/programs/brainpro.png`,
                link: 'https://www.brainpop.com/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Twinkl',
                icon: `${imageSrc}assets/PrivateCabinet/programs/twinkl.jpg`,
                link: 'https://www.twinkl.gr/',
                isFavourite: false,
                comments: []
            },
            {
                name: 'Sumdog',
                icon: `${imageSrc}assets/PrivateCabinet/programs/ixl-icon-sumdog.png`,
                link: 'https://www.sumdog.com/en/',
                isFavourite: false,
                comments: []
            },
        ]
    },
}