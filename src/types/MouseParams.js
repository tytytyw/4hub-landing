import PropTypes from "prop-types";

const attachmentProps = PropTypes.exact({
  name: PropTypes.string,
  type: PropTypes.string,
  tmp_name: PropTypes.string,
  error: PropTypes.number,
  size: PropTypes.number,
  link: PropTypes.string,
  fid: PropTypes.string,
  id: PropTypes.string,
  kind: PropTypes.string
});

const messageProps = PropTypes.exact({
  id: PropTypes.string,
  id_user: PropTypes.string,
  id_user_to: PropTypes.string,
  text: PropTypes.string,
  ut: PropTypes.string,
  is_read: PropTypes.string,
  is_del: PropTypes.string,
  deadline: PropTypes.string,
  isNewMessage: PropTypes.bool,
  attachment: PropTypes.arrayOf(attachmentProps),
  day: PropTypes.string,
  messageType: PropTypes.string
});

export const mouseParamsProps = PropTypes.exact({
  contextMenuList: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  type: PropTypes.string,
  message: messageProps
});
