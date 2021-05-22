export const socialsIcons = {
    facebook: './assets/PrivateCabinet/socials/facebook.svg',
    whatsapp: './assets/PrivateCabinet/socials/whatsapp.svg',
    twitter: './assets/PrivateCabinet/socials/twitter.svg',
    skype: './assets/PrivateCabinet/socials/skype-2.svg',
    viber: './assets/PrivateCabinet/socials/viber.svg',
    linkedin: './assets/PrivateCabinet/socials/linkedin.svg',
    telegram: './assets/PrivateCabinet/socials/telegram.svg',
    brain: './assets/PrivateCabinet/socials/brain.svg',
    instagram: './assets/PrivateCabinet/socials/instagram.svg',
    vk: './assets/PrivateCabinet/socials/vk.svg',
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

export const emptyProfileImage = './assets/PrivateCabinet/profile-noPhoto.svg'

export const getContactName = (contact) => {
    return `${contact?.name || ''} ${contact?.sname || ''}`
}