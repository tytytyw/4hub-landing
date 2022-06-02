import React from "react";
import styles from "./MailMenu.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";

function MailMenu({ item, icon, onClick, isChosen }) {
  return (
    <div className={classNames(styles.wrapper, { [styles.chosen]: isChosen })} onClick={onClick}>
      <div className={styles.icon}>
        <img src={icon} alt="img" />
      </div>
      <div className={styles.item}>{item.name}</div>
    </div>
  );
}

export default MailMenu;

MailMenu.propTypes = {
  item: PropTypes.exact({
    path: PropTypes.string,
    name: PropTypes.string
  }),
  icon: PropTypes.string,
  onClick: PropTypes.func,
  isChosen: PropTypes.bool
};
