import PropTypes from "prop-types";

const infoInfoProps = PropTypes.exact({
  color: PropTypes.bool,
  deadline: PropTypes.number,
  emo: PropTypes.bool,
  fig: PropTypes.bool,
  is_lock: PropTypes.number,
  is_pass: PropTypes.number,
  name: PropTypes.string,
  nameRu: PropTypes.string,
  path: PropTypes.string,
  tags: PropTypes.bool,
  ut: PropTypes.string
});

export const infoProps = PropTypes.exact({
  contextMenuFolder: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  files_amount: PropTypes.string,
  folderWidth: PropTypes.number,
  group: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  info: infoInfoProps,
  path: PropTypes.string
});
