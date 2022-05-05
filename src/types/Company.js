import PropTypes from "prop-types";

export const itemProps = PropTypes.exact({
  children: PropTypes.node,
  name: PropTypes.string,
  icon: PropTypes.object,
  label: PropTypes.string
});

const personInfoProps = PropTypes.exact({
  name: PropTypes.string,
  surname: PropTypes.string,
  middleName: PropTypes.string,
  position: PropTypes.string,
  status: PropTypes.object,
  phone: PropTypes.string,
  phone2: PropTypes.string,
  email: PropTypes.string,
  email2: PropTypes.string
});

export const personProps = PropTypes.exact({
  data: PropTypes.shape({
    info: personInfoProps
  }),
  id: PropTypes.string,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  type: PropTypes.string
});
