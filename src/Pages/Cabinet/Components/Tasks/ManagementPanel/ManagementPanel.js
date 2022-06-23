import React, { useEffect, useState } from "react";
import styles from "./ManagementPanel.module.sass";
import { useLocales } from "react-localized";
import {
  BUTTON_TYPES,
  contextMenuFolder,
  // CONTEXT_MENU_FOLDER,
  imageSrc,
  // LIBRARY_MODALS,
  MODALS,
  TASK_MODALS
} from "../../../../../generalComponents/globalVariables";
import Button from "../../../../../generalComponents/CustomableButton/CustomableButton";
import { ReactComponent as Bag } from "assets/PrivateCabinet/tasks/bag.svg";
import { ReactComponent as Home } from "assets/PrivateCabinet/tasks/home.svg";
import { ReactComponent as AddIcon } from "../../../../../assets/PrivateCabinet/plus-3.svg";
import classNames from "classnames";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import { onSetModals } from "../../../../../Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";
import { onFetchTaskDepartment, selectDepartment } from "Store/actions/TasksActions";
import ThreeDots from "generalComponents/ThreeDots/ThreeDots";
import { useContextMenuFolderLibrary, useStandartTasksDepartment } from "generalComponents/collections";
import ContextMenu from "generalComponents/ContextMenu";
import ContextMenuItem from "generalComponents/ContextMenu/ContextMenuItem";

function ManagementPanel() {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const standartDepartment = useStandartTasksDepartment();
  const contextMenuFolderLibrary = useContextMenuFolderLibrary();
  const department = useSelector((state) => state.Tasks.dep);
  const currentDep = useSelector((state) => state.Tasks.currentDep);
  const [mouseParams, setMouseParams] = useState(null);

  useEffect(() => {
    dispatch(onFetchTaskDepartment());
  }, []); //eslint-disable-line

  const callbacks = {
    [contextMenuFolder.CUSTOMIZE]: () =>
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.EDIT_SECTION,
          params: { width: 420, title: currentDep.name, icon: currentDep.icon, id: currentDep.id }
        })
      ),
    [contextMenuFolder.DELETE]: () =>
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.DELETE_SECTION,
          params: { width: 420, title: currentDep.name, icon: currentDep.icon, id: currentDep.id }
        })
      )
  };

  const closeContextMenu = () => setMouseParams(null);

  const onSelectDep = (dep) => dispatch(selectDepartment({ id: dep.id, name: dep.name, icon: dep.icon }));

  const onAddSection = () =>
    dispatch(onSetModals(MODALS.TASKS, { type: TASK_MODALS.ADD_SECTION, params: { width: 420, title: "" } }));

  const onClickDots = (e) =>
    setMouseParams({
      x: e.clientX,
      y: e.clientY,
      width: 200,
      height: 25
    });

  return (
    <div className={styles.panelWrap}>
      <Button
        style={BUTTON_TYPES.LIGHT_LONG}
        onClick={() => onSelectDep(standartDepartment.WORK_TASK.id_dep, standartDepartment.WORK_TASK.name)}
        isSelected={standartDepartment.WORK_TASK.id_dep === currentDep.id}
      >
        <Bag />
        <span className={styles.text}>{standartDepartment.WORK_TASK.name}</span>
        <PlayIcon className={styles.playIcon} />
      </Button>
      <Button
        style={BUTTON_TYPES.LIGHT_LONG}
        onClick={() => onSelectDep(standartDepartment.HOME_TASK.id_dep, standartDepartment.HOME_TASK.name)}
        isSelected={standartDepartment.HOME_TASK.id_dep === currentDep.id}
      >
        <Home />
        <span className={styles.text}>{standartDepartment.HOME_TASK.name}</span>
        <PlayIcon className={styles.playIcon} />
      </Button>
      {department?.length > 0 &&
        department.map((dep) => (
          <Button
            key={dep.id}
            style={BUTTON_TYPES.LIGHT_LONG}
            onClick={() => onSelectDep(dep)}
            isSelected={dep.id === currentDep.id}
          >
            {dep.icon ? (
              <img src={`${imageSrc}assets/PrivateCabinet/library/own/${dep.icon}.svg`} alt={dep.icon} />
            ) : (
              <Bag />
            )}
            <span className={styles.text}>{dep.name}</span>
            <PlayIcon className={styles.playIcon} />
            <ThreeDots onClick={onClickDots} />
          </Button>
        ))}
      <Button style={BUTTON_TYPES.LIGHT_LONG} onClick={onAddSection}>
        <AddIcon className={classNames(styles.addIcon)} />
        <span className={styles.text}>{__("Создать раздел")}</span>{" "}
      </Button>
      {mouseParams !== null ? (
        <ContextMenu params={mouseParams} setParams={closeContextMenu} tooltip={true}>
          <div className={styles.mainMenuItems}>
            {contextMenuFolderLibrary.map((item, i) => (
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
      ) : null}
    </div>
  );
}

export default ManagementPanel;
