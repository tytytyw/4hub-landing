import React from "react";
import PropTypes from "prop-types";

import styles from "./ProjectContextItem.module.sass";

const ProjectContextItem = ({ text, imageSrc, callback }) => {
  return (
    <div onClick={() => callback()} className={styles.item}>
      <div className={styles.imgWrap}>
        <img src={imageSrc} alt={text} />
      </div>
      <p>{text}</p>
    </div>
  );
};

export default ProjectContextItem;

ProjectContextItem.propTypes = {
  text: PropTypes.string,
  imageSrc: PropTypes.string,
  callback: PropTypes.func
};
