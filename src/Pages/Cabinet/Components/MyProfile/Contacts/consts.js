import { imageSrc } from "../../../../../generalComponents/globalVariables";

export const socialsIcons = {
  facebook: `${imageSrc}assets/PrivateCabinet/socials/facebook.svg`,
  twitter: `${imageSrc}assets/PrivateCabinet/socials/twitter.svg`,
  linkedin: `${imageSrc}assets/PrivateCabinet/socials/linkedin.svg`,
  skype: `${imageSrc}assets/PrivateCabinet/socials/skype-2.svg`,
  instagram: `${imageSrc}assets/PrivateCabinet/socials/instagram.svg`,
  vk: `${imageSrc}assets/PrivateCabinet/socials/vk.svg`,
};

export const messengersIcons = {
  //email: `${imageSrc}assets/PrivateCabinet/socials/email.svg`,
  viber: `${imageSrc}assets/PrivateCabinet/socials/viber.svg`,
  whatsapp: `${imageSrc}assets/PrivateCabinet/socials/whatsapp.svg`,
  telegram: `${imageSrc}assets/PrivateCabinet/socials/telegram.svg`,
  skype: `${imageSrc}assets/PrivateCabinet/socials/skype-2.svg`,
  slack: `${imageSrc}assets/PrivateCabinet/socials/slack.svg`,
};

export const socialsData = [
  {
    label: "Twitter",
    type: "twitter",
    icon: `${imageSrc}assets/PrivateCabinet/socials/twitter.svg`,
  },
  {
    label: "Linkedin",
    type: "linkedin",
    icon: `${imageSrc}assets/PrivateCabinet/socials/linkedin.svg`,
  },
  {
    label: "Facebook",
    type: "facebook",
    icon: `${imageSrc}assets/PrivateCabinet/socials/facebook.svg`,
  },
  {
    label: "Skype",
    type: "skype",
    icon: `${imageSrc}assets/PrivateCabinet/socials/skype-2.svg`,
  },
  {
    label: "Instagram",
    type: "instagram",
    icon: `${imageSrc}assets/PrivateCabinet/socials/instagram.svg`,
  },
  {
    label: "VK",
    type: "vk",
    icon: `${imageSrc}assets/PrivateCabinet/socials/vk.svg`,
  },
];

export const titlesSoc = {
  telegram: "Telegram",
  viber: "Viber",
  whatsapp: "WhatsApp",
  skype: "Skype",
  slack: "Slack",
};

export const messengersData = [
  {
    label: "Viber",
    type: "viber",
    icon: `${imageSrc}assets/PrivateCabinet/socials/viber.svg`,
  },
  {
    label: "WhatsApp",
    type: "whatsapp",
    icon: `${imageSrc}assets/PrivateCabinet/socials/whatsapp.svg`,
  },
  {
    label: "Telegram",
    type: "telegram",
    icon: `${imageSrc}assets/PrivateCabinet/socials/telegram.svg`,
  },
  {
    label: "Skype",
    type: "skype",
    icon: `${imageSrc}assets/PrivateCabinet/socials/skype-2.svg`,
  },
  {
    label: "Slack",
    type: "slack",
    icon: `${imageSrc}assets/PrivateCabinet/socials/slack.svg`,
  },
];

export const emptyProfileImage = `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`;

export const getContactName = (contact) => {
  return `${contact?.name?.trim() || ""} ${contact?.sname.trim() || ""}`;
};
