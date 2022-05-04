import React from "react";

import styles from "./Textarea.module.sass";
import classnames from "classnames";
import PropTypes from "prop-types";

const Textarea = ({
  type,
  label,
  value,
  name,
  isMistake,
  readonly,
  onChange,
  onBlur,
}) => {
  const inputType = type || "text";
  const htmlFor = `${inputType}-${Math.random()}`;
  return (
    <div className={styles.inputWrap}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>

      <textarea
        className={classnames({
          [styles.textarea]: true,
          [styles.redBorder]: isMistake,
        })}
        id={htmlFor}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={onBlur}
        readOnly={readonly}
        value={value}
      ></textarea>
    </div>
  );
};

export default Textarea;

Textarea.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  isMistake: PropTypes.bool,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
Textarea.defaultProps = {
  isMistake: false,
  readonly: false,
  onChange: () => {},
  onBlur: () => {},
};
