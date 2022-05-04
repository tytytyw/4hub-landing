import PropTypes from "prop-types";

const folderInfoProps = PropTypes.exact({
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  ctime: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  deadline: PropTypes.any,
  deny_edit: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  emo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  ext: PropTypes.string,
  fid: PropTypes.string,
  fig: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  file: PropTypes.string,
  fname: PropTypes.string,
  folders: PropTypes.array,
  gdir: PropTypes.string,
  is_del: PropTypes.string,
  is_dir: PropTypes.number,
  is_pass: PropTypes.number,
  is_lock: PropTypes.number,
  mtime: PropTypes.string,
  name: PropTypes.string,
  nameRu: PropTypes.string,
  nameindb: PropTypes.string,
  opath: PropTypes.string,
  otime: PropTypes.string,
  path: PropTypes.string,
  sdir: PropTypes.any,
  size: PropTypes.number,
  size_now: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  tag2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  tags: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  ut: PropTypes.string
});

export const chosenFolderProps = PropTypes.exact({
  contextMenuFolder: PropTypes.any,
  files_amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  folderWidth: PropTypes.number,
  group: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  info: folderInfoProps,
  path: PropTypes.string
});
