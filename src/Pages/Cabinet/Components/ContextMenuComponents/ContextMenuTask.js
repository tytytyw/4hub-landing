import ContextMenuItem from "generalComponents/ContextMenu/ContextMenuItem";
import { imageSrc, MODALS, TASK_MODALS } from "generalComponents/globalVariables";
import React from "react";
import { useLocales } from "react-localized";
import { eventProps } from "types/CalendarPage";
// import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { onSetModals } from "Store/actions/CabinetActions";

function ContextMenuTask({ task }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const contextMenuTask = [
    {
      img: "edit",
      name: __("Редактировать задачу"),
      callback: () => {
        // TODO - VZkh - Добавить колбек радектирования задачи
      }
    },
    {
      img: "garbage",
      name: __("Удалить"),
      callback: () => {
        dispatch(
          onSetModals(MODALS.TASKS, {
            type: TASK_MODALS.DELETE_TASK,
            taskChoosen: task,
            params: { width: 420 }
          })
        );
      }
    }
  ];

  const renderMenuItems = () => {
    return contextMenuTask.map((item, i) => {
      return (
        <ContextMenuItem
          key={i}
          width={240}
          height={40}
          text={item.name}
          callback={() => {
            item.callback();
          }}
          imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
        />
      );
    });
  };

  return (
    <>
      <div>{renderMenuItems()}</div>
    </>
  );
}

export default ContextMenuTask;

ContextMenuTask.propTypes = {
  task: eventProps
};
