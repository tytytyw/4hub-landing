import classNames from "classnames";
import React, { useState } from "react";

import styles from "./AccessRadio.module.sass";
import PropTypes from "prop-types";

const AccessRadio = ({ data, name, onChange }) => {
  const [value, setValue] = useState("");

  const handleCheck = (item) => {
    setValue(item.value);
    onChange(item.value);
  };

  return (
    <>
      {data.map((item, index) => {
        const id = `${name}_${index}`;

        return (
          <div
            key={item.value}
            className={classNames({
              [styles.radio]: true,
              [styles.checked]: value === item.value
            })}
          >
            <input id={id} type="radio" name={name} onChange={() => handleCheck(item)} />
            <label htmlFor={id}>
              <p>{item.label}</p>
              <span>{item.info}</span>
            </label>
          </div>
        );
      })}
    </>
  );
};

export default AccessRadio;

AccessRadio.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.number,
      label: PropTypes.string,
      info: PropTypes.string
    })
  ),
  onChange: PropTypes.func
};
AccessRadio.defaultProps = {
  data: []
};
