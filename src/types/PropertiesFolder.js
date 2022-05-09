import PropTypes from "prop-types";

const infoProps = PropTypes.exact({
  name: PropTypes.string,
  path: PropTypes.string,
  is_del: PropTypes.string,
  tags: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  is_pass: PropTypes.number,
  is_lock: PropTypes.number,
  is_pass: PropTypes.number,
  deadline: PropTypes.number,
  color: PropTypes.string,
  emo: PropTypes.string,
  fig: PropTypes.string,
  folders: PropTypes.arrayOf(PropTypes.object)
});

export const propertiesFolderProps = PropTypes.exact({
  path: PropTypes.string,
  info: PropTypes.objectOf(infoProps),
  files_amount: PropTypes.string,
  group: PropTypes.object,
  contextMenuFolder: PropTypes.object,
  folderWidth: PropTypes.number
});
