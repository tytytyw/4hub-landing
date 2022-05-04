import React from "react";

import styles from "./List.module.sass";
import classNames from "classnames";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";

const List = ({ setListCollapsed, listCollapsed, children }) => {
  return (
    <div
      className={classNames({
        [styles.listWrap]: true,
        [styles.listWrapCollapsed]: !!listCollapsed
      })}
    >
      <div className={styles.header}>
        {!listCollapsed && <span>Журлнал действий</span>}
        <div className={styles.imgWrap}>
          <img
            className={`${styles.playButton} ${listCollapsed ? styles.playButtonReverse : undefined}`}
            src={imageSrc + "assets/PrivateCabinet/play-grey.svg"}
            alt="play"
            onClick={() => setListCollapsed(!listCollapsed)}
          />
        </div>
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default List;

List.propTypes = {
  setListCollapsed: PropTypes.func,
  listCollapsed: PropTypes.bool,
  children: PropTypes.node
};

List.defaultProps = {
  setListCollapsed: () => {}
};
