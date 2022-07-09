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
import { onGetAllTasksCalendar } from "Store/actions/CalendarActions";

const CalendarPage = () => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const dayTasks = useSelector((state) => state.Calendar.dayTasks);
  const calendarDate = useSelector((state) => state.Cabinet.calendarDate);
  const { theme } = useSelector((state) => state.user.userInfo);
  const [mouseParams, setMouseParams] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);
  const [viewType, setViewType] = useState("week");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    dispatch(onGetAllTasksCalendar());
  }, []); // eslint-disable-line

  const getStrDate = () => {
    return __(
      <div className={styles.date}>
        {calendarDate?.getDate()} {monthNameType?.[calendarDate.getMonth()]} {calendarDate.getFullYear()} г
      </div>
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
        <div className={styles.wrapper}>
          <DateBlock />
          <div className={styles.headerBlock}>
            {getStrDate()}
            <div className={styles.headerBtnWrap}>
              <button className={styles.headerBtn}>
                {tasks?.length} {__("задач")}
              </button>
              <div className={styles.viewTypeWrapper}>
                <div className={styles.headerBtn} onClick={() => setViewType("day")}>
                  day
                </div>
                <div className={styles.headerBtn} onClick={() => setViewType("week")}>
                  week
                </div>
                <div className={styles.headerBtn} onClick={() => setViewType("month")}>
                  month
                </div>
                <div className={styles.headerBtn} onClick={() => setViewType("year")}>
                  year
                </div>
              </div>
            </div>
          </div>
          <div className={classnames(styles.wrapperTable, `scrollbar-${theme}`)}>
            {viewType === "day" && <WorkSpaceList tasks={tasks} />}
            {viewType === "week" && <FullCalendarTable tasks={allTasks} setViewType={setViewType} view={viewType} />}
            {viewType === "month" && <FullCalendarTable tasks={allTasks} setViewType={setViewType} view={viewType} />}
            {viewType === "year" && "year"}
          </div>
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
