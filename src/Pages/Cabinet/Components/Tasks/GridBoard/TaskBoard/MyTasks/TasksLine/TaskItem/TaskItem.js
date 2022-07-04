import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TaskItem.module.sass";
import { taskTypes } from "types/Tasks";
import { ReactComponent as ChatSvg } from "assets/PrivateCabinet/minitoolbar/messages.svg";
import { ReactComponent as EditSvg } from "assets/PrivateCabinet/tasks/editing.svg";
import { ReactComponent as GarbageSVG } from "assets/PrivateCabinet/garbage.svg";
import ThreeDots from "generalComponents/ThreeDots/ThreeDots";
import ContextMenu from "generalComponents/ContextMenu";
import ContextMenuItem from "generalComponents/ContextMenu/ContextMenuItem";
import { useContextMenuTasks, useMenuTasksStatus, useTaskMessages } from "generalComponents/collections";
import { useDispatch } from "react-redux";
import { onEditTask } from "Store/actions/TasksActions";
import {
  contextMenuTask,
  imageSrc,
  MODALS,
  TASK_MODALS,
  TASK_TYPES,
  URGENCY_TYPES
} from "generalComponents/globalVariables";
import { onSetModals } from "Store/actions/CabinetActions";
import { useLocales } from "react-localized";

const TaskItem = ({ task, number }) => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const [mouseParams, setMouseParams] = useState(null);
  const statusMenu = useMenuTasksStatus();
  const taskContextMenu = useContextMenuTasks();
  const closeContextMenu = () => setMouseParams(null);
  const messages = useTaskMessages();

  const changeStatus = (type) => {
    const payload = { ...task, id_status: type };
    dispatch(onEditTask(payload, messages.STATUS));
  };
  const callbacks = {
    [contextMenuTask.DELETE]: () => {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.DELETE_TASK,
          params: { width: 420, ...task }
        })
      );
    },
    [contextMenuTask.CUSTOMIZE]: () => {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.EDIT_TASK,
          params: { width: 769, ...task }
        })
      );
    },
    [contextMenuTask.ADD_COMMENT]: () => {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.ADD_COMMENT_TASK,
          params: { width: 769, ...task }
        })
      );
    },
    [contextMenuTask.ADD_REMINDER]: () => {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.ADD_REMINDER,
          params: { width: 769, ...task }
        })
      );
    }
  };

  return (
    <div
      className={styles.taskWrap}
      style={{ background: task.id_act === URGENCY_TYPES.URGENT ? "rgba(175, 102, 201, 0.1)" : task?.id_color?.light }}
    >
      <span className={styles.number}>{number}</span>
      <span className={styles.name}>{task.name}</span>
      <div className={styles.iconBox} onClick={callbacks[contextMenuTask.ADD_COMMENT]}>
        <ChatSvg className={styles.chatsvg} />
      </div>
      <div className={styles.iconBox} onClick={callbacks[contextMenuTask.CUSTOMIZE]}>
        <EditSvg className={styles.editsvg} />
      </div>
      <div className={styles.iconBox} onClick={callbacks[contextMenuTask.DELETE]}>
        <GarbageSVG className={styles.garbage} />
      </div>
      <div
        style={{
          background: statusMenu[task.id_status]?.color,
          boxShadow: `0px 2px 4px ${statusMenu[task.id_status]?.color}`
        }}
        className={styles.statusBox}
        onClick={(e) =>
          setMouseParams({
            x: e.clientX,
            y: e.clientY,
            width: 146,
            height: 20,
            type: "status"
          })
        }
      >
        {task?.id_status ? statusMenu[task.id_status].name : __("Статус")}
      </div>
      <ThreeDots
        onClick={(e) =>
          setMouseParams({
            x: e.clientX,
            y: e.clientY,
            width: 200,
            height: 22,
            type: "menu"
          })
        }
      />
      {mouseParams !== null && (
        <ContextMenu params={mouseParams} setParams={closeContextMenu} tooltip={true}>
          {mouseParams.type === "status" &&
            Object.entries(statusMenu).map(([type, value]) => (
              <div className={styles.itemMenu} key={type}>
                <div className={styles.circle} style={{ background: value.color }} />
                <ContextMenuItem
                  width={mouseParams.width}
                  height={mouseParams.height}
                  text={value.name}
                  callback={() => changeStatus(type)}
                />
              </div>
            ))}

          {mouseParams.type === "menu" && (
            <div className={styles.mainMenuItems}>
              {taskContextMenu[TASK_TYPES.TASK].map((item) => (
                <div className={styles.itemMenu} key={item.type}>
                  <ContextMenuItem
                    width={mouseParams.width}
                    height={mouseParams.height}
                    text={item.name}
                    callback={callbacks[item.type]}
                    imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuTasks/${item.img}.svg`}
                  />
                </div>
              ))}
            </div>
          )}
        </ContextMenu>
      )}
    </div>
  );
};

export default TaskItem;

TaskItem.propTypes = {
  task: taskTypes,
  number: PropTypes.number
};
