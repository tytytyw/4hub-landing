import PropTypes from "prop-types";

export const contactProps = PropTypes.exact({
  icon: PropTypes.array,
  id_user: PropTypes.string,
  user_name: PropTypes.string,
  is_online: PropTypes.number
});

export const deviceProps = PropTypes.exact({
  id: PropTypes.string,
  ip: PropTypes.string,
  adr: PropTypes.string,
  is_block: PropTypes.string,
  browser: PropTypes.string,
  country: PropTypes.string,
  platform: PropTypes.string,
  provider: PropTypes.string,
  name: PropTypes.string,
  os: PropTypes.string,
  device: PropTypes.string,
  last_visit: PropTypes.string,
  is_online: PropTypes.number
});
