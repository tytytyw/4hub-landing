import React, { useEffect, useRef, useState } from "react";

import styles from "./AdminSelec.module.sass";
import classNames from "classnames";

import checkedImg from "../../../../../assets/BusinessCabinet/checked.svg";
import PropTypes from "prop-types";

const AdminSelect = ({ data, initValue, error, onSelect, ...props }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initValue);
  const ref = useRef();

  useEffect(() => {
    const onClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const getValue = () => {
    if (!value && value !== 0) {
      return props.placeholder;
    }

    const valueItem = data.find((item) => item?.id === value);
    return valueItem?.text;
  };

  const onSelectOption = (item) => {
    setOpen(false);
    setValue(item.id);
    onSelect(item.id);
  };

  return (
    <div
      ref={ref}
      className={classNames({
        [styles.wrapper]: true,
        [styles.active]: !!open,
        [styles.error]: !!error
      })}
    >
      <div onClick={() => setOpen(!open)} className={styles.select}>
        <p className={styles.value}>{getValue()}</p>
        <span className={styles.arrow} />
      </div>

      <ul className={styles.list}>
        {data.map((item, index) => (
          <li
            key={index}
            onClick={() => onSelectOption(item)}
            className={classNames({
              [styles.option]: true,
              [styles.active]: value === item.id
            })}
          >
            <div className={styles.radioCheck}>
              {value === item.id ? <img src={checkedImg} alt="checked" /> : <span className={styles.circle} />}
            </div>
            <div className={styles.content}>
              <h4 className={styles.optionTitle}>{item.text}</h4>
              <p className={styles.optionText}>{item.info}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSelect;

AdminSelect.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      text: PropTypes.string,
      info: PropTypes.string
    })
  ),
  initValue: PropTypes.string,
  error: PropTypes.bool,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string
};

AdminSelect.defaultProps = {
  data: [],
  error: false,
  onSelect: () => {}
};
