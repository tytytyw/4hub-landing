import PropTypes from "prop-types";

export const fileAddCustomizationProps = PropTypes.exact({
  file: PropTypes.object,
  files: PropTypes.array,
  several: PropTypes.bool,
  show: PropTypes.bool,
  create: PropTypes.bool,
  options: PropTypes.object
});
