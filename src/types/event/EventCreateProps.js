import PropTypes from "prop-types";

const eventCreateColorProps = PropTypes.exact({
  color: PropTypes.string,
  dark: PropTypes.string,
  light: PropTypes.string,
  name: PropTypes.string
});

const eventCreateTagOptionProps = PropTypes.exact({
  chosen: PropTypes.string,
  count: PropTypes.number,
  show: PropTypes.bool
});

export const eventCreateProps = PropTypes.exact({
  name: PropTypes.string,
  sign: PropTypes.string,
  emoji: PropTypes.string,
  color: eventCreateColorProps,
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  tagOption: eventCreateTagOptionProps,
  desc: PropTypes.string
});
