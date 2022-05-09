import PropTypes from "prop-types";

export const socketProps = PropTypes.exact({
  binaryType: PropTypes.string,
  bufferedAmount: PropTypes.number,
  extensions: PropTypes.string,
  onclose: PropTypes.object,
  onerror: PropTypes.object,
  onmessage: PropTypes.object,
  onopen: PropTypes.object,
  protocol: PropTypes.string,
  readyState: PropTypes.number,
  url: PropTypes.string
});
