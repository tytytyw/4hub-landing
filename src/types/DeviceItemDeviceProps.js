import PropTypes from "prop-types";

export const deviceItemDeviceProps = PropTypes.exact({
  adr: PropTypes.string,
  browser: PropTypes.string,
  country: PropTypes.string,
  device: PropTypes.string,
  id: PropTypes.string,
  ip: PropTypes.string,
  is_block: PropTypes.string,
  is_online: PropTypes.number,
  last_visit: PropTypes.string,
  name: PropTypes.string,
  os: PropTypes.string,
  platform: PropTypes.string,
  provider: PropTypes.string
});
