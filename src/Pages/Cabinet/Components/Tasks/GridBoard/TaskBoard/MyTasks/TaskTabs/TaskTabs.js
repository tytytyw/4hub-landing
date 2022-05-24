import React from "react";
import styles from "./TaskTabs.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as AddIcon } from "../../../../../../../../assets/PrivateCabinet/plus-3.svg";
import { useDispatch, useSelector } from "react-redux";
import { imageSrc, MODALS, TASK_MODALS } from "../../../../../../../../generalComponents/globalVariables";
import { onSetModals } from "../../../../../../../../Store/actions/CabinetActions";

function TaskTabs({ taskTabs, chosen }) {
  const dispatch = useDispatch();
  const { theme } = useSelector((s) => s.user.userInfo);

  const renderTaskTabs = () =>
    taskTabs.map((tab, i) => (
      <div
        key={i}
        className={classNames(styles.taskButton, `interaction-background-${theme}`, {
          [`button-${theme}`]: i === 0 && !chosen //chosen
        })}
      >
        {tab}
      </div>
    ));

  const addTask = () =>
    dispatch(
      onSetModals(MODALS.TASKS, {
        type: TASK_MODALS.ADD_TASK,
        params: {
          width: 769,
          tag: "",
          color: "",
          sign: "",
          emoji: "",
          category: "",
          urgency: "",
          startDate: "",
          endDate: "",
          taskName: "",
          text: ""
        }
      })
    );

  return (
    <div className={styles.taskTabWrap}>
      <div className={styles.addIconWrap}>
        <AddIcon className={classNames(styles.addIcon)} onClick={addTask} />
        <img
          className={styles.emptyImg}
          src={`${imageSrc}assets/PrivateCabinet/create_arrow_reverse.svg`}
          alt="Create Arrow"
        />
        <img
          className={styles.inscription}
          src={`${imageSrc}assets/PrivateCabinet/tasks/inscriptions/tasks-board.png`}
          alt="inscription"
        />
      </div>
      {renderTaskTabs()}
    </div>
  );
}

export default TaskTabs;

TaskTabs.defaultProps = {
  taskTans: [],
  chosen: false
};

TaskTabs.propTypes = {
  taskTabs: PropTypes.arrayOf(PropTypes.string), //TODO wait for BE
  chosen: PropTypes.bool
};
