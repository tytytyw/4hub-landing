import React, { useState } from "react";
import classnames from "classnames";
import { useLocales } from "react-localized";

import api from "../../../api";
import styles from "./ForgotPassword.module.sass";
import Error from "../../../generalComponents/Error";
import Success from "../../../generalComponents/Success";
import { imageSrc } from "../../../generalComponents/globalVariables";
import PropTypes from "prop-types";

const ForgotPassword = ({ setPage }) => {
  const { __ } = useLocales();
  const [login, setLogin] = useState("");
  const [compare, setCompare] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const setOnLogin = (val) => {
    let number;
    if (val[0] === "+") {
      const newVal = val.replace(/(\+)*(\()*(\))*\s*(-)*/g, "");
      const length = newVal.length;
      number = `+${newVal.substring(0, 2)}${
        length > 2 ? " (" + newVal.substring(2, 5) : newVal.substring(2, 5)
      }${length > 5 ? ") " + newVal.substring(5, 8) : newVal.substring(5, 8)}${
        length > 8 ? "-" + newVal.substring(8, 10) : newVal.substring(8, 10)
      }${
        length > 10
          ? "-" + newVal.substring(10, newVal.length)
          : newVal.substring(10, newVal.length)
      }`;
    } else {
      number = val;
    }
    setLogin(number);
  };

  const checkLogin = (input) => {
    let boolean = false;
    if (input.value[0] === "+") {
      const newVal = input.value.replace(/(\+)*(\()*(\))*\s*-*/g, "");
      if (/\D/.test(newVal)) boolean = true;
      if (newVal.length < 12) boolean = true;
    } else {
      if (input.value.indexOf("@") === -1) boolean = true;
    }
    setCompare(boolean);
  };

  const signIn = () => {
    const mSuccess = __(
      "В целях безопасности, на Email Вашей учетной записи отправлено подтверждение этого изменения"
    );

    if (login && !compare) {
      api
        .post(`/ajax/user_pass_remember.php?name=${login}`)
        .then((res) => {
          if (res.data.ok === 1 && res.data.send === true) {
            setMessage(mSuccess);
            setSuccess(true);
          } else {
            setMessage(res.data.send.toString());
            setError(true);
          }
        })
        .catch((err) => {
          setMessage(err.toString());
          setError(true);
        });
    }
  };

  return (
    <>
      <div className={styles.main}>
        <img
          className={styles.hubIcon}
          src={imageSrc + "assets/StartPage/4HUB.svg"}
          alt="4HUB"
          onClick={() => setPage("init")}
        />
        <div className={styles.forgotWrap}>
          <span className={styles.cross} onClick={() => setPage("init")} />
          <span className={styles.title}>{__("Восстановление пароля")}</span>
          <div className={styles.info}>
            {__(
              "Введите Email / Телефон указанный при регистрации, Вам будет направлено письмо с ссылкой для восстановления пароля."
            )}
          </div>
          <div className={`${styles.inputWrap} ${styles.marginWrap}`}>
            <label className={styles.inputName} htmlFor="login">
              {__("Email / Телефон")}
              {compare && <span>{__("Некорректный ввод данных")}</span>}
            </label>
            <input
              className={classnames({
                [styles.inputField]: true,
                [styles.redBorder]: compare,
              })}
              type="text"
              id="login"
              value={login}
              onChange={(e) => setOnLogin(e.target.value)}
              onBlur={(e) => checkLogin(e.target)}
            />
          </div>
          <div className={styles.button} onClick={signIn}>
            {__("Отправить")}
          </div>
        </div>
      </div>
      {error && <Error error={error} set={setError} message={message} />}
      {success && (
        <Success
          success={success}
          set={setSuccess}
          message={message}
          title={__("Ваш пароль обновлён")}
        />
      )}
    </>
  );
};

export default ForgotPassword;

ForgotPassword.propTypes = {
  setPage: PropTypes.func,
};
