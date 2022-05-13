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
