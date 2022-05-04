import PropTypes from "prop-types";

export const contactProps = PropTypes.exact({
  icon: PropTypes.array,
  id_user: PropTypes.string,
  user_name: PropTypes.string,
  is_online: PropTypes.number,
});
