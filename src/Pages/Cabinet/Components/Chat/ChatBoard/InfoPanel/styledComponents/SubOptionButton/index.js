import classNames from "classnames";
import React from "react";
import styles from "./SubOptionButton.module.sass";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const SubOptionButton = ({ subOption, activeSubOption, setActiveSubOption }) => {
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);

  return (
    <div
      className={classNames({
        [styles.button]: true,
        [styles.active]: subOption.id === activeSubOption.id,
        [styles.darkTheme]: chatTheme.name === "dark"
      })}
      onClick={() => setActiveSubOption(subOption)}
    >
      {subOption.name}
    </div>
  );
};

export default SubOptionButton;

SubOptionButton.propTypes = {
  subOption: PropTypes.object.isRequired,
  activeSubOption: PropTypes.object,
  setActiveSubOption: PropTypes.func.isRequired
};
