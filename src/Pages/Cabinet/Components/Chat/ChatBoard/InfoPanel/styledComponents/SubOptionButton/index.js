import classNames from "classnames";
import React from "react";
import styles from "./SubOptionButton.module.sass";
import PropTypes from "prop-types";

const SubOptionButton = ({ name, id, subOption, setSubOption }) => {
  return (
    <div
      className={classNames({
        [styles.button]: true,
        [styles.active]: subOption === id
      })}
      onClick={() => setSubOption(id)}
    >
      {name}
    </div>
  );
};

export default SubOptionButton;

SubOptionButton.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  subOption: PropTypes.string.isRequired,
  setSubOption: PropTypes.func.isRequired
};
