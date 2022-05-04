import React, { useState } from "react";
import { useSelector } from "react-redux";

import PopUp from "../../../../../../generalComponents/PopUp";
import api from "../../../../../../api";
import styles from "./RefreshPass.module.sass";
import Input from "../../../MyProfile/Input";
import Button from "../../../MyProfile/Button";
import ErrorPass from "../ErrorPass";
import { useLocales } from "react-localized";

const RefreshPass = ({
  safe,
  set,
  setShowSuccessMessage,
  setLoadingType,
  recoverPass = false,
}) => {
  const { __ } = useLocales();
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showPass, setShowPass] = useState(false);
  const uid = useSelector((state) => state.user.uid);
  const [errors, setErrors] = useState({});
  const [displayErrorPass, setDisplayErrorPass] = useState(false);

  const onSubmit = () => {
    if (passIsValid()) {
      setLoadingType("squarify");
      if (!recoverPass) {
        api
          .post(
            `/ajax/safe_pass_change.php?uid=${uid}&pass=${oldPassword}&pass_new=${passwordRepeat}&id_safe=${safe.id}`
          )
          .then((res) => {
            if (res.data.ok === 1) {
              setShowSuccessMessage(__(`Пароль для сейфа обновлен`));
              set();
            } else {
              if (!res.data.f_pass) {
                setErrors({ oldPassword: true });
                setDisplayErrorPass(true);
              }
              console.log(res);
            }
          })
          .catch((err) => console.log(err))
          .finally(() => setLoadingType(""));
      } else {
        api
          .get(
            `/ajax/safe_pass_restore2.php?uid=${uid}&pass=${passwordRepeat}&id_safe=${safe.id}&code=${recoverPass}`
          )
          .then((res) => {
            if (res.data.ok) {
              setShowSuccessMessage(__(`Пароль для сейфа обновлен`));
              set(false);
            } else {
              console.log(res);
            }
          })
          .catch((err) => console.log(err))
          .finally(() => setLoadingType(""));
      }
    }
  };

  const passIsValid = () => {
    addErrors();
    return password === passwordRepeat && passwordRepeat && password;
  };

  const addErrors = () => {
    setErrors({
      password: !password,
      oldPassword: !oldPassword && !recoverPass,
      passwordRepeat: password !== passwordRepeat,
    });
  };

  return (
    <PopUp set={set}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.closeWrap}>
            <div className={styles.close} onClick={() => set(false)}>
              <span className={styles.times} />
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.titleWrap}>
            <h4 className={styles.title}>{__("Обновите пароль")}</h4>
          </div>

          {!recoverPass && (
            <div className={styles.formItem}>
              <label htmlFor={styles.inputWrap} className={styles.label}>
                {__("Старый пароль")}
              </label>
              <div className={styles.inputWrap}>
                <Input
                  type="password"
                  className={styles.passInput}
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  isMistake={errors?.oldPassword}
                  showPass={showPass}
                  setShowPass={setShowPass}
                />
              </div>
            </div>
          )}

          <div className={styles.formItem}>
            <label htmlFor={styles.passInput} className={styles.label}>
              {__("Новый пароль")}
            </label>

            <div className={styles.inputWrap}>
              <Input
                id={styles.passInput}
                type="password"
                className={styles.passInput}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                isMistake={errors?.password}
                showPass={showPass}
                setShowPass={setShowPass}
                showEye={false}
              />
            </div>
          </div>

          <div className={styles.formItem}>
            <label htmlFor={styles.inputWrap} className={styles.label}>
              {__("Повторить пароль")}
            </label>

            <div className={styles.inputWrap}>
              <Input
                id={styles.inputWrap}
                type="password"
                className={styles.passInput}
                value={passwordRepeat}
                onChange={(event) => setPasswordRepeat(event.target.value)}
                isMistake={errors?.passwordRepeat}
                showPass={showPass}
                setShowPass={setShowPass}
                showEye={false}
              />
            </div>
          </div>

          <div className={styles.actionBlock}>
            <Button
              type="submit"
              className={styles.actionBtn}
              onClick={onSubmit}
            >
              {__("Готово")}
            </Button>
          </div>
        </div>
      </div>

      {displayErrorPass && (
        <ErrorPass setError={setDisplayErrorPass} set={set} />
      )}
    </PopUp>
  );
};

export default RefreshPass;
