import React from "react";

import styles from "./List.module.sass";
import classNames from "classnames";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";

// eslint-disable-next-line react/display-name
const List = React.forwardRef(
  ({ title, src, setListCollapsed, listCollapsed, children, onCreate, icon, className }, ref) => {
    return (
      <div
        className={classNames({
          [styles.listWrap]: true,
          [className]: true,
          [styles.listWrapCollapsed]: !!listCollapsed
        })}
        ref={ref ?? null}
      >
        <div className={styles.header}>
          {!listCollapsed && <span className={styles.title}>{title}</span>}
          <div className={styles.imgWrap}>
            <img
              className={`${styles.playButton} ${listCollapsed ? styles.playButtonReverse : undefined}`}
              src={`${imageSrc}/assets/PrivateCabinet/play-grey.svg`}
              alt="play"
              onClick={() => setListCollapsed(!listCollapsed)}
            />
            {!!icon && (
              <img
                className={styles.icon}
                src={`${imageSrc}/assets/PrivateCabinet/${src}`}
                alt="icon"
                onClick={() => onCreate(true)}
              />
            )}
          </div>
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    );
  }
);

export default List;

List.defaultProps = {
  icon: true
};

List.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  setListCollapsed: PropTypes.func,
  listCollapsed: PropTypes.bool,
  children: PropTypes.element,
  onCreate: PropTypes.func,
  icon: PropTypes.bool,
  className: PropTypes.string
};
