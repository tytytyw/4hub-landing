import ContextMenuItem from "generalComponents/ContextMenu/ContextMenuItem";
import { imageSrc } from "generalComponents/globalVariables";
import React from "react";
import { useLocales } from "react-localized";
import { eventProps } from "types/CalendarPage";
// import PropTypes from "prop-types";

function ContextMenuTask({ task }) {
  const { __ } = useLocales();
  //mylog
  console.log(task);

  const array = [
    {
      type: "restore",
      img: "restore",
      name: __("Редактировать"),
      text: __(""),
      callback: () => {
        //mylog
        console.log("hi");
        // fileCartRestore(file.fid, dispatch, "", __("Файл успешно восстановлен"), __);
      }
    },
    {
      type: "restore",
      img: "restore",
      name: __("Удалить"),
      text: __(""),
      callback: () => {
        //mylog
        console.log("del");
        // fileCartRestore(file.fid, dispatch, "", __("Файл успешно восстановлен"), __);
      }
    }
  ];

  const renderMenuItems = () => {
    return array.map((item, i) => {
      return (
        <ContextMenuItem
          key={i}
          width={240}
          height={"auto"}
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
