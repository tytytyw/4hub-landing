import React from "react";
import styles from "./CustomNodeComponent.module.sass";
import { Handle } from "react-flow-renderer";
import { imageSrc } from "../../../../../../../generalComponents/globalVariables";
import classNames from "classnames";
import { ReactComponent as Plus } from "../../../../../../../assets/PrivateCabinet/plus-3.svg";
import PropTypes from "prop-types";

function CustomNodeComponent({ data }) {
  return (
    <div className={classNames(styles.node, styles[data?.info?.status?.name])}>
      <Handle
        type="target"
        position="left"
        style={{
          width: 10,
          height: 10,
          borderRadius: 50,
          background: "#4086F1"
        }}
      />
      <div className={styles.person}>
        <div className={styles.avatar}>
          <img
            draggable={false}
            src={`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
            alt="avatar"
            className={styles.icon}
          />
        </div>
        <div className={styles.text}>
          <p className={styles.name}>{data.info.name + " " + data.info.middleName}</p>
          <p className={styles.position}>{data.info.position}</p>
        </div>
        <div className={styles.menuWrap}>
          <span className={styles.menu} />
        </div>
      </div>
      <Handle
        type="source"
        position="right"
        style={{
          width: 10,
          height: 10,
          borderRadius: 50,
          background: "#4086F1",
          zIndex: 2
        }}
      />
      <div className={styles.addButtonWrap}>
        <span className={styles.line} />

        <div className={styles.iconWrap}>
          <Plus className={styles.plusIcon} />
        </div>
      </div>
    </div>
  );
}

export default CustomNodeComponent;

CustomNodeComponent.propTypes = {
  data: PropTypes.object
};
