import PropTypes from "prop-types";

export const socketProps = PropTypes.exact({
  binaryType: PropTypes.string,
  bufferedAmount: PropTypes.number,
  extensions: PropTypes.string,
  onclose: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onerror: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onmessage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onopen: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  protocol: PropTypes.string,
  readyState: PropTypes.number,
  url: PropTypes.string
});
