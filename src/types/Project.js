import PropTypes from "prop-types";

export const projectFolderStructure = PropTypes.exact({
  name: PropTypes.string,
  id: PropTypes.number,
  color: PropTypes.string,
  is_pass: PropTypes.number,
  tags: PropTypes.string,
  emo: PropTypes.string,
  fig: PropTypes.string,
  is_del: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  is_lock: PropTypes.number,
  deadline: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  project_folders: PropTypes.array
});
