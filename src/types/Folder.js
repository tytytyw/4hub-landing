import PropTypes from "prop-types";

// Folders

const foldersProps = PropTypes.exact({
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  deadline: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object, PropTypes.number]),
  emo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object]),
  fig: PropTypes.string,
  folders: PropTypes.arrayOf(PropTypes.object),
  is_del: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  is_lock: PropTypes.number,
  is_pass: PropTypes.number,
  name: PropTypes.string,
  path: PropTypes.string,
  tags: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
});

// Info Folder

const folderInfoProps = PropTypes.exact({
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  ctime: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  deadline: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object, PropTypes.number]),
  deny_edit: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  emo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object]),
  ext: PropTypes.string,
  fid: PropTypes.string,
  fig: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object]),
  file: PropTypes.string,
  fname: PropTypes.string,
  folders: PropTypes.arrayOf(foldersProps),
  gdir: PropTypes.string,
  is_del: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  is_dir: PropTypes.number,
  is_lock: PropTypes.number,
  is_pass: PropTypes.number,
  mtime: PropTypes.string,
  nameindb: PropTypes.string,
  opath: PropTypes.string,
  otime: PropTypes.string,
  name: PropTypes.string,
  nameRu: PropTypes.string,
  path: PropTypes.string,
  tags: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  path: PropTypes.string,
  sdir: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  size: PropTypes.number,
  size_now: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object]),
  tag2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ut: PropTypes.string
});

// Choosen Folder

export const folderProps = PropTypes.exact({
  path: PropTypes.string,
  info: folderInfoProps,
  files_amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  group: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  contextMenuFolder: PropTypes.oneOfType([PropTypes.objectOf(folderInfoProps), PropTypes.object]),
  folderWidth: PropTypes.number
});

// Project Folder

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
