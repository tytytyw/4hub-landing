import PropTypes from "prop-types";

export const filePickProps = PropTypes.exact({
  show: PropTypes.bool,
  files: PropTypes.array,
  intoZip: PropTypes.bool
});
