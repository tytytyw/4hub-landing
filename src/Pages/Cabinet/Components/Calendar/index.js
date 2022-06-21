import React, { useEffect, useState } from "react";

import styles from "./CalendarPage.module.sass";
import SearchField from "../SearchField";
import StorageSize from "../StorageSize";
import Notifications from "../Notifications";
import Profile from "../Profile/Profile";
import DateBlock from "./DateBlock";
// import WorkSpaceList from "./WorkSpaceList";
import ListCalendar from "./ListCalendar";
import BottomPanel from "../BottomPanel";
// import FullCalendarTable from "./FullCalendar";
import { useDispatch, useSelector } from "react-redux";
import { onGetAllTasks, onSetModals } from "../../../../Store/actions/CabinetActions";
import SidebarTasks from "./SidebarTasks";
import { CALENDAR_MODALS, imageSrc, MODALS } from "../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import { monthNameType } from "./helper";
import classnames from "classnames";
import ContextMenu from "generalComponents/ContextMenu";
import ContextMenuTask from "../ContextMenuComponents/ContextMenuTask";

const CalendarPage = () => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.Cabinet.myTasks);
  const myTasks = Object.values(tasks);
  const calendarDate = useSelector((state) => state.Cabinet.calendarDate);
  const { theme } = useSelector((state) => state.user.userInfo);
  const [mouseParams, setMouseParams] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);

  // eslint-disable-next-line
  const [viewType, setViewType] = useState("full");

  useEffect(() => {
    dispatch(onGetAllTasks());
  }, []); // eslint-disable-line
  const getStrDate = () => {
    return __(
      `${calendarDate?.getDate()} ${monthNameType?.[calendarDate.getMonth()]}  ${calendarDate.getFullYear()} г`
    );
  };
  // const getEventsCount = () => {
  //   const findEvents = events.filter((event) => {
  //     return event?.date.getDate() === calendarDate.getDate();
  //   });
  //   return findEvents?.length;
  // };
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
          <ListCalendar setViewType={setViewType} />
          <SidebarTasks tasks={myTasks} setMouseParams={setMouseParams} setChosenFile={setChosenFile} />
        </div>
        <div className={classnames(styles.wrapper, `scrollbar-${theme}`)}>
          <DateBlock />
          <div className={styles.headerBlock}>
            <p className={styles.date}>{getStrDate()}</p>

            <div className={styles.headerBtnWrap}>
              <button className={styles.headerBtn}>{/* {getEventsCount()} {__("задач")} */}</button>
            </div>
            <div className={styles.headerBtnWrap}>
              <button className={styles.headerBtn}>{__("1 новая задача")}</button>
              <span className={styles.badge}>3</span>
            </div>
            <div className={styles.headerBtnWrap}>
              <button className={styles.headerBtn}>{__("1 напоминание")}</button>
            </div>
          </div>
          {/* {viewType === "full" && <FullCalendarTable events={events} />}
          {viewType === "list" && <WorkSpaceList events={events} />} */}
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
