import React, { useEffect, useRef, useState } from "react";

import styles from "./Select.module.sass";
import classNames from "classnames";
import PropTypes from "prop-types";

const Select = ({ data, initValue, onChange, ...props }) => {
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
    if (!value) {
      return props.placeholder;
    }

    const valueItem = data.find((item) => item === value);
    return valueItem;
  };
  return (
    <div
      ref={ref}
      className={classNames({
        [styles.selectWrap]: true,
        [styles.active]: !!open
      })}
    >
      <div
        onClick={() => setOpen(!open)}
        className={classNames({
          [styles.select]: true,
          [styles.selected]: !!value
        })}
      >
        <div className={styles.valueWrap}>
          <span
            className={classNames({
              [styles.selectInput]: true
            })}
          >
            {getValue()}
          </span>
        </div>
        <span
          className={classNames({
            [styles.arrow]: true,
            [styles.active]: !!open
          })}
        />
      </div>

      <div
        className={classNames({
          [styles.contentWrap]: true,
          [styles.active]: !!open
        })}
      >
        <ul className={styles.content}>
          {data.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setOpen(false);
                setValue(item);
                onChange(item);
              }}
              className={classNames({
                [styles.option]: true
              })}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;

Select.propTypes = {
  data: PropTypes.array,
  initValue: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

Select.defaultProps = {
  data: [],
  onChange: () => {}
};
