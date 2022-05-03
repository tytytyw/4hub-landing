import PropTypes from "prop-types";

export const projectProps = PropTypes.exact({
  icon: PropTypes.string,
  id: PropTypes.string,
  id_color: PropTypes.string,
  id_emo: PropTypes.string,
  id_fig: PropTypes.string,
  id_user: PropTypes.string,
  is_archive: PropTypes.string,
  is_del: PropTypes.string,
  is_my: PropTypes.number,
  link: PropTypes.string,
  name: PropTypes.string,
  pass: PropTypes.string,
  shares: PropTypes.array,
  tags: PropTypes.string,
  token: PropTypes.string,
  ut: PropTypes.string
});
