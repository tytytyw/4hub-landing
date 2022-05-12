import PropTypes from "prop-types";

export const subOptionsProps = PropTypes.arrayOf(PropTypes.exact({ name: PropTypes.string, title: PropTypes.string }));
export const subOptionProps = PropTypes.exact({
  count: PropTypes.number,
  name: PropTypes.string.isRequired,
  subOptions: subOptionsProps,
  title: PropTypes.string.isRequired
});
