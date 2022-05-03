import React, { useState } from "react";
import styles from "./SetPassword.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import InputField from "../../../../../../generalComponents/InputField";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

function SetPassword({ setDisplaySetPassword, onAddPass }) {
  const { __ } = useLocales();
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordCoincide, setPasswordCoincide] = useState(false);
  const [showRepeat, setShowRepeat] = useState(true);
  const [visibility, setVisibility] = useState("password");
  const onSwitch = boolean => setShowRepeat(boolean);
  const comparePass = val => {
    const pass = password.split("");
    const passRepeat = val.split("");
    let boolean = pass.length === passRepeat.length;
    passRepeat.forEach((el, i) => {
      if (el !== pass[i]) boolean = false;
    });
    setPasswordCoincide(boolean);
  };
  const width = window.innerWidth;

  const closeComponent = () => {
    if (password !== passwordRepeat) setPasswordCoincide(false);
    else {
      setPasswordCoincide(true);
      onAddPass(password);
      setDisplaySetPassword(false);
    }
  };

  return (
    <div style={{ display: `block` }}>
      <PopUp set={setDisplaySetPassword}>
        <div className={styles.wrap}>
          <span
            className={styles.cross}
            onClick={() => setDisplaySetPassword(false)}
          />
          <span className={styles.title}>Установить пароль</span>
          <div className={styles.inputFieldsWrap}>
            <InputField
              model="password"
              switcher={false}
              height={width >= 1440 ? "40px" : "30px"}
              value={password}
              set={setPassword}
              placeholder={__("Пароль")}
              onSwitch={onSwitch}
              visibility={visibility}
              setVisibility={setVisibility}
              disabled={!showRepeat}
              onChange={e => comparePass(e.target.value)}
            />
            {showRepeat && (
              <InputField
                model="password"
                switcher={false}
                height={width >= 1440 ? "40px" : "30px"}
                value={passwordRepeat}
                set={setPasswordRepeat}
                placeholder={__("Повторите пароль")}
                visibility={visibility}
                setVisibility={setVisibility}
                comparePass={comparePass}
                mistake={!passwordCoincide}
              />
            )}
          </div>
          <div className={styles.buttonsWrap}>
            <div
              className={styles.cancel}
              onClick={() => setDisplaySetPassword(false)}>
              {__("Отмена")}
            </div>
            <div
              className={styles.add}
              onClick={() => {
                if (passwordCoincide || password === "") closeComponent();
              }}>
              {__("Установить")}
            </div>
          </div>
        </div>
      </PopUp>
    </div>
  );
}

export default SetPassword;
SetPassword.propTypes = {
  setDisplaySetPassword: PropTypes.func,
  onAddPass: PropTypes.func
};
