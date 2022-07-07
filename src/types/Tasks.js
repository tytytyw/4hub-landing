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
  title: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.string
});

export const taskCommentTypes = PropTypes.exact({
  id: PropTypes.string,
  id_task: PropTypes.string,
  id_user: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string
});

export const taskTypes = PropTypes.exact({
  id: PropTypes.string,
  name: PropTypes.string,
  id_user: PropTypes.string,
  ut: PropTypes.string,
  date_start: PropTypes.string,
  date_end: PropTypes.string,
  emails: PropTypes.string,
  tags: PropTypes.string,
  prim: PropTypes.string,
  id_emo: PropTypes.string,
  id_fig: PropTypes.string,
  id_color: PropTypes.oneOfType([colorType, PropTypes.string]),
  is_del: PropTypes.string,
  id_type: PropTypes.string,
  id_dep: PropTypes.string,
  id_act: PropTypes.string,
  id_status: PropTypes.string,
  time_start: PropTypes.string,
  comments: PropTypes.arrayOf(taskCommentTypes),
  width: PropTypes.number
});
