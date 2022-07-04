import React, { useState } from "react";
import styles from "./DayTimetable.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import ThreeDots from "../../../../../../../generalComponents/ThreeDots/ThreeDots";
import { taskTypes } from "types/Tasks";
import { getFormatTime } from "generalComponents/generalHelpers";
import { onSelectTask } from "Store/actions/TasksActions";
import { contextMenuTask, imageSrc, MODALS, TASK_MODALS } from "generalComponents/globalVariables";
import ContextMenu from "generalComponents/ContextMenu";
import ContextMenuItem from "generalComponents/ContextMenu/ContextMenuItem";
import { useContextMenuTasks } from "generalComponents/collections";
import { onSetModals } from "Store/actions/CabinetActions";

function DayTimetable({ timePeriod, tasks, type }) {
  const dispatch = useDispatch();
  const { theme } = useSelector((s) => s.user.userInfo);
  const chosenTask = useSelector((s) => s.Tasks.chosenTask);
  const contextMenu = useContextMenuTasks();
  const [mouseParams, setMouseParams] = useState(null);

  const callbacks = {
    [contextMenuTask.DELETE]: () => {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.DELETE_TASK,
          params: { width: 420, ...chosenTask }
        })
      );
    },

    [contextMenuTask.CUSTOMIZE]: () => {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.EDIT_TASK,
          params: { width: 420, ...chosenTask }
        })
      );
    }
  };

  const selectTask = (task) => dispatch(onSelectTask(task));

  const renderTask = (hour) => {
    const h = hour.split(":")[0];
    const timeTask = tasks.filter((item) => {
      const dateTask = `0${new Date(item.date_start).getHours().toString()}`.slice(-2);
      return dateTask === h;
    });
    return timeTask;
  };

  const renderTimetableLine = () =>
    timePeriod.map((hours, i) => (
      <div key={i}>
        {tasks.length > 0 ? (
          renderTask(hours).length > 0 ? (
            renderTask(hours).map((el) => (
              <div key={el.id} className={classNames(styles.dayLine, styles.fill)} onClick={() => selectTask(el)}>
                <span className={styles.time}>{getFormatTime(el.date_start)}</span>
                <span className={styles.name}> {el.name}</span>
                <ThreeDots onClick={(e) => setMouseParams({ x: e.clientX, y: e.clientY, width: 200, height: 25 })} />
              </div>
            ))
          ) : (
            <div className={classNames(styles.dayLine)}>{hours}</div>
          )
        ) : (
          <div className={classNames(styles.dayLine)}>{hours}</div>
        )}
      </div>
    ));

  return (
    <div className={classNames(styles.dayTimetableWrap, `scrollbar-medium-${theme}`)}>
      {renderTimetableLine()}
      {mouseParams !== null && (
        <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
          <div className={styles.mainMenuItems}>
            {contextMenu[type].map((item, i) => (
              <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={callbacks[item.type]}
                imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuTasks/${item.img}.svg`}
              />
            ))}
          </div>
        </ContextMenu>
      )}
    </div>
  );
}

export default DayTimetable;

DayTimetable.defaultProps = {
  timePeriod: []
};

DayTimetable.propTypes = {
  timePeriod: PropTypes.arrayOf(PropTypes.string), //list of hours per day
  tasks: PropTypes.arrayOf(taskTypes),
  type: PropTypes.string
};
