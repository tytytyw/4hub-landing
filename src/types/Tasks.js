import PropTypes from "prop-types";

export const addNoteParams = PropTypes.exact({
  width: PropTypes.number,
  tag: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string
});

export const editTaskParams = PropTypes.exact({
  width: PropTypes.number,
  tag: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
  sign: PropTypes.string,
  emoji: PropTypes.string,
  category: PropTypes.string,
  urgency: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  taskName: PropTypes.string
});

export const editMeetingParams = PropTypes.exact({
  width: PropTypes.number,
  date: PropTypes.string,
  time: PropTypes.string,
  name: PropTypes.string
});
