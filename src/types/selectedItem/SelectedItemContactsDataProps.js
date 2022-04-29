import PropTypes from "prop-types";

export const selectedItemContactsDataProps = PropTypes.exact({
  bdate: PropTypes.string,
  company: PropTypes.string,
  date_message: PropTypes.string,
  email: PropTypes.array,
  icon: PropTypes.array,
  id: PropTypes.string,
  id_real_user: PropTypes.string,
  id_user: PropTypes.string,
  is_fav: PropTypes.string,
  is_online: PropTypes.number,
  is_user: PropTypes.number,
  mes: PropTypes.array,
  name: PropTypes.string,
  prim: PropTypes.string,
  real_user_date_gmt: PropTypes.number,
  real_user_date_last: PropTypes.string,
  sname: PropTypes.string,
  soc: PropTypes.array,
  tel: PropTypes.array,
  ut: PropTypes.string,
  is_user_q: PropTypes.any
});
