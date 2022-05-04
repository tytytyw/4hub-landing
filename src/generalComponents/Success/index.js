import React from "react";

import styles from "./Success.module.sass";
import PopUp from "../PopUp";
import { useLocales } from "react-localized";

const Success = ({ success, set, message, title, icon }) => {
  const { __ } = useLocales();
  return (
    <>
      {success && (
        <PopUp set={set}>
          <div className={styles.successWrap}>
            <span className={styles.cross} onClick={() => set(false)} />
            <span className={styles.title}>{title}</span>
            <div>
              <img src={icon ?? "./assets/StartPage/tv.svg"} alt="img" className={styles.mainImage} />
              {icon ? null : <img src="./assets/StartPage/check.svg" alt="img" className={styles.check} />}
            </div>
            <div className={styles.infoSuccess}>
              <span>{message}</span>
            </div>
            <div className={styles.button} onClick={() => set(false)}>
              {__("Продолжить")}
            </div>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default Success;
