import PropTypes from "prop-types";

export const projectFolderStructure = PropTypes.exact({
  icon: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  color: PropTypes.string,
  is_pass: PropTypes.number,
  tags: PropTypes.string,
  emo: PropTypes.string,
  fig: PropTypes.string,
  is_del: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  is_lock: PropTypes.number,
  is_pass: PropTypes.number,
  deadline: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  project_folders: PropTypes.array
});

export const projectFolderEditProps = PropTypes.exact({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.string,
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
