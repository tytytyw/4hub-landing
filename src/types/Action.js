import PropTypes from "prop-types";

export const actionProps = PropTypes.exact({
  type: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string,
  message: PropTypes.object
});
