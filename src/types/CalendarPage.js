import PropTypes from "prop-types";

const colorProps = PropTypes.exact({
  color: PropTypes.string,
  dark: PropTypes.string,
  light: PropTypes.string,
  name: PropTypes.string
});

const tagOptionProps = PropTypes.exact({
  chosen: PropTypes.string,
  count: PropTypes.number,
  show: PropTypes.bool
});

export const eventProps = PropTypes.exact({
  comments: PropTypes.arrayOf(PropTypes.string),
  date: PropTypes.instanceOf(Date),
  date_end: PropTypes.string,
  date_start: PropTypes.string,
  id: PropTypes.string,
  id_act: PropTypes.string,
  id_color: PropTypes.oneOfType([PropTypes.string, colorProps]),
  id_dep: PropTypes.string,
  id_emo: PropTypes.string,
  id_fig: PropTypes.string,
  id_status: PropTypes.string,
  id_type: PropTypes.string,
  id_user: PropTypes.string,
  is_del: PropTypes.string,
  name: PropTypes.string,
  prim: PropTypes.string,
  tags: tagOptionProps,
  ut: PropTypes.string,
  sign: PropTypes.string,
  start_time: PropTypes.string,
  emails: PropTypes.string
});

export const eventShowProps = PropTypes.exact({
  name: PropTypes.string,
  term: PropTypes.string,
  tag: PropTypes.string,
  sender: PropTypes.string,
  avatar: PropTypes.string,
  ctime: PropTypes.string,
  date: PropTypes.object,
  type: PropTypes.number
});

export const taskProps = PropTypes.exact({
  type: PropTypes.number,
  name: PropTypes.string,
  term: PropTypes.string,
  tag: PropTypes.string,
  sender: PropTypes.string,
  ctime: PropTypes.string,
  avatar: PropTypes.string
});
