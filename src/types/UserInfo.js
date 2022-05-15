import PropTypes from "prop-types";

export const userInfoProps = PropTypes.exact({
  bdate: PropTypes.string,
  company: PropTypes.string,
  date_message: PropTypes.string,
  email: PropTypes.arrayOf(PropTypes.string),
  icon: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  id_real_user: PropTypes.string,
  id_company: PropTypes.string,
  id_user: PropTypes.string,
  is_fav: PropTypes.string,
  is_online: PropTypes.number,
  is_user: PropTypes.number,
  mes: PropTypes.array,
  name: PropTypes.string,
  pname: PropTypes.string,
  is_user_q: PropTypes.string,
  prim: PropTypes.string,
  real_user_date_gmt: PropTypes.number,
  real_user_date_last: PropTypes.string,
  sname: PropTypes.string,
  soc: PropTypes.arrayOf(
    PropTypes.exact({
      type: PropTypes.string,
      link: PropTypes.string
    })
  ),
  status: PropTypes.string,
  tel: PropTypes.arrayOf(PropTypes.string),
  ut: PropTypes.string
});
