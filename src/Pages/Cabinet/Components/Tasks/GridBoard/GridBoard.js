import React, { useState } from "react";
import styles from "./GridBoard.module.sass";
import { BOARDS, SCHEMA, STYLED_CLASSES } from "../../../../../generalComponents/globalVariables";
import TaskBoard from "./TaskBoard/TaskBoard";
import classNames from "classnames";

function GridBoard() {
  const [schema] = useState(SCHEMA.GRID_BAR); //TODO - if types of view could be changed
  const [boardPosition] = useState(STYLED_CLASSES[schema]); //TODO - if position of the element change
  const renderTaskBoards = () =>
    Object.values(BOARDS).map((boardName, i) => (
      <TaskBoard key={i} type={boardName} schema={schema} classNameWrap={boardPosition[i]} />
    ));

  return <div className={classNames(styles.girdBoardWrap, styles[schema])}>{renderTaskBoards()}</div>;
}

export default GridBoard;
