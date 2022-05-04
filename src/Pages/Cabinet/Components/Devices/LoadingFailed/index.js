import React from "react";
import styles from "./LoadingFailed.module.sass";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const LoadingFailed = ({ callback }) => {
  const { __ } = useLocales();
  return (
    <div className={styles.errorWrapper}>
      <span className={styles.message}>{__("Неудалось загрузить данные")}</span>
      <button className={styles.repeatBtn} onClick={callback}>
        {__("Повторить")}
      </button>
    </div>
  );
};

export default LoadingFailed;

LoadingFailed.propTypes = {
  callback: PropTypes.func,
};
