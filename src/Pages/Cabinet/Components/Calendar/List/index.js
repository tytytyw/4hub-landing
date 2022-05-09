import React from "react";

import styles from "./List.module.sass";
import { ReactComponent as FolderIcon } from "../../../../../assets/PrivateCabinet/icons/folder-filled.svg";
import classNames from "classnames";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import PropTypes from "prop-types";

const List = ({ title, setListCollapsed, listCollapsed, children }) => {
  return (
    <div
      className={classNames({
        [styles.listWrap]: true,
        [styles.listWrapCollapsed]: !!listCollapsed
      })}
    >
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <FolderIcon className={styles.folderIcon} />
          {!listCollapsed && <h4 className={styles.title}>{title}</h4>}
        </div>
        <div className={styles.imgWrap}>
          <PlayIcon
            onClick={() => setListCollapsed(!listCollapsed)}
            className={classNames({
              [styles.playButton]: true,
              [styles.revert]: !!listCollapsed
            })}
          />
        </div>
      </div>

      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default List;

List.propTypes = {
  title: PropTypes.string,
  setListCollapsed: PropTypes.func,
  listCollapsed: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element)
};
