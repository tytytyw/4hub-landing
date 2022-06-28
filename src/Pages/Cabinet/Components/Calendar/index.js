import React, { useEffect, useState } from "react";

import styles from "./CalendarPage.module.sass";
import SearchField from "../SearchField";
import StorageSize from "../StorageSize";
import Notifications from "../Notifications";
import Profile from "../Profile/Profile";
import DateBlock from "./DateBlock";
import BottomPanel from "../BottomPanel";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../Store/actions/CabinetActions";
import SidebarTasks from "./SidebarTasks";
import { CALENDAR_MODALS, imageSrc, MODALS } from "../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import { monthNameType } from "./helper";
import classnames from "classnames";
import ContextMenu from "generalComponents/ContextMenu";
import ContextMenuTask from "../ContextMenuComponents/ContextMenuTask";
import ListCalendar from "./ListCalendar";
import FullCalendarTable from "./FullCalendar";
import WorkSpaceList from "./WorkSpaceList";
import { onGetAllTasks } from "Store/actions/TasksActions";
import { onGetAllTasksCalendar } from "Store/actions/CalendarActions";
import { formatDateStandard } from "generalComponents/CalendarHelper";

const CalendarPage = () => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.Tasks.myTasks);
  const dayTasks = useSelector((state) => state.Calendar.dayTasks);
  const calendarDate = useSelector((state) => state.Cabinet.calendarDate);
  const { theme } = useSelector((state) => state.user.userInfo);
  const [mouseParams, setMouseParams] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);
  const [viewType, setViewType] = useState("week");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    dispatch(onGetAllTasks());
    dispatch(onGetAllTasksCalendar());
  }, []); // eslint-disable-line

  useEffect(() => {
    for (let key in dayTasks) {
      if (formatDateStandard(calendarDate).includes(key)) {
        setTasks(dayTasks[key]);
      }
    }
  }, [dayTasks, calendarDate]); // eslint-disable-line

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
          <SidebarTasks tasks={tasks} setMouseParams={setMouseParams} setChosenFile={setChosenFile} />
        </div>
        <div className={classnames(styles.wrapper, `scrollbar-${theme}`)}>
          <DateBlock />
          <div className={styles.headerBlock}>
            <p className={styles.date}>{getStrDate()}</p>

            <div className={styles.headerBtnWrap}>
              <button className={styles.headerBtn}>
                {dayTasks?.length} {__("задач")}
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
          {viewType === "week" && <FullCalendarTable tasks={allTasks} setViewType={setViewType} />}
          {viewType === "day" && <WorkSpaceList tasks={tasks} />}
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
