import {imageSrc} from '../../../../../../generalComponents/globalVariables';
import {projectSrc} from '../../../../../../generalComponents/globalVariables';

const registerLink = `${projectSrc}?action=register`;

export const messengersData = [
    {label: 'Email', type: 'email', icon: `${imageSrc}assets/PrivateCabinet/email.svg`},
    {label: 'SMS', type: 'tel', icon: `${imageSrc}assets/PrivateCabinet/email.svg`},
    {label: 'Viber', type: 'viber', icon: `${imageSrc}assets/PrivateCabinet/socials/viber.svg`, link: `viber://forward?text=${registerLink}`},
    {label: 'WhatsApp', type: 'whatsapp', icon: `${imageSrc}assets/PrivateCabinet/socials/whatsapp.svg`, link: `https://api.whatsapp.com/send/?text=${registerLink}`},
    {label: 'Telegram', type: 'telegram', icon: `${imageSrc}assets/PrivateCabinet/socials/telegram.svg`, link: `https://t.me/share/url?url=${registerLink}`}
]