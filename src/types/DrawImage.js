import PropTypes from "prop-types";

export const drawImageProps = PropTypes.exact({
  chosen: PropTypes.arrayOf(PropTypes.string),
  loaded: PropTypes.arrayOf(PropTypes.string),
  saved: PropTypes.arrayOf(
    PropTypes.exact({
      fid: PropTypes.string,
      src: PropTypes.string
    })
  )
});
