import classNames from "classnames";
import React from "react";
import styles from "./SubOptionButton.module.sass";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { DARK } from "../../../../../../../../generalComponents/globalVariables";

const SubOptionButton = ({ subOption, activeSubOption, setActiveSubOption }) => {
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);

  return (
    <div
      className={classNames({
        [styles.button]: true,
        [styles.active]: subOption.name === activeSubOption.name,
        [styles.darkTheme]: chatTheme.name === DARK
      })}
      onClick={() => setActiveSubOption(subOption)}
    >
      {subOption.title}
    </div>
  );
};

export default SubOptionButton;

SubOptionButton.propTypes = {
  subOption: PropTypes.object.isRequired,
  activeSubOption: PropTypes.object,
  setActiveSubOption: PropTypes.func.isRequired
};
