import React from "react";
import PropTypes from "prop-types";
import styles from "./Error.module.sass";
import PopUp from "../PopUp";
import { useLocales } from "react-localized";

const Error = ({ error, set, message }) => {
  const { __ } = useLocales();
  return (
    <>
      {error && (
        <PopUp set={set}>
          <div className={styles.errorWrap}>
            <span className={styles.cross} onClick={() => set(false)} />
            <span className={styles.title}>Ошибка</span>
            <div>
              <img src="./assets/StartPage/tv.svg" alt="img" />
              <img src="./assets/StartPage/warning.svg" alt="img" className={styles.warning} />
            </div>
            <div className={styles.infoError}>
              <span>{message}</span>
            </div>
            <div className={styles.button} onClick={() => set(false)}>
              {__("Закрыть")}
            </div>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Error;

Error.propTypes = {
  error: PropTypes.bool.isRequired,
  set: PropTypes.func.isRequired,
  message: PropTypes.string
};
