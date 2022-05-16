import PropTypes from "prop-types";

export const socketProps = PropTypes.exact({
  binaryType: PropTypes.string,
  bufferedAmount: PropTypes.number,
  extensions: PropTypes.string,
  onclose: PropTypes.string,
  onerror: PropTypes.string,
  onmessage: PropTypes.string,
  onopen: PropTypes.string,
  protocol: PropTypes.string,
  readyState: PropTypes.number,
  url: PropTypes.string
});
