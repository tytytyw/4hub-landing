import PropTypes from "prop-types";

export const eventsProps = PropTypes.exact({
  avatar: PropTypes.string,
  ctime: PropTypes.string,
  date: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  sender: PropTypes.string,
  tag: PropTypes.string,
  term: PropTypes.string,
  type: PropTypes.number
});
