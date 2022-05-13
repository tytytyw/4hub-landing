import React from "react";
import styles from "./BoardServicePanel.module.sass";
import PropTypes from "prop-types";
import { BOARDS } from "../../../../../../../generalComponents/globalVariables";
import { useTaskBoardTitle } from "../../../../../../../generalComponents/collections";

function BoardServicePanel({ type }) {
  const TITLE = useTaskBoardTitle();

  return (
    <div className={styles.boardServicePanelWrap}>
      <span className={styles.boardTitle}>{TITLE[type]}</span>
    </div>
  );
}

export default BoardServicePanel;

BoardServicePanel.propTypes = {
  type: PropTypes.oneOf(Object.values(BOARDS)).isRequired
};
