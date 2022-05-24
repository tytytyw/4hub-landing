import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./InputField.module.sass";
import classnames from "classnames";

const InputField = ({
  value,
  set,
  model,
  mistake,
  switcher,
  isPass,
  height,
  placeholder,
  onSwitch,
  visibility,
  setVisibility,
  comparePass,
  phone,
  disabled,
  editableClass
}) => {
  const [isPassword, setIsPassword] = useState(isPass);

  const switchOn = () => {
    setIsPassword(!isPassword);
    if (onSwitch) onSwitch(!isPassword);
  };

  const deleteReadOnly = (e) => {
    e.target.removeAttribute("readonly");
  };

  return (
    <div
      className={classnames({
        [styles.wrap]: true,
        [styles.redBorder]: mistake,
        [styles[editableClass]]: editableClass
      })}
    >
      <input
        className={classnames({
          [styles.inputField]: true,
          [styles.isPassword]: model === "password"
        })}
        style={{ height }}
        type={model === "password" ? visibility : "text"}
        autoComplete="off"
        readOnly={true}
        value={value}
        placeholder={placeholder}
        onFocus={deleteReadOnly}
        onChange={(e) => {
          let newVal = e.target.value;
          if (comparePass) comparePass(e.target.value);
          if (phone) {
            newVal = newVal.replace(/\D/gim, "");
            const number = newVal.replace(/(\+)*(\()*(\))*\s*(-)*/g, "");
            const length = number.length;
            newVal = `+${number.substring(0, 2)}${length > 2 ? " (" + number.substring(2, 5) : number.substring(2, 5)}${
              length > 5 ? ") " + number.substring(5, 8) : number.substring(5, 8)
            }${length > 8 ? "-" + number.substring(8, 10) : number.substring(8, 10)}${
              length > 10 ? "-" + number.substring(10, number.length) : number.substring(10, number.length)
            }`;
          }
          set(e.target.value !== "+" ? newVal : "");
        }}
        disabled={disabled}
      />
      {isPassword && model === "password" && visibility === "password" && (
        <img
          src="./assets/StartPage/invisible.svg"
          alt="eye"
          className={switcher ? styles.eye : styles.noSwitcher}
          onClick={() => setVisibility("text")}
        />
      )}
      {isPassword && model === "password" && visibility === "text" && (
        <img
          src="./assets/StartPage/eye.svg"
          alt="eye"
          className={switcher ? styles.eye : styles.noSwitcher}
          onClick={() => setVisibility("password")}
        />
      )}
      {switcher && (
        <div className={isPassword ? styles.switcherActive : styles.switcher} onClick={switchOn}>
          <div className={isPassword ? styles.switchActive : styles.switch} />
        </div>
      )}
    </div>
  );
};

export default InputField;

InputField.propTypes = {
  value: PropTypes.string,
  set: PropTypes.func,
  model: PropTypes.oneOf(["password", "text"]),
  mistake: PropTypes.bool,
  switcher: PropTypes.bool,
  isPass: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeholder: PropTypes.string,
  onSwitch: PropTypes.func,
  visibility: PropTypes.oneOf(["password", "text"]),
  setVisibility: PropTypes.func,
  comparePass: PropTypes.func,
  phone: PropTypes.bool,
  disabled: PropTypes.bool,
  editableClass: PropTypes.string
};

InputField.defaultProps = {
  mistake: false,
  switcher: false,
  isPass: false,
  height: "",
  placeholder: "",
  disabled: false,
  editableClass: ""
};
