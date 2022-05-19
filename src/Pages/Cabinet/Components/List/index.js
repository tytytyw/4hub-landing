import React from "react";
import { useSelector } from "react-redux";

import styles from "./List.module.sass";
import classnames from "classnames";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const List = ({ title, src, setListCollapsed, listCollapsed, children, onCreate, icon, leftIconSrc }) => {
  const { __ } = useLocales();
  const { theme } = useSelector((state) => state.user.userInfo);
  return (
    <div
      className={classnames({
        [styles.listWrap]: true,
        [styles.listWrapCollapsed]: !!listCollapsed
      })}
      title={listCollapsed ? title : ""}
    >
      <div className={styles.header}>
        {!!leftIconSrc && (
          <img
            className={styles.icon}
            src={`${imageSrc}assets/PrivateCabinet/${leftIconSrc}`}
            alt="icon"
            onClick={() => onCreate(true)}
          />
        )}
        {!listCollapsed && <span>{title}</span>}
        <span />
        <div className={styles.imgWrap}>
          <img
            className={`${styles.playButton} ${listCollapsed ? styles.playButtonReverse : undefined}`}
            src={`${imageSrc}assets/PrivateCabinet/play-grey.svg`}
            alt="play"
            onClick={() => setListCollapsed(!listCollapsed)}
            title={listCollapsed ? __("Развернуть") : __("Свернуть")}
          />
          {!!icon && (
            <img
              className={styles.icon}
              src={`${imageSrc}assets/PrivateCabinet/${src}`}
              alt="icon"
              onClick={() => onCreate(true)}
            />
          )}
        </div>
      </div>
      <div className={classnames(styles.children, `scrollbar-thin-${theme}`)}>{children}</div>
    </div>
  );
};

export default List;

List.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  setListCollapsed: PropTypes.func,
  listCollapsed: PropTypes.bool,
  children: PropTypes.node,
  onCreate: PropTypes.func,
  icon: PropTypes.bool,
  leftIconSrc: PropTypes.string
};

List.defaultProps = {
  icon: true
};
