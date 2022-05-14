import PropTypes from "prop-types";

export const colorType = PropTypes.exact({
  dark: PropTypes.string,
  light: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string
});
