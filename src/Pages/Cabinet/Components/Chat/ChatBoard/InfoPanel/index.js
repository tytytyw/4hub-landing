import React, { useState } from "react";
import styles from "./InfoPanel.module.sass";

import MainPanel from "./MainPanel";
import Media from "./Media";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

const InfoPanel = ({ setAction }) => {
  const [option, setOption] = useState("main");
  const chatTheme = useSelector(state => state.Cabinet.chat.theme)

  return (
    <div className={classNames({ [styles.wrapper]: true, [styles.darkTheme]: chatTheme.name === 'dark' })}>
      {option === "main" ? (
        <MainPanel setAction={setAction} setOption={setOption} />
      ) : null}
      {option === "media" ? <Media setOption={setOption} /> : null}
    </div>
  );
};

export default InfoPanel;

InfoPanel.propTypes = {
  setAction: PropTypes.func.isRequired
};
