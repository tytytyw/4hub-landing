import PropTypes from "prop-types";

const blobFileProps = PropTypes.exact({
  name: PropTypes.string,
  size: PropTypes.number,
  fid: PropTypes.string,
});

const blobOptionProps = PropTypes.exact({
  destination: PropTypes.string,
  dir: PropTypes.string,
  filePath: PropTypes.string,
  id_project: PropTypes.string,
});

export const blobProps = PropTypes.exact({
  file: blobFileProps,
  options: blobOptionProps,
});

export const createFilesProps = PropTypes.exact({
  open: PropTypes.bool,
  path: PropTypes.string,
  subPath: PropTypes.string,
});
