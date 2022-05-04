import React, { useState, useEffect } from "react";
import PopUp from "../../../../../../generalComponents/PopUp";

import styles from "./CodePopup.module.sass";
import Input from "../../../MyProfile/Input";
import Button from "../../../MyProfile/Button";
import SafeIcon from "../../SafeIcon";
import ErrorPass from "../ErrorPass";
import RecoverPass from "../RecoverPass";
import RefreshPass from "../RefreshPass";

import { useDispatch, useSelector } from "react-redux";
import api from "../../../../../../api";
import { onGetSafeFileList } from "../../../../../../Store/actions/CabinetActions";
import { useLocales } from "react-localized";

const CodePopup = ({
  safe,
  set,
  setLoadingType,
  filesPage,
  successLoad,
  setShowSuccessMessage,
  action,
  setAction,
}) => {
  const { __ } = useLocales();
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [recoverPass, setRecoverPass] = useState({
    show: false,
    active: false,
  });
  const [refreshPass, setRefreshPass] = useState(false);
  const [errors, setErrors] = useState({});
  const uid = useSelector((state) => state.user.uid);
  const [showSendCode, setShowSendCode] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const search = useSelector((state) => state.Cabinet.search);

  const dispatch = useDispatch();

  const onGetSafeAccess = (password, id_safe, code) => {
    if (password && !code) {
      setLoadingType("squarify");
      api
        .get(
          `/ajax/safe_get_access.php?uid=${uid}&pass=${password}&id_safe=${id_safe}`
        )
        .then((res) => {
          if (res.data.f_pass) setShowSendCode(true);
          else setError("password");
        })
        .catch((error) => console.log(error))
        .finally(() => setLoadingType(""));
    } else setErrors({ password: !password, code: !code });

    if (code) {
      setLoadingType("squarify");
      dispatch(
        onGetSafeFileList(
          code,
          id_safe,
          password,
          successLoad,
          setError,
          setLoadingType,
          search,
          filesPage,
          set
        )
      );
    }
  };

  const recoverStage2 = () => {
    setLoadingType("squarify");
    api
      .get(
        `/ajax/safe_pass_restore2.php?uid=${uid}&id_safe=${safe.id}&code=${code}`
      )
      .then((res) => {
        if (res.data.ok) {
          setShowSendCode(false);
          setRefreshPass(true);
        } else {
          setError("code");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingType(""));
  };

  const requestPassword = () => {
    setLoadingType("squarify");
    api
      .get(
        `/ajax/safe_get_access.php?uid=${uid}&id_safe=${safe.id}&pass=${password}&verify_only=1`
      )
      .then((res) => {
        if (res.data.f_pass === 1)
          setAction({ ...action, type: action.targetType });
        else setError("password");
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingType(""));
  };
  const onSubmit = () => {
    if (action?.type === "requestPassword") return requestPassword();
    if (!recoverPass.active) onGetSafeAccess(password, safe.id, code);
    else {
      recoverStage2();
    }
  };

  useEffect(() => {
    setErrors({ password: false, code: false });
  }, [password, code]);

  return (
    <>
      {!error && !recoverPass.show && (
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
                <SafeIcon type={safe?.id_color} className={styles.titleImg} />
                <h4 className={styles.title}>{safe?.name}</h4>
              </div>

              {!showSendCode && (
                <div className={styles.inputWrap}>
                  <input
                    type="text"
                    style={{ opacity: "0", width: 0, height: 0 }}
                  />
                  <Input
                    placeholder={__("Введите пароль")}
                    className={styles.input}
                    isMistake={errors?.password}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    showPass={showPass}
                    setShowPass={setShowPass}
                  />
                  <span
                    className={styles.link}
                    onClick={() => setRecoverPass({ show: true, active: true })}
                  >
                    {__("Забыли пароль?")}
                  </span>
                </div>
              )}

              {showSendCode && (
                <>
                  <div className={styles.inputWrap}>
                    {!recoverPass.active ? (
                      <p className={styles.orItem}>
                        {__(
                          "на номер {codeSentTo} отправлен код-пароль для доступа к сейфу"
                        )}
                      </p>
                    ) : null}
                    <Input
                      placeholder={__("Введите код")}
                      label={false}
                      name="code"
                      className={styles.input}
                      isMistake={errors?.code}
                      onChange={(event) => setCode(event.target.value)}
                    />
                    <span className={styles.link}>{__("Не пришол код?")}</span>
                  </div>
                </>
              )}

              <div className={styles.actionBlock}>
                <Button
                  type="submit"
                  className={styles.actionBtn}
                  onClick={onSubmit}
                >
                  {showSendCode && !recoverPass.active
                    ? __("Войти")
                    : __("Далее")}
                </Button>
              </div>
            </div>
          </div>
        </PopUp>
      )}

      {recoverPass.show && (
        <RecoverPass
          refreshPass={refreshPass}
          setRefreshPass={setRefreshPass}
          safe={safe}
          set={setRecoverPass}
          setShowSendCode={setShowSendCode}
          setError={setError}
          setLoadingType={setLoadingType}
        />
      )}
      {refreshPass && (
        <RefreshPass
          recoverPass={code}
          safe={safe}
          setLoadingType={setLoadingType}
          setShowSuccessMessage={setShowSuccessMessage}
          set={set}
        />
      )}
      {error && <ErrorPass setError={setError} mistake={error} set={set} />}
    </>
  );
};

export default CodePopup;
