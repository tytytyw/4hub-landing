import React from "react";
import styles from "./TaskBoard.module.sass";
import classes from "../GridBoard.module.sass";
import classNames from "classnames";
import PropTypes from "prop-types";
import { BOARDS, SCHEMA, STYLED_CLASSES } from "../../../../../../generalComponents/globalVariables";
import { useSelector } from "react-redux";
import BoardServicePanel from "./BoardServicePanel/BoardServicePanel";

function TaskBoard({ classNameWrap, type, schema }) {
  const { theme } = useSelector((s) => s.user.userInfo);

  return (
    <div className={classNames(styles.taskBoardWrap, classes[classNameWrap], `border-${theme}`)}>
      <BoardServicePanel
        type={type}
        isLast={classNameWrap === STYLED_CLASSES[schema][STYLED_CLASSES[schema].length - 1]}
      />
    </div>
  );
}

export default TaskBoard;

TaskBoard.propTypes = {
  classNameWrap: PropTypes.oneOf(Object.values(STYLED_CLASSES).reduce((acc, styles) => [...acc, ...styles], [])),
  type: PropTypes.oneOf(Object.values(BOARDS)).isRequired,
  schema: PropTypes.oneOf(Object.values(SCHEMA))
};
