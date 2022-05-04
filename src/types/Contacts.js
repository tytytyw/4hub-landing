import PropTypes from "prop-types";

export const selectedItemProps = PropTypes.exact({
  id: PropTypes.string,
  name: PropTypes.string,
  tel: PropTypes.array,
  email: PropTypes.array,
  id_user: PropTypes.string,
  is_fav: PropTypes.string,
  soc: PropTypes.array,
  sname: PropTypes.string,
  pname: PropTypes.string,
  mes: PropTypes.array,
  icon: PropTypes.array,
  bdate: PropTypes.string,
  company: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  prim: PropTypes.string,
  ut: PropTypes.string,
  id_company: PropTypes.string,
  id_real_user: PropTypes.string,
  date_message: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  is_user: PropTypes.number,
  is_user_q: PropTypes.string,
  is_online: PropTypes.number,
  real_user_date_gmt: PropTypes.number,
  real_user_date_last: PropTypes.string
});
