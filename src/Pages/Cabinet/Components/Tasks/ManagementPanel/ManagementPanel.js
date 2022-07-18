import React, { useEffect, useState } from "react";
import styles from "./ManagementPanel.module.sass";
import { useLocales } from "react-localized";
import { BUTTON_TYPES, MODALS, taskDepartmentKey, TASK_MODALS } from "../../../../../generalComponents/globalVariables";
import Button from "../../../../../generalComponents/CustomableButton/CustomableButton";
import { ReactComponent as CalendarIcon } from "assets/PrivateCabinet/calendar-2.svg";
import { ReactComponent as AddIcon } from "../../../../../assets/PrivateCabinet/plus-3.svg";
import classNames from "classnames";
import { onSetModals } from "../../../../../Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";
import { onFetchTaskDepartment } from "Store/actions/TasksActions";
import { setStorageItem } from "generalComponents/StorageHelper";
import DepartmentItem from "./DepartmentItem/DepartmentItem";
import PopUp from "generalComponents/PopUp";
import CalendarMonth from "../Calendar/CalendarMonth";
import CalendarYear from "../Calendar/CalendarYear";
import { useDepartmentsOfTasks } from "../hooks/GetDepartment";

function ManagementPanel() {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const department = useDepartmentsOfTasks();
  const currentDep = useSelector((state) => state.Tasks.currentDep);
  const [openMonthCalendar, setOpenMonthCalendar] = useState(false);
  const [openYearCalendar, setOpenYearCalendar] = useState(null);

  useEffect(() => {
    dispatch(onFetchTaskDepartment(__("Ошибка при получении разделов")));
  }, []); //eslint-disable-line

  useEffect(() => {
    setStorageItem(taskDepartmentKey, JSON.stringify(currentDep));
  }, [currentDep]);

  const onAddSection = () =>
    dispatch(onSetModals(MODALS.TASKS, { type: TASK_MODALS.ADD_SECTION, params: { width: 420, title: "" } }));

  return (
    <div className={styles.panelWrap}>
      <CalendarIcon className={styles.calendarIcon} onClick={() => setOpenMonthCalendar(true)} />
      {department?.length > 0 && department.map((dep, i) => <DepartmentItem key={i} dep={dep} />)}
      <Button style={BUTTON_TYPES.LIGHT_LONG} onClick={onAddSection}>
        <AddIcon className={classNames(styles.addIcon)} />
        <span className={styles.text}>{__("Создать раздел")}</span>
      </Button>
      {openMonthCalendar && (
        <PopUp set={setOpenMonthCalendar} zIndex={102}>
          <CalendarMonth setShowCalendar={setOpenMonthCalendar} setOpenYearCalendar={setOpenYearCalendar} />
        </PopUp>
      )}
      {openYearCalendar && (
        <PopUp>
          <CalendarYear year={openYearCalendar} setOpenYearCalendar={setOpenYearCalendar} />
        </PopUp>
      )}
    </div>
  );
}

export default ManagementPanel;
