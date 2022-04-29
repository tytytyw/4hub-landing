import PropTypes from "prop-types";

export const tariffCardItemProps = PropTypes.exact({
  dayOffer: PropTypes.bool,
  tariff: PropTypes.string,
  oldPrice: PropTypes.number,
  price: PropTypes.number,
  desc: PropTypes.string,
  options: PropTypes.array,
  current: PropTypes.bool
});
