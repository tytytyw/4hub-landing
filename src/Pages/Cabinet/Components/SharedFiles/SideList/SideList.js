import React from "react";
import styles from "./SideList.module.sass";
import { useSelector } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";

function SideList({ children }) {
  const size = useSelector(state => state.Cabinet.size);

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles?.[`wrapper_${size}`]]: size !== "medium"
      })}
    >
      {children}
    </div>
  );
}

export default SideList;

SideList.propTypes = {
  children: PropTypes.any
};
