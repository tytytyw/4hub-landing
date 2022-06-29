import React, { useState } from "react";
import styles from "./GridBoard.module.sass";
import { BOARDS, TASKS_SCHEMA, STYLED_CLASSES } from "../../../../../generalComponents/globalVariables";
import TaskBoard from "./TaskBoard/TaskBoard";
import classNames from "classnames";
import PropTypes from "prop-types";

function GridBoard({ setMouseParams }) {
  const [schema, setSchema] = useState(TASKS_SCHEMA.GRID_BAR); //TODO - if types of view could be changed
  // const [boardPosition] = useState(); //TODO - if position of the element change

  const renderTaskBoards = () =>
    Object.values(BOARDS).map((boardName, i) => (
      <TaskBoard
        key={i}
        type={boardName}
        schema={schema}
        classNameWrap={STYLED_CLASSES[schema][i]}
        setSchema={setSchema}
        setMouseParams={setMouseParams}
      />
    ));

  return <div className={classNames(styles.girdBoardWrap, styles[schema])}>{renderTaskBoards()}</div>;
}

export default GridBoard;

GridBoard.propTypes = {
  setMouseParams: PropTypes.func
};
