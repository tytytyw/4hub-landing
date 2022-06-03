import PropTypes from "prop-types";
import { colorType } from "./Color";

export const addNoteParams = PropTypes.exact({
  width: PropTypes.number,
  tag: PropTypes.string,
  color: PropTypes.oneOfType([colorType, PropTypes.string]),
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

export const editLetterParams = PropTypes.exact({
  width: PropTypes.number,
  topic: PropTypes.string,
  receiver: PropTypes.string,
  text: PropTypes.string
});

export const editSectionParams = PropTypes.exact({
  width: PropTypes.number,
  title: PropTypes.string
});
