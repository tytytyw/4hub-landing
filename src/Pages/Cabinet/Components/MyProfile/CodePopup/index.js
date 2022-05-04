import React, { useState } from "react";
import PopUp from "../../../../../generalComponents/PopUp";

import styles from "./CodePopup.module.sass";
import Input from "../Input/index";
import Button from "../Button/index";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../../../api";
import { onGetUserInfo } from "../../../../../Store/actions/startPageAction";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const CodePopup = ({ setShowCodePopup }) => {
  const { __ } = useLocales();
  const [code, setCode] = useState("");
  const [errors] = useState({});
  const uid = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();

  const sentCode = () => {
    api
      .get(`/ajax/user_edit_confirm.php?uid=${uid}&code=${code}`)
      .then(() => {
        dispatch(onGetUserInfo());
        setShowCodePopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PopUp set={setShowCodePopup}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.closeWrap}>
            <div className={styles.close} onClick={() => setShowCodePopup(false)}>
              <span className={styles.times} />
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.inputWrap}>
            <p className={styles.orItem}>{__("на ваш контактный email отправлен код-пароль")}</p>
            <Input
              placeholder={__("Введите код")}
              label={false}
              name="code"
              className={styles.input}
              isMistake={errors?.code}
              onChange={(event) => setCode(event.target.value)}
            />
            <span className={styles.link}>{__("Не пришел код?")}</span>
          </div>
        </div>
        <div className={styles.actionBlock}>
          <Button className={styles.actionBtn} onClick={() => sentCode()}>
            {__("Далее")}
          </Button>
        </div>
      </div>
    </PopUp>
  );
};

export default CodePopup;

CodePopup.propTypes = {
  setShowCodePopup: PropTypes.func
};
