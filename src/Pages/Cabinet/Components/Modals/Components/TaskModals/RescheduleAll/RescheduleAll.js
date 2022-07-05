import React, { useState } from "react";
import PropTypes from "prop-types";
import { TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import styles from "./RescheduleAll.module.sass";
import { useLocales } from "react-localized";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { ReactComponent as CalendarIcon } from "assets/PrivateCabinet/calendar-6.svg";
// import { useDispatch } from "react-redux";
// import { onAddNewTask, onEditTask } from "Store/actions/TasksActions";
// import { onSetModals } from "Store/actions/CabinetActions";
// import { getFormatDate, getFormatTime, getMaskDate } from "generalComponents/generalHelpers";
import { taskTypes } from "types/Tasks";
import PopUp from "generalComponents/PopUp";
import Calendar from "Pages/StartPage/Components/Calendar";
// import { useTaskMessages, useTypesMeeting } from "generalComponents/collections";
// import InputField from "generalComponents/InputField";
// import SelectChosen from "generalComponents/SelectChosen/SelectChosen";

function RescheduleAll({ type, params, closeModal }) {
  const { __ } = useLocales();
  // const dispatch = useDispatch();
  // const messages = useTaskMessages();
  // const typesMeeting = useTypesMeeting();
  // const [hh, setHh] = useState(
  //   params.chosenTasks.reduce((acc, item) => {
  //     acc.push({ hh: item.date_start.split(" ")[1].split(":")[0] });
  //     return acc;
  //   }, [])
  // );
  const [tasks, setTasks] = useState(
    params.chosenTasks.map((item) => ({
      ...item,
      time_start: item.date_start.split(" ")[1].slice(0, 5).split(":")
    }))
  );
  // const [mm, setMm] = useState(params.date_start ? getFormatTime(params.date_start).split(":")[1] : "");
  const [showCalendar, setShowCalendar] = useState(false);
  console.log(params);

  const onChangeDate = ({ target }) => {
    console.log(target.value);
    const aaa = tasks.map((item) => ({ ...item, date_start: target.value }));
    setTasks(aaa);
  };
  return (
    <div className={styles.editMeetingWrap}>
      <h5 className={styles.title}>
        <CalendarIcon className={styles.calendarIcon} /> {__("Укажите новую дату встречи")}
      </h5>
      <div className={styles.dateWrap}>
        <div>
          <div className={styles.dateName}> {__("Дата")} </div>
          <input
            className={styles.date}
            type="text"
            value={params?.date_start}
            placeholder={__("_ _._ _._ _ _ _")}
            onChange={onChangeDate}
          />
        </div>
        <span className={styles.open_calendar} onClick={() => setShowCalendar(true)}>
          {__("Календарь")}
        </span>
      </div>

      <SubmitButtons type={type} closeModal={closeModal} />
      {showCalendar && (
        <PopUp set={setShowCalendar} zIndex={102}>
          <Calendar setShowCalendar={setShowCalendar} />
        </PopUp>
      )}
    </div>
  );
}

export default RescheduleAll;

RescheduleAll.defaultProps = {
  closeModal: () => {}
};

RescheduleAll.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: taskTypes,
  closeModal: PropTypes.func
};
