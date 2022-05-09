import PropTypes from "prop-types";

export const callbackArrMain = PropTypes.exact({
  type: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  callback: PropTypes.func
});
