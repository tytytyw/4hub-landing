import PropTypes from "prop-types";

export const fileProps = PropTypes.exact({
  name: PropTypes.string,
  path: PropTypes.string,
  ut: PropTypes.string,
  is_del: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tags: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object
  ]),
  is_pass: PropTypes.number,
  is_lock: PropTypes.number,
  deadline: PropTypes.number,
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  fig: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object
  ]),
  emo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object
  ]),
  folders: PropTypes.array,
  nameRu: PropTypes.string
});
