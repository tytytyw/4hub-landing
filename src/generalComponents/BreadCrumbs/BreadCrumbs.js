import React from "react";
import styles from "./BreadCrumbs.module.sass";
import PropTypes from "prop-types";

function BreadCrumbs({ path, onClick }) {
  const renderPath = () => {
    return path.map((el, i) => (
      <div className={styles.pathEl} key={i}>
        {i !== 0 ? <span className={styles.arrowNext}>&gt;</span> : null}
        <div className={styles.pathEl} onClick={onClick}>
          {el}
        </div>
      </div>
    ));
  };

  return <div className={styles.breadCrumbsWrap}>{renderPath()}</div>;
}

export default BreadCrumbs;

BreadCrumbs.propTypes = {
  path: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func
};
