import PropTypes from "prop-types";

export const addNoteParams = PropTypes.exact({
  width: PropTypes.number,
  tag: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string
});
