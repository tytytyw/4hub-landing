import PropTypes from "prop-types";

export const programItemProps = PropTypes.exact({
  icon: PropTypes.string,
  name: PropTypes.string,
  link: PropTypes.string,
  comments: PropTypes.array,
  isFavourite: PropTypes.bool
});
