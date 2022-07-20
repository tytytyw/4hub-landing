import React, { useState } from "react";
import "theme/theme.sass";
import styles from "./Notes.module.sass";
import { useLocales } from "react-localized";
import { ReactComponent as AddIcon } from "../../../../../assets/PrivateCabinet/plus-3.svg";
import {
  contextMenuTask,
  imageSrc,
  MODALS,
  TASK_MODALS,
  TASK_TYPES
} from "../../../../../generalComponents/globalVariables";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../Store/actions/CabinetActions";
import Note from "./Note/Note";
import { getStorageItem } from "generalComponents/StorageHelper";
import ContextMenu from "generalComponents/ContextMenu";
import ContextMenuItem from "generalComponents/ContextMenu/ContextMenuItem";
import { useContextMenuTasks } from "generalComponents/collections";

function Notes() {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const { theme } = useSelector((s) => s.user.userInfo);
  const chosenTask = useSelector((s) => s.Tasks.chosenTask);
  const myTasks = useSelector((s) => s.Tasks.myTasks).filter((item) => item.id_type === TASK_TYPES.NOTES);
  const [mouseParams, setMouseParams] = useState(null);
  const contextMenu = useContextMenuTasks();

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

  const onAddNote = () =>
    dispatch(
      onSetModals(MODALS.TASKS, {
        type: TASK_MODALS.ADD_NOTE,
        params: {
          width: 420,
          tags: " ",
          id_color: "",
          prim: "",
          name: "note",
          id_dep: JSON.parse(getStorageItem("taskDepartment"))?.id,
          id_type: TASK_TYPES.NOTES
        }
      })
    );

  return (
    <div className={styles.notesWrap}>
      <div className={classNames(styles.emptyNote, `interaction-border-${theme}`)} onClick={onAddNote}>
        <AddIcon className={styles.addIcon} />
        <span className={styles.text}>{__("Создать заметку")}</span>
        <img
          src={`${imageSrc}assets/PrivateCabinet/tasks/corners/corner-grey.svg`}
          alt="img"
          className={styles.corner}
        />

        {myTasks.length === 0 && (
          <>
            <img
              className={styles.emptyImg}
              src={`${imageSrc}assets/PrivateCabinet/create_arrow.svg`}
              alt="Create Arrow"
            />
            <img
              className={styles.inscription}
              src={`${imageSrc}assets/PrivateCabinet/tasks/inscriptions/notes.svg`}
              alt="inscription"
            />
          </>
        )}
      </div>
      {myTasks.length > 0 && myTasks.map((note) => <Note key={note.id} note={note} setMouseParams={setMouseParams} />)}

      {mouseParams !== null && (
        <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
          <div className={styles.mainMenuItems}>
            {contextMenu[TASK_TYPES.NOTES].map((item, i) => (
              <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={callbacks[item.type]}
                imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
              />
            ))}
          </div>
        </ContextMenu>
      )}
    </div>
  );
}

export default Notes;
