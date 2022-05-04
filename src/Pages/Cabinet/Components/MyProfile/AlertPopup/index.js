import React from "react";
import styles from "./AlertPopup.module.sass";
import PopUp from "../../../../../generalComponents/PopUp";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const Index = ({ set, text, title, setShowCodePopup }) => {
  const { __ } = useLocales();
  return (
    <PopUp set={set}>
      <div className={styles.sendSuccess}>
        <span className={styles.cross} onClick={() => set(false)} />
        <span className={styles.title}>{title}</span>
        <div className={styles.imageWrap}>
          <img
            src={imageSrc + "assets/StartPage/success-password-edit.svg"}
            alt="computer"
            className={styles.computer}
          />
        </div>
        <p className={styles.text}>{text}</p>
        <div
          className={styles.closeButton}
          onClick={() => {
            set(false);
            setShowCodePopup(true);
            // index.js:27 Uncaught TypeError: setShowCodePopup is not a function
          }}
        >
          {__("Продолжить")}
        </div>
      </div>
    </PopUp>
  );
};

export default Index;

Index.propTypes = {
  set: PropTypes.func,
  text: PropTypes.string,
  title: PropTypes.string,
  setShowCodePopup: PropTypes.func
};
