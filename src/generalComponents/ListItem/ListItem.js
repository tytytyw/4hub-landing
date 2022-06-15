import React from "react";
import classNames from "classnames";
import styles from "./ListItem.module.sass";
import PropTypes from "prop-types";
import { NO_ELEMENT } from "../globalVariables";

function ListItem({ title, SvgIcon, icon, amount, isChosen, onClick, listCollapsed, setMouseParams }) {
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
        {" "}
        {SvgIcon && <SvgIcon className={styles.innerIcon} />}
        {icon ? <img src={icon} alt="icon" className={styles.innerIcon} /> : <div className={styles.innerIcon} />}
        {!listCollapsed && <div className={styles.name}>{title}</div>}
        <div className={styles.amount}>{amount > NO_ELEMENT ? <div>({amount})</div> : null}</div>
        <div
          className={styles.dots}
          onClick={(e) => {
            setMouseParams({
              x: e.clientX,
              y: e.clientY,
              width: 200,
              height: 25
            });
          }}
        >
          {setMouseParams && <span />}
        </div>
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
  SvgIcon: PropTypes.elementType,
  icon: PropTypes.string,
  amount: PropTypes.number,
  isChosen: PropTypes.bool,
  onClick: PropTypes.func,
  listCollapsed: PropTypes.bool,
  setMouseParams: PropTypes.func
};
