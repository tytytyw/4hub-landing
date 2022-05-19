import React from "react";
import classNames from "classnames";
import styles from "./ListItem.module.sass";
import PropTypes from "prop-types";
import { NO_ELEMENT } from "../globalVariables";

function ListItem({ title, SvgIcon, icon, amount, isChosen, onClick, listCollapsed }) {
  return (
    <div
      className={classNames(styles.listItemWrap, {
        [styles.active]: isChosen
      })}
      onClick={onClick}
    >
      <div
        className={classNames({
          [styles.listItem]: true
        })}
      >
        <div className={styles.listItemName}>
          {icon ? <img src={icon} alt="icon" className={styles.innerIcon} /> : <SvgIcon className={styles.innerIcon} />}
          <div className={styles.nameWrap}>
            <div className={styles.Name}>{!listCollapsed && <div className={styles.name}>{title}</div>}</div>
          </div>
        </div>
        <div className={styles.amount}>{amount > NO_ELEMENT ? <div>({amount})</div> : null}</div>
      </div>
    </div>
  );
}

export default ListItem;

ListItem.defaultProps = {
  title: "",
  SvgIcon: null,
  icon: "",
  amount: NO_ELEMENT,
  isChosen: false,
  onClick: () => {
    console.log("ListItem empty click");
  },
  listCollapsed: false
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  SvgIcon: PropTypes.element,
  icon: PropTypes.string,
  amount: PropTypes.number,
  isChosen: PropTypes.bool,
  onClick: PropTypes.func,
  listCollapsed: PropTypes.bool
};
