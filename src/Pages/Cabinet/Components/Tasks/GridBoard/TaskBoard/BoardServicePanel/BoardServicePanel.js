import React from "react";
import styles from "./BoardServicePanel.module.sass";
import PropTypes from "prop-types";
import { BOARDS } from "../../../../../../../generalComponents/globalVariables";
import { useTaskBoardTitle } from "../../../../../../../generalComponents/collections";
import { ReactComponent as FrameIcon } from "assets/PrivateCabinet/tasks/frame.svg";
import classNames from "classnames";
import { ReactComponent as AddIcon } from "../../../../../../../assets/PrivateCabinet/plus-3.svg";
import ThreeDots from "../../../../../../../generalComponents/ThreeDots/ThreeDots";

function BoardServicePanel({ type, isLast }) {
  const TITLE = useTaskBoardTitle();

  return (
    <div className={styles.boardServicePanelWrap}>
      <span className={styles.boardTitle}>{TITLE[type]}</span>
      <div className={styles.buttonsWrap}>
        <FrameIcon />
        {!isLast ? <AddIcon className={classNames(styles.addIcon)} /> : null}
        <ThreeDots />
      </div>
    </div>
  );
}

export default BoardServicePanel;

BoardServicePanel.propTypes = {
  type: PropTypes.oneOf(Object.values(BOARDS)).isRequired,
  isLast: PropTypes.bool
};
