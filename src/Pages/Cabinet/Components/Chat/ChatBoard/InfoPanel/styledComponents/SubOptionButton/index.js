import classNames from "classnames";
import React from "react";
import styles from "./SubOptionButton.module.sass";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const SubOptionButton = ({ name, id, subOption, setSubOption }) => {
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);

  return (
    <div
      className={classNames({
        [styles.button]: true,
        [styles.active]: subOption === id,
        [styles.darkTheme]: chatTheme.name === "dark",
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
  setSubOption: PropTypes.func.isRequired,
};
