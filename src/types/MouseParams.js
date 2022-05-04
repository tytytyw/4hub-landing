import PropTypes from "prop-types";

export const mouseParamsProps = PropTypes.exact({
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  type: PropTypes.string,
});
