import React, { useEffect, useState } from "react";

import styles from "./CalendarPage.module.sass";
import SearchField from "../SearchField";
import StorageSize from "../StorageSize";
import Notifications from "../Notifications";
import Profile from "../Profile/Profile";
import DateBlock from "./DateBlock";
import WorkSpaceList from "./WorkSpaceList";
import ListCalendar from "./ListCalendar";
import CreateTask from "./CreateTask";
import SuccessCreated from "./CreateTask/SuccessCreated";
import BottomPanel from "../BottomPanel";
import FullCalendarTable from "./FullCalendar";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarEvents } from "../../../../Store/actions/CabinetActions";
import SidebarTasks from "./SidebarTasks";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import { monthNameType } from "./helper";

const CalendarPage = () => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.Cabinet.calendarEvents);
  const calendarDate = useSelector((state) => state.Cabinet.calendarDate);
  console.log(events);
  const [viewType, setViewType] = useState("full");
  const [createTask, setCreateTask] = useState(false);

  const [event, setEvent] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(setCalendarEvents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStrDate = () => {
    return __(
      `${calendarDate?.getDate()} ${monthNameType?.[calendarDate.getMonth()]}  ${calendarDate.getFullYear()} г`
    );
  };

  const getEventsCount = () => {
    const findEvents = events.filter((event) => {
      return event?.date.getDate() === calendarDate.getDate();
    });
    return findEvents?.length;
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
        <div className={styles.sideMenu}>
          <div className={styles.addTaskBlock}>
            <p>{__("Создать задачу")}</p>
            <img
              onClick={() => setCreateTask(true)}
              className={styles.addTaskIcon}
              src={imageSrc + "./assets/PrivateCabinet/folders/plus-white.svg"}
              alt="Add Task Icon"
            />
          </div>
          <ListCalendar setViewType={setViewType} />
          <SidebarTasks data={events} />
        </div>
        <div className={styles.wrapper}>
          <DateBlock setViewType={setViewType} />
          <div className={styles.headerBlock}>
            <p className={styles.date}>{getStrDate()}</p>

            <div className={styles.headerBtnWrap}>
              <button className={styles.headerBtn}>
                {getEventsCount()} {__("задач")}
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
          {viewType === "full" && <FullCalendarTable events={events} />}
          {viewType === "list" && <WorkSpaceList events={events} />}
        </div>
      </div>

      {createTask && (
        <CreateTask title="Создание проекта" onCreate={setCreateTask} setSuccess={setSuccess} setEvent={setEvent} />
      )}

      {success && <SuccessCreated event={event} set={setSuccess} />}

      <BottomPanel />
    </div>
  );
};

export default CalendarPage;
