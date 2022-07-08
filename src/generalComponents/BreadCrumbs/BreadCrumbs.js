import React, { useEffect, useState } from "react";
import styles from "./BreadCrumbs.module.sass";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function BreadCrumbs({ onClick }) {
  const currentDep = useSelector((s) => s.Tasks.currentDep);
  const [path, setPath] = useState({ dep: "" });

  useEffect(() => {
    setPath((state) => ({ ...state, dep: currentDep }));
  }, [currentDep]);

  const renderPath = () => {
    return Object.entries(path).map(([key, value]) => (
      <div className={styles.pathEl} key={key}>
        {key !== "dep" && <span className={styles.arrowNext}>&gt;</span>}
        <div className={styles.pathEl} onClick={onClick}>
          {value?.name}
        </div>
      </div>
    ));
  };

  return <div className={styles.breadCrumbsWrap}>{renderPath()}</div>;
}

export default BreadCrumbs;

BreadCrumbs.propTypes = {
  onClick: PropTypes.func
};
