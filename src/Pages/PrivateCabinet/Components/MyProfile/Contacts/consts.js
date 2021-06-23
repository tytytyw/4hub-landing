export const socialsIcons = {
    facebook: './assets/PrivateCabinet/socials/facebook.svg',
    twitter: './assets/PrivateCabinet/socials/twitter.svg',
    linkedin: './assets/PrivateCabinet/socials/linkedin.svg',
    skype: './assets/PrivateCabinet/socials/skype-2.svg',
    instagram: './assets/PrivateCabinet/socials/instagram.svg',
    vk: './assets/PrivateCabinet/socials/vk.svg',
}

export const messengersIcons = {
    //email: './assets/PrivateCabinet/socials/email.svg',
    viber: './assets/PrivateCabinet/socials/viber.svg',
    whatsapp: './assets/PrivateCabinet/socials/whatsapp.svg',
    telegram: './assets/PrivateCabinet/socials/telegram.svg',
    skype: './assets/PrivateCabinet/socials/skype-2.svg',
    slack: './assets/PrivateCabinet/socials/slack.svg',
}

export const socialsData = [
    {
        label: 'Twitter',
        type: 'twitter',
        icon: './assets/PrivateCabinet/socials/twitter.svg'
    },
    {
        label: 'Linkedin',
        type: 'linkedin',
        icon: './assets/PrivateCabinet/socials/linkedin.svg',
    },
    {
        label: 'Facebook',
        type: 'facebook',
        icon: './assets/PrivateCabinet/socials/facebook.svg',
    },
    {
        label: 'Skype',
        type: 'skype',
        icon: './assets/PrivateCabinet/socials/skype-2.svg',
    },
    {
        label: 'Instagram',
        type: 'instagram',
        icon: './assets/PrivateCabinet/socials/instagram.svg',
    },
    {
        label: 'VK',
        type: 'vk',
        icon: './assets/PrivateCabinet/socials/vk.svg',
    },
]

export const titlesSoc = {
    telegram: 'Telegram',
    viber: 'Viber',
    whatsapp: 'WhatsApp',
    skype: 'Skype',
    slack: 'Slack',
}

export const messengersData = [
    {
        label: 'Viber',
        type: 'viber',
        icon: './assets/PrivateCabinet/socials/viber.svg'
    },
    {
        label: 'WhatsApp',
        type: 'whatsapp',
        icon: './assets/PrivateCabinet/socials/whatsapp.svg',
    },
    {
        label: 'Telegram',
        type: 'telegram',
        icon: './assets/PrivateCabinet/socials/telegram.svg',
    },
    {
        label: 'Skype',
        type: 'skype',
        icon: './assets/PrivateCabinet/socials/skype-2.svg',
    },
    {
        label: 'Slack',
        type: 'slack',
        icon: './assets/PrivateCabinet/socials/slack.svg',
    },
]

export const emptyProfileImage = './assets/PrivateCabinet/profile-noPhoto.svg'

export const getContactName = (contact) => {
    return `${contact?.name?.trim() || ''} ${contact?.sname.trim() || ''}`
}