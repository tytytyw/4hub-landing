import React from "react";
import styles from "./TaskBoard.module.sass";
import classes from "../GridBoard.module.sass";
import classNames from "classnames";
import PropTypes from "prop-types";
import { BOARDS, SCHEMA, STYLED_CLASSES } from "../../../../../../generalComponents/globalVariables";
import { useSelector } from "react-redux";

function TaskBoard({ classNameWrap, type }) {
  const { theme } = useSelector((s) => s.user.userInfo);

  return <div className={classNames(styles.taskBoardWrap, classes[classNameWrap], `border-${theme}`)}>{type}</div>;
}

export default TaskBoard;

TaskBoard.propTypes = {
  classNameWrap: PropTypes.oneOf(Object.values(STYLED_CLASSES).reduce((acc, styles) => [...acc, ...styles], [])),
  type: PropTypes.oneOf(Object.values(BOARDS)).isRequired,
  schema: PropTypes.oneOf(Object.values(SCHEMA))
};
