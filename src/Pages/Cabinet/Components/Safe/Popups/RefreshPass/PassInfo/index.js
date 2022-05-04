import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./PassInfo.module.sass";
import { ReactComponent as CheckedIcon } from "../../../../../../../assets/PrivateCabinet/safe/checked.svg";
import classNames from "classnames";
import { hasNumOrChar, hasUpperLowerCase } from "./helper";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const PassInfo = ({ setVisible, value, inputRef, setEnable }) => {
  const { __ } = useLocales();
  const ref = useRef();

  const [data, setData] = useState([
    { id: 1, label: __("Cодержит не менее 8 симв."), checked: false },
    {
      id: 2,
      label: __("Содержит как строчные (a-z), так и прописные буквы (A-Z)"),
      checked: false
    },
    {
      id: 3,
      label: __("Содержит по крайней мере одну цифру (0-9) или символ"),
      checked: false
    },
    {
      id: 4,
      label: __("Не содержит ваше имя или адрес электронной почты"),
      checked: false
    },
    {
      id: 5,
      label: __("Не часто используется или предыдущий пароль"),
      info: true
    }
  ]);

  const checkEnable = useCallback(() => {
    return value?.length >= 8 && hasUpperLowerCase(value) && hasNumOrChar(value);
  }, [value]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setEnable(checkEnable()), [checkEnable]);

  useEffect(() => {
    const onClick = (event) => {
      if (!ref.current?.contains(event.target) && !inputRef.current?.contains(event.target) && checkEnable())
        setVisible(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [checkEnable, setVisible, inputRef]);

  useEffect(() => {
    setData([
      {
        id: 1,
        label: __("Cодержит не менее 8 симв."),
        checked: value?.length >= 8
      },
      {
        id: 2,
        label: __("Содержит как строчные (a-z), так и прописные буквы (A-Z)"),
        checked: hasUpperLowerCase(value)
      },
      {
        id: 3,
        label: __("Содержит по крайней мере одну цифру (0-9) или символ"),
        checked: hasNumOrChar(value)
      },
      {
        id: 4,
        label: __("Не содержит ваше имя или адрес электронной почты"),
        checked: false
      },
      {
        id: 5,
        label: __("Не часто используется или предыдущий пароль"),
        info: true
      }
    ]);
  }, [value]);

  return (
    <div ref={ref} className={styles.infoBlock}>
      <ul className={styles.infoList}>
        {data?.map((item, index) => (
          <li className={styles.infoItem} key={index}>
            {!item?.info ? (
              <CheckedIcon
                className={classNames({
                  [styles.uncheck]: true,
                  [styles.checked]: !!item?.checked
                })}
              />
            ) : (
              <span className={styles.uncheck} />
            )}
            <p>{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PassInfo;

PassInfo.propTypes = {
  setVisible: PropTypes.func,
  value: PropTypes.string,
  inputRef: PropTypes.object,
  setEnable: PropTypes.func
};
