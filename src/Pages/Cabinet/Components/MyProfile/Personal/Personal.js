import React, { useState } from "react";

import styles from "./Personal.module.sass";
import { ReactComponent as BellIcon } from "../../../../../assets/PrivateCabinet/bell.svg";
import classNames from "classnames";
import Select from "../../../../../generalComponents/Select/Select";
import Button from "../Button";
import { onChangeSettings } from "../../../../../Store/actions/startPageAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocales } from "react-localized";

const Personal = () => {
  const { __ } = useLocales();
  const langs = [
    { id: "ru", text: __("Русский") },
    { id: "en", text: __("Английский") },
    { id: "uk", text: __("Украинский") }
  ];

  const dispatch = useDispatch();
  const currentParams = useSelector((s) => s.user.userInfo);
  const [params, setParams] = useState({
    theme: currentParams?.theme,
    lang: currentParams?.lang,
    notify: currentParams?.notify
  });
  const [disabledButton, setDisabledButton] = useState(false);
  const enableButton = () => setDisabledButton(false);

  const onSubmit = (event) => {
    if (!disabledButton) {
      event.preventDefault();
      setDisabledButton(true);
      dispatch(onChangeSettings(params, enableButton));
    }
  };

  const handleLangSelect = (lang) => setParams((s) => ({ ...s, lang }));
  const setTheme = (theme) => setParams((s) => ({ ...s, theme }));

  return (
    <>
      {currentParams ? (
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <h4>{__("Персонализация")}</h4>
          </div>

          <form noValidate onSubmit={onSubmit} className={styles.form}>
            <div className={styles.formItem}>
              <label className={styles.label}>{__("Уведомления")}</label>
              <div className={styles.formBlock}>
                <div className={styles.option}>
                  <BellIcon />
                  <p>{__("Звуковое оповещение")}</p>
                </div>

                <div className={styles.switcher} onClick={() => setParams((s) => ({ ...params, notify: !s?.notify }))}>
                  <div
                    className={classNames({
                      [styles.switch]: true,
                      [styles.active]: !!params?.notify
                    })}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formItem}>
              <label className={styles.label}>{__("Тема")}</label>
              <div className={styles.radioBlockWrapper}>
                <div
                  className={styles.radioBlock}
                  onClick={() => {
                    setTheme("blue");
                  }}
                >
                  <div className={styles.radio}>
                    <input
                      name="theme"
                      id="blue"
                      type="radio"
                      className={styles.radioInput}
                      checked={params?.theme === "blue"}
                      onChange={() => {
                        setTheme("blue");
                      }}
                    />
                    <label htmlFor="blue">{__("Синий")}</label>
                  </div>
                  <div
                    style={{
                      backgroundImage: "linear-gradient(180deg, #4543F7 0%, #0A3AAB 100%)"
                    }}
                    className={styles.colorBlock}
                  />
                  <button type="button" style={{ background: "#4086F1" }} className={styles.button}>
                    {__("Кнопка")}
                  </button>
                </div>

                <div
                  className={styles.radioBlock}
                  onClick={() => {
                    setTheme("orange");
                  }}
                >
                  <div className={styles.radio}>
                    <input
                      name="theme"
                      id="orange"
                      type="radio"
                      className={styles.radioInput}
                      checked={params?.theme === "orange"}
                      onChange={() => {
                        setTheme("orange");
                      }}
                    />
                    <label htmlFor="orange">{__("Оранжевый")}</label>
                  </div>
                  <div
                    style={{
                      backgroundImage: "linear-gradient(180deg, #EA7D30 0%, #EA4631 100%)"
                    }}
                    className={styles.colorBlock}
                  />
                  <button type="button" style={{ background: "#F58338" }} className={styles.button}>
                    {__("Кнопка")}
                  </button>
                </div>

                <div
                  className={styles.radioBlock}
                  onClick={() => {
                    setTheme("turquoise");
                  }}
                >
                  <div className={styles.radio}>
                    <input
                      name="theme"
                      id="turquoise"
                      type="radio"
                      className={styles.radioInput}
                      checked={params?.theme === "turquoise"}
                      onChange={() => {
                        setTheme("turquoise");
                      }}
                    />
                    <label htmlFor="turquoise">{__("Берюзовый")}</label>
                  </div>
                  <div
                    style={{
                      backgroundImage: "linear-gradient(180deg, #10AADD 0%, #18697C 100%)"
                    }}
                    className={styles.colorBlock}
                  />
                  <button type="button" style={{ background: "#10AADC" }} className={styles.button}>
                    {__("Кнопка")}
                  </button>
                </div>

                <div
                  className={styles.radioBlock}
                  onClick={() => {
                    setTheme("dark");
                  }}
                >
                  <div className={styles.radio}>
                    <input
                      name="theme"
                      id="dark"
                      type="radio"
                      className={styles.radioInput}
                      checked={params?.theme === "dark"}
                      onChange={() => {
                        setTheme("dark");
                      }}
                    />
                    <label htmlFor="dark">{__("Темный")}</label>
                  </div>
                  <div
                    style={{
                      backgroundImage: "linear-gradient(180deg, #222222 0%, #3F3F3F 100%)"
                    }}
                    className={styles.colorBlock}
                  />
                  <button type="button" style={{ background: "#2C2C2C" }} className={styles.button}>
                    {__("Кнопка")}
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.formItem}>
              <label className={styles.label}>{__("Язык интерфейса")}</label>
              <div className={styles.select}>
                <Select
                  data={langs}
                  className={styles.selectWrap}
                  initValue={params.lang}
                  onChange={handleLangSelect}
                />
              </div>
            </div>

            <div className={styles.submitBlock}>
              <Button
                className={styles.cancelBtn}
                onClick={() => {
                  setParams({
                    theme: currentParams?.theme,
                    lang: currentParams?.lang,
                    notify: currentParams?.notify
                  });
                }}
              >
                {__("Отмена")}
              </Button>
              <Button
                type="submit"
                className={classNames({
                  [styles.submitBtn]: !disabledButton,
                  [styles.cancelBtn]: disabledButton
                })}
              >
                {__("Сохранить")}
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default Personal;
