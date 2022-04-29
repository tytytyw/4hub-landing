import PropTypes from "prop-types";

export const calendarPageTaskProps = PropTypes.exact({
  type: PropTypes.number,
  name: PropTypes.string,
  term: PropTypes.string,
  tag: PropTypes.string,
  sender: PropTypes.string,
  ctime: PropTypes.string,
  avatar: PropTypes.string
});
