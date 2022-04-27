import React from "react";

import styles from "./SuccessSend.module.sass";
import successImg from "../../../../../../../assets/BusinessCabinet/WelcomePage/success.svg";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const SuccessSend = ({ setPageOption }) => {
  const { __ } = useLocales();

  return (
    <div className={styles.centeredWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img src={successImg} alt="Success" />
          <p>{__("Письмо отправлено на почту")}</p>
        </div>

        <div className={styles.infoBlock}>
          <p>
            {__(
              "Письмо с правами доступа отправленно на указанный вами email mailgmail@gmail.com"
            )}
          </p>
        </div>

        <div className={styles.actionBlock}>
          <button onClick={() => setPageOption("welcome")}>
            {__("Готово")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessSend;

SuccessSend.propTypes = {
  setPageOption: PropTypes.func
};
