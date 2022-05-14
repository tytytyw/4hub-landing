import PropTypes from "prop-types";

const messageProps = PropTypes.exact({
  id: PropTypes.string,
  id_user: PropTypes.string,
  id_user_to: PropTypes.string,
  text: PropTypes.string,
  ut: PropTypes.string,
  is_read: PropTypes.string,
  is_del: PropTypes.string,
  deadline: PropTypes.string,
  attachment: PropTypes.any,
  day: PropTypes.string,
  messageType: PropTypes.string
});

export const actionProps = PropTypes.exact({
  type: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string,
  message: messageProps,
  callback: PropTypes.func,
  chatsType: PropTypes.string
});
