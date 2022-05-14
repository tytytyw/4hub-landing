import PropTypes from "prop-types";

export const dataProps = PropTypes.arrayOf(
  PropTypes.exact({
    children: PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string,
        label: PropTypes.string
      })
    ),
    icon: PropTypes.element,
    label: PropTypes.string,
    name: PropTypes.string
  })
);
