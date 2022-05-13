import PropTypes, { exact } from "prop-types";

export const subOptionsProps = PropTypes.arrayOf(PropTypes.exact({ name: PropTypes.string, title: PropTypes.string }));

export const subOptionProps = PropTypes.exact({
  count: PropTypes.number,
  name: PropTypes.string.isRequired,
  subOptions: subOptionsProps,
  title: PropTypes.string.isRequired
});

export const fileChatProps = PropTypes.exact({
  lastModified: PropTypes.number,
  lastModifiedDate: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.string,
  webkitRelativePath: PropTypes.string
});

const messageAttachmentProps = PropTypes.exact({
  error: PropTypes.number,
  fid: PropTypes.string,
  id: PropTypes.string,
  kind: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  tmp_name: PropTypes.string,
  type: PropTypes.string,
  id_user: PropTypes.string
});

export const messageProps = PropTypes.exact({
  attachment: PropTypes.oneOfType([messageAttachmentProps, PropTypes.array]),
  day: PropTypes.string,
  deadline: PropTypes.string,
  id: PropTypes.string,
  id_user: PropTypes.string,
  id_user_to: PropTypes.string,
  is_del: PropTypes.string,
  is_read: PropTypes.string,
  messageType: PropTypes.string,
  text: PropTypes.string,
  ut: PropTypes.string
});

export const chatItemProps = PropTypes.exact({
  deadline: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  icon: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  id_group: PropTypes.string,
  id_user: PropTypes.string,
  isGroup: PropTypes.bool,
  messages: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      id_user: PropTypes.string,
      text: PropTypes.string,
      ut: PropTypes.string
    })
  ),
  name: PropTypes.string,
  unread: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.exact({
      api_key: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      chat_theme: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      code: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      confirm: PropTypes.string,
      confirm_pass: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      date_created: PropTypes.string,
      date_last: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      email: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      fname: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      id: PropTypes.string,
      id_company: PropTypes.string,
      id_group: PropTypes.string,
      id_user: PropTypes.string,
      is_admin: PropTypes.number,
      is_online: PropTypes.number,
      lang: PropTypes.string,
      name: PropTypes.string,
      name1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      notify: PropTypes.string,
      pname: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      prim: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      r: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      safe_code: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      safe_code_ut: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      sname: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      tel: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      theme: PropTypes.string,
      udir: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      uid: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      unread: PropTypes.string
    })
  ),
  ut: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
});

export const visualEffectsProps = PropTypes.exact({
  filter: PropTypes.exact({
    blur: PropTypes.number,
    brightness: PropTypes.number,
    contrast: PropTypes.number,
    grayscale: PropTypes.number,
    hue_rotate: PropTypes.number,
    invert: PropTypes.number,
    result: PropTypes.string,
    saturate: PropTypes.number,
    sepia: PropTypes.number
  }),
  transform: PropTypes.exact({
    rotate: PropTypes.number,
    scale: PropTypes.string
  })
});

export const fileChatBoardProps = PropTypes.exact({
  error: PropTypes.number,
  fid: PropTypes.string,
  id: PropTypes.string,
  kind: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  tmp_name: PropTypes.string,
  type: PropTypes.string
});

export const mediaRecorderProps = PropTypes.exact({
  audioBitrateMode: PropTypes.string,
  audioBitsPerSecond: PropTypes.number,
  mimeType: PropTypes.string,
  ondataavailable: PropTypes.object,
  onerror: PropTypes.object,
  onpause: PropTypes.object,
  onresume: PropTypes.object,
  onstart: PropTypes.object,
  onstop: PropTypes.object,
  state: PropTypes.string,
  addEventListener: PropTypes.func,
  removeEventListener: PropTypes.func,
  stream: PropTypes.exact({
    active: PropTypes.bool,
    id: PropTypes.string,
    onactive: PropTypes.object,
    onaddtrack: PropTypes.object,
    oninactive: PropTypes.object,
    onremovetrack: PropTypes.object
  })
});
