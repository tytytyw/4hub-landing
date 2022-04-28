import PropTypes from "prop-types";

const initFolderInfoProps = PropTypes.exact({
  folders: PropTypes.array,
  name: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  deadline: PropTypes.number,
  emo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  fig: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  is_lock: PropTypes.number,
  is_pass: PropTypes.number,
  nameRu: PropTypes.string,
  path: PropTypes.string,
  tags: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  ut: PropTypes.string
});

export const initFolderProps = PropTypes.exact({
  contextMenuFolder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  files_amount: PropTypes.string,
  folderWidth: PropTypes.number,
  group: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  info: initFolderInfoProps,
  path: PropTypes.string
});
