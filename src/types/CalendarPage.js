import PropTypes from "prop-types";

const colorProps = PropTypes.exact({
  color: PropTypes.string,
  dark: PropTypes.string,
  light: PropTypes.string,
  name: PropTypes.string,
});

const tagOptionProps = PropTypes.exact({
  chosen: PropTypes.string,
  count: PropTypes.number,
  show: PropTypes.bool,
});

export const eventProps = PropTypes.exact({
  name: PropTypes.string,
  sign: PropTypes.string,
  emoji: PropTypes.string,
  color: colorProps,
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  tagOption: tagOptionProps,
  desc: PropTypes.string,
});

export const eventShowProps = PropTypes.exact({
  name: PropTypes.string,
  term: PropTypes.string,
  tag: PropTypes.string,
  sender: PropTypes.string,
  avatar: PropTypes.string,
  ctime: PropTypes.string,
  date: PropTypes.object,
  type: PropTypes.number,
});

export const taskProps = PropTypes.exact({
  type: PropTypes.number,
  name: PropTypes.string,
  term: PropTypes.string,
  tag: PropTypes.string,
  sender: PropTypes.string,
  ctime: PropTypes.string,
  avatar: PropTypes.string,
});
