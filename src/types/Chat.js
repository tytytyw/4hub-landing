import PropTypes from "prop-types";

export const subOptionsProps = PropTypes.arrayOf(
  PropTypes.exact({
    name: PropTypes.string,
    title: PropTypes.string,
    id_group: PropTypes.string,
    id_user: PropTypes.string,
    is_del: PropTypes.string,
    is_read: PropTypes.string
  })
);

export const subOptionProps = PropTypes.exact({
  count: PropTypes.number,
  name: PropTypes.string.isRequired,
  subOptions: subOptionsProps,
  title: PropTypes.string.isRequired
});

export const message = PropTypes.exact({
  F: PropTypes.string,
  day: PropTypes.string,
  deadline: PropTypes.string,
  id: PropTypes.string,
  id_group: PropTypes.string,
  id_user: PropTypes.string,
  is_del: PropTypes.string,
  is_read: PropTypes.string,
  text: PropTypes.string,
  ut: PropTypes.string
});

export const contact = PropTypes.exact({
  company: PropTypes.string,
  id_company: PropTypes.string,
  date_message: PropTypes.string,
  email: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  icon: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  id_real_user: PropTypes.string,
  id_user: PropTypes.string,
  mes: PropTypes.arrayOf(PropTypes.string),
  is_fav: PropTypes.string,
  is_online: PropTypes.number,
  is_user: PropTypes.number,
  bdate: PropTypes.string,
  name: PropTypes.string,
  prim: PropTypes.string,
  real_user_date_gmt: PropTypes.number,
  real_user_date_last: PropTypes.string,
  sname: PropTypes.string,
  fname: PropTypes.string,
  soc: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  tel: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  ut: PropTypes.string,
  status: PropTypes.string,
  id_group: PropTypes.string,
  is_admin: PropTypes.number,
  api_key: PropTypes.string,
  chat_theme: PropTypes.string,
  code: PropTypes.string,
  theme: PropTypes.string,
  confirm: PropTypes.string,
  confirm_pass: PropTypes.string,
  date_created: PropTypes.string,
  date_last: PropTypes.string,
  lang: PropTypes.string,
  name1: PropTypes.string,
  notify: PropTypes.string,
  pname: PropTypes.string,
  r: PropTypes.string,
  safe_code: PropTypes.string,
  safe_code_ut: PropTypes.string,
  udir: PropTypes.string,
  uid: PropTypes.string,
  unread: PropTypes.string,
  deadline: PropTypes.string,
  isGroup: PropTypes.bool,
  is_secret_chat: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.object),
  messages: PropTypes.arrayOf(message)
});
