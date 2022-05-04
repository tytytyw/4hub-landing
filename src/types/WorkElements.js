import PropTypes from "prop-types";

export const filePickProps = PropTypes.exact({
  show: PropTypes.bool,
  files: PropTypes.array,
  customize: PropTypes.bool,
  intoZip: PropTypes.bool,
});

export const filePreviewProps = PropTypes.exact({
  view: PropTypes.bool,
  file: PropTypes.any,
  create: PropTypes.bool,
});

export const fileProps = PropTypes.exact({
  adate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  color: PropTypes.string,
  ctime: PropTypes.string,
  date: PropTypes.number,
  date_archive: PropTypes.string,
  deadline: PropTypes.number,
  deny_edit: PropTypes.string,
  edit_url: PropTypes.string,
  edit_url2: PropTypes.string,
  emo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ext: PropTypes.string,
  fid: PropTypes.string,
  fig: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  file: PropTypes.string,
  file_link: PropTypes.string,
  fname: PropTypes.string,
  gdir: PropTypes.string,
  is_del: PropTypes.number,
  is_archive: PropTypes.string,
  is_dir: PropTypes.number,
  is_pass: PropTypes.number,
  is_preview: PropTypes.number,
  mime_type: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  mtime: PropTypes.string,
  name: PropTypes.string,
  nameindb: PropTypes.string,
  otime: PropTypes.string,
  preview: PropTypes.string,
  size: PropTypes.number,
  size_now: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  tag2: PropTypes.string,
});
