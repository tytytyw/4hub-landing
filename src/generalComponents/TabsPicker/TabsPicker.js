import React from "react";
import styles from "./TabsPicker.module.sass";
import classNames from "classnames";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function TabsPicker({ ELEMENTS, selected, onClick }) {
  const { theme } = useSelector((s) => s.user.userInfo);

  return (
    <div className={styles.viewPanel}>
      {ELEMENTS.map((Element, i) => (
        <div
          key={i}
          onClick={() => onClick(i)}
          className={classNames(`interaction-background-${theme}`, {
            [styles.iconViewChosen]: selected === i,
            [`background-${theme}`]: selected === i,
            [styles.iconView]: selected !== i
          })}
        >
          <Element />
        </div>
      ))}
    </div>
  );
}

export default TabsPicker;

TabsPicker.defaultProps = {
  ELEMENTS: [],
  selected: -1,
  onClick: () => {}
};

TabsPicker.propTypes = {
  ELEMENTS: PropTypes.arrayOf(PropTypes.elementType).isRequired, //elements imported as ReactComponents
  selected: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};
