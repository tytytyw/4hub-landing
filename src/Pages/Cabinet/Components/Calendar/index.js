import React, { useEffect, useState } from "react";

import styles from "./CalendarPage.module.sass";
import SearchField from "../SearchField";
import StorageSize from "../StorageSize";
import Notifications from "../Notifications";
import Profile from "../Profile/Profile";
import DateBlock from "./DateBlock";
import BottomPanel from "../BottomPanel";
import { useDispatch, useSelector } from "react-redux";
import { onGetAllTasks, onSetModals } from "../../../../Store/actions/CabinetActions";
import SidebarTasks from "./SidebarTasks";
import { CALENDAR_MODALS, imageSrc, MODALS, TASK } from "../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import { monthNameType } from "./helper";
import classnames from "classnames";
import ContextMenu from "generalComponents/ContextMenu";
import ContextMenuTask from "../ContextMenuComponents/ContextMenuTask";
import ListCalendar from "./ListCalendar";
import { formatDateStandard, getStartDate } from "generalComponents/CalendarHelper";
import FullCalendarTable from "./FullCalendar";

const CalendarPage = () => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const myTasks = useSelector((state) => state.Cabinet.myTasks);
  const calendarDate = useSelector((state) => state.Cabinet.calendarDate);
  const { theme } = useSelector((state) => state.user.userInfo);
  const [mouseParams, setMouseParams] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);

  const currentDayTasks = [];

  for (let key in myTasks) {
    if (getStartDate(formatDateStandard(calendarDate)).startsWith(getStartDate(myTasks[key].date_start))) {
      currentDayTasks.push(myTasks[key]);
    }
  }

  useEffect(() => {
    dispatch(onGetAllTasks(TASK.API_GET_TASKS, __("Ошибка загрузки задач")));
  }, []); // eslint-disable-line

  const getStrDate = () => {
    return __(
      `${calendarDate?.getDate()} ${monthNameType?.[calendarDate.getMonth()]}  ${calendarDate.getFullYear()} г`
    );
  };

  const createTask = () => {
    dispatch(
      onSetModals(MODALS.CALENDAR, {
        type: CALENDAR_MODALS.ADD_TASK
      })
    );
  };

  return (
    <div className={styles.parentWrapper}>
      <div className={styles.header}>
        <SearchField />
        <div className={styles.infoHeader}>
          <StorageSize />
          <Notifications />
          <Profile />
        </div>
      </div>

      <div className={styles.contentRight}>
        <div className={classnames(styles.sideMenu, `scrollbar-thin-${theme}`)}>
          <div className={styles.addTaskBlock}>
            <p>{__("Создать задачу")}</p>
            <img
              onClick={createTask}
              className={styles.addTaskIcon}
              src={imageSrc + "./assets/PrivateCabinet/folders/plus-white.svg"}
              alt="Add Task Icon"
            />
          </div>
          <ListCalendar />
          <SidebarTasks tasks={currentDayTasks} setMouseParams={setMouseParams} setChosenFile={setChosenFile} />
        </div>
        <div className={classnames(styles.wrapper, `scrollbar-${theme}`)}>
          <DateBlock />
          <div className={styles.headerBlock}>
            <p className={styles.date}>{getStrDate()}</p>

            <div className={styles.headerBtnWrap}>
              <button className={styles.headerBtn}>
                {myTasks?.length} {__("задач")}
              </button>
            </div>
            <div className={styles.headerBtnWrap}>
              <button className={styles.headerBtn}>{__("1 новая задача")}</button>
              <span className={styles.badge}>3</span>
            </div>
            <div className={styles.headerBtnWrap}>
              <button className={styles.headerBtn}>{__("1 напоминание")}</button>
            </div>
          </div>
          <FullCalendarTable tasks={myTasks} />
        </div>
      </div>
      {mouseParams !== null && (
        <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
          <ContextMenuTask task={chosenFile}></ContextMenuTask>
        </ContextMenu>
      )}
      <BottomPanel />
    </div>
  );
};

export default CalendarPage;
