import PropTypes from "prop-types";

export const mailProps = PropTypes.exact({
  from: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.number,
  isRead: PropTypes.bool
});
