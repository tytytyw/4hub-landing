import React, { useEffect, useRef, useState } from "react";

import styles from "./Select.module.sass";
import classNames from "classnames";
import PropTypes from "prop-types";

const Select = ({ value, ...props }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => setOpen(false), [value]);

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

    return value;
  };

  return (
    <div
      ref={ref}
      className={classNames({
        [styles.selectWrap]: true,
        [styles.active]: !!open
      })}
    >
      <div onClick={() => setOpen(!open)} className={styles.select}>
        <span className={styles.selectInput}>{getValue()}</span>
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
        {props.children}
      </div>
    </div>
  );
};

export default Select;

Select.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.element
};
