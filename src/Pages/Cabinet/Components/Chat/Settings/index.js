import React, { useEffect, useRef } from "react";
import styles from "./Settings.module.sass";
import PropTypes from "prop-types";
import { useLocales } from "react-localized";
import { ReactComponent as Arrow } from "../../../../../assets/PrivateCabinet/icons/arrow-2.svg";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { changeChatTheme, saveChatTheme } from "../../../../../Store/actions/CabinetActions";
import { themes } from "../../../../../generalComponents/chatHelper";

const Settings = ({ close }) => {
  const { __ } = useLocales();
  const activeTheme = useSelector((state) => state.Cabinet.chat.theme);
  const initialTheme = useRef({ intialTheme: null, saved: false });
  const dispatch = useDispatch();

  const themeHandler = (theme) => dispatch(changeChatTheme(theme));
  const onExit = () => {
    themeHandler(initialTheme.current.theme);
    close();
  };
  const saveSettings = () => {
    initialTheme.current.saved = true;
    dispatch(saveChatTheme(activeTheme.name));
    close();
  };
  const renderColorName = (name) => {
    switch (name) {
      case "white":
        return __("Белый");
      case "dark":
        return __("Темный");
      default:
        return "";
    }
  };

  useEffect(() => {
    if (activeTheme) initialTheme.current.theme = activeTheme;
    return () => {
      if (!initialTheme.current.saved && initialTheme.current.theme) themeHandler(initialTheme.current.theme); // eslint-disable-line
    };
  }, []); // eslint-disable-line

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles.darkTheme]: activeTheme.name === "dark"
      })}
    >
      <div className={styles.topPanel}>
        <div className={styles.backButtonWrapper}>
          <Arrow />
          <button className={styles.button} onClick={onExit}>
            {__("Назад")}
          </button>
        </div>
        <p className={styles.text}>{__("Выберите фон чата")}</p>
        <button className={styles.button} onClick={saveSettings}>
          {__("Сохранить")}
        </button>
      </div>
      <div className={styles.colorPicker}>
        {themes.map((theme) => (
          <div className={styles.colorWrapper} key={theme.name} onClick={() => themeHandler(theme)}>
            <div className={styles.flexWrapper}>
              <div
                className={classNames({
                  [styles.radio]: true,
                  [styles.chosen]: activeTheme.name === theme.name
                })}
              ></div>
              <p className={styles.colorName}>{renderColorName(theme.name)}</p>
            </div>
            <div style={{ background: theme.background }} className={styles.colorPreview}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;

Settings.propTypes = {
  close: PropTypes.func.isRequired
};
