import PropTypes from "prop-types";

export const filePreviewProps = PropTypes.exact({
  view: PropTypes.bool,
  file: PropTypes.any,
  create: PropTypes.bool
});
