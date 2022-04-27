import React from "react";

import styles from "./Input.module.sass";
import classnames from "classnames";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";

const Input = ({
  type,
  disabled,
  className,
  showEye = true,
  isMistake = false,
  showPass = false,
  phone,
  isName,
  setShowPass = () => {},
  onChange = () => {},
  onKeyPress = () => {},
  ...props
}) => {
  const inputType = type ?? "text";
  const htmlFor = `${inputType}-${Math.random()}`;

  const getType = () => {
    switch (type) {
      case "password":
        return showPass ? "text" : "password";
      default:
        return type;
    }
  };

  const getEyeImg = () =>
    showPass
      ? `${imageSrc}assets/StartPage/eye.svg`
      : `${imageSrc}assets/StartPage/invisible.svg`;

  const maskPhoneNumber = number => {
    const tempValue = number.replace(/\D/gim, "");

    return tempValue.replace(
      ...({
        2: [/(\d{2})/g, "+$1"],
        3: [/(\d{2})/g, "+$1("],
        4: [/(\d{2})(\d{0,3})/g, "+$1($2"],
        5: [/(\d{2})(\d{3})/g, "+$1($2"],
        6: [/(\d{2})(\d{3})(\d{0,3})/g, "+$1($2) $3"],
        7: [/(\d{2})(\d{3})(\d{1,3})/g, "+$1($2) $3"],
        8: [/(\d{2})(\d{3})(\d{3})/g, "+$1($2) $3"],
        9: [/(\d{2})(\d{3})(\d{3})(\d{0,2})/g, "+$1($2) $3 $4"],
        10: [/(\d{2})(\d{3})(\d{3})(\d{2})/g, "+$1($2) $3 $4"],
        11: [/(\d{2})(\d{3})(\d{3})(\d{2})(\d{0,2})/g, "+$1($2) $3 $4 $5"],
        12: [/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/g, "+$1($2) $3 $4 $5"]
      }[tempValue.length] || [])
    );
  };

  const onChangeHandler = event => {
    let { value } = event.target;
    if (phone) {
      event.target.value = maskPhoneNumber(value);
    }
    if (isName && event.target.value) {
      event.target.value =
        event.target.value[0].toUpperCase() + event.target.value.slice(1);
    }
    onChange(event);
  };

  return (
    <>
      {props.label && (
        <label className={styles.label} htmlFor={htmlFor}>
          {props.label}
          {props.required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.inputWrap}>
        <input
          className={classnames({
            [styles.input]: true,
            [className]: !!className,
            [styles.redBorder]: isMistake && !disabled
          })}
          id={htmlFor}
          type={getType()}
          disabled={disabled}
          maxLength={phone ? 18 : props.maxLength}
          onChange={onChangeHandler}
          onKeyPress={onKeyPress}
          value={props.value}
          name={props.name}
          placeholder={props.placeholder}
          autoComplete="new-password"
          //{...props}
        />
        {type === "password" && showEye && (
          <img
            src={getEyeImg()}
            alt="eye"
            className={styles.eye}
            onClick={() => !disabled && setShowPass(!showPass)}
          />
        )}
      </div>
    </>
  );
};

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.any,
  showEye: PropTypes.bool,
  isMistake: PropTypes.bool,
  showPass: PropTypes.bool,
  phone: PropTypes.bool,
  isName: PropTypes.any,
  setShowPass: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.any,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string
};

Input.defaultProps = {
  showEye: true,
  isMistake: false,
  showPass: false,
  setShowPass: () => {},
  onChange: () => {},
  onKeyPress: () => {}
};
