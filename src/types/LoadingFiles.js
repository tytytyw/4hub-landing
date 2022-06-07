import PropTypes from "prop-types";

export const loadingFileProps = PropTypes.exact({
  file: PropTypes.exact({
    lastModified: PropTypes.number,
    lastModifiedDate: PropTypes.object,
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
    webkitRelativePath: PropTypes.string
  }),
  options: PropTypes.exact({
    destination: PropTypes.string,
    dir: PropTypes.string,
    filePath: PropTypes.string,
    id_project: PropTypes.string
  })
});

export const awaitingFilesProps = PropTypes.exact({
  file: PropTypes.exact({
    lastModified: PropTypes.number,
    lastModifiedDate: PropTypes.object,
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
    webkitRelativePath: PropTypes.string
  }),
  options: PropTypes.exact({
    destination: PropTypes.string,
    dir: PropTypes.string,
    filePath: PropTypes.string,
    id_project: PropTypes.string,
    name: PropTypes.string,
    tag: PropTypes.string,
    pass: PropTypes.string,
    color: PropTypes.string,
    symbol: PropTypes.string,
    emoji: PropTypes.string
  })
});

export const loadedFilesProps = PropTypes.exact({
  file: PropTypes.exact({
    name: PropTypes.string,
    fid: PropTypes.string,
    size_now: PropTypes.number,
    size: PropTypes.number,
    mtime: PropTypes.string,
    gdir: PropTypes.string,
    loaded: PropTypes.bool
  }),
  options: PropTypes.exact({
    destination: PropTypes.string,
    dir: PropTypes.string,
    filePath: PropTypes.string,
    id_project: PropTypes.string,
    name: PropTypes.string,
    tag: PropTypes.string,
    pass: PropTypes.string,
    color: PropTypes.string,
    symbol: PropTypes.string,
    emoji: PropTypes.string
  })
});
