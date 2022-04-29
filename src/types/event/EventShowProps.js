import PropTypes from "prop-types";

export const eventShowProps = PropTypes.exact({
  name: PropTypes.string,
  term: PropTypes.string,
  tag: PropTypes.string,
  sender: PropTypes.string,
  avatar: PropTypes.string,
  ctime: PropTypes.string,
  date: PropTypes.object,
  type: PropTypes.number
});
