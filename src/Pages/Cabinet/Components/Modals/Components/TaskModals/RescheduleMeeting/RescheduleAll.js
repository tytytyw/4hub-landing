import React, { useState } from "react";
import PropTypes from "prop-types";
import { TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import styles from "./RescheduleMeeting.module.sass";
import { useLocales } from "react-localized";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { ReactComponent as CalendarIcon } from "assets/PrivateCabinet/calendar-6.svg";
import { taskTypes } from "types/Tasks";
import PopUp from "generalComponents/PopUp";
import Calendar from "Pages/StartPage/Components/Calendar";
import { getMaskDate } from "generalComponents/generalHelpers";
import InputField from "generalComponents/InputField";
import { useTaskMessages, useTypesMeeting } from "generalComponents/collections";
import SelectChosen from "generalComponents/SelectChosen/SelectChosen";
import { useDispatch } from "react-redux";
import { onEditTask } from "Store/actions/TasksActions";

function RescheduleAll({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const messages = useTaskMessages();
  const typesMeeting = useTypesMeeting();
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState(
    params.reduce((acc, item) => {
      acc[item.id] = { ...item, time_start: item.date_start.split(" ")[1].split(":").slice(0, 2) };
      return acc;
    }, {})
  );
  const [showCalendar, setShowCalendar] = useState(false);

  const onChangeDate = ({ target }) => {
    if (target.value.length > 10) return;
    setDate(getMaskDate(target.value));
  };

  const setDateValue = (value) => setDate(getMaskDate(value));

  const onChangeName = (value, id) => {
    setTasks((prev) => ({ ...prev, [id]: { ...prev[id], name: value } }));
  };

  const onChangeTypeMeeting = (value, id) => {
    setTasks((prev) => ({ ...prev, [id]: { ...prev[id], id_type: value } }));
  };

  const onChangeHour = (e, id) => {
    const value = e.target.value;
    const time_start = [value, tasks[id].time_start[1]];
    setTasks((prev) => ({ ...prev, [id]: { ...prev[id], time_start } }));
  };
  const onChangeMinutes = (e, id) => {
    const value = e.target.value;
    const time_start = [tasks[id].time_start[0], value];
    setTasks((prev) => ({ ...prev, [id]: { ...prev[id], time_start } }));
  };

  const getEventName = (id_type) => typesMeeting.find((el) => el.id === id_type).name;

  const onSubmit = () => {
    Object.values(tasks).forEach((el) => {
      const payload = {
        ...el,
        date_start: date,
        time_start: el.time_start.join(":")
      };
      dispatch(onEditTask(payload, messages[type]));
    });
  };

  const renderMeetingTime = () => {
    return Object.entries(tasks).map(([id, item]) => (
      <div className={styles.timeWrap_all} key={id}>
        <InputField
          model="text"
          value={item.name}
          set={(value) => onChangeName(value, id)}
          editableClass={"fixedHeight"}
        />
        <SelectChosen value={getEventName(item.id_type)}>
          <ul className={styles.eventsList}>
            {typesMeeting.map((type) => (
              <li key={type.id} className={styles.typeItem} onClick={() => onChangeTypeMeeting(type.id, id)}>
                {type.name}
              </li>
            ))}
          </ul>
        </SelectChosen>
        <div className={styles.inputs_wrap_time}>
          <input
            className={styles.time_count}
            type="text"
            placeholder={__("ЧЧ")}
            value={item.time_start[0]}
            onChange={(e) => onChangeHour(e, id)}
          />
          <span className={styles.dots}>:</span>
          <input
            className={styles.time_count}
            type="text"
            placeholder={__("ММ")}
            value={item.time_start[1]}
            onChange={(e) => onChangeMinutes(e, id)}
          />
        </div>
      </div>
    ));
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
            value={date}
            placeholder={__("_ _._ _._ _ _ _")}
            onChange={onChangeDate}
          />
        </div>
        <span className={styles.open_calendar} onClick={() => setShowCalendar(true)}>
          {__("Календарь")}
        </span>
      </div>
      <div className={styles.dateName}> {__("Время встречи")} </div>
      {renderMeetingTime()}
      <SubmitButtons type={type} closeModal={closeModal} onSubmit={onSubmit} />
      {showCalendar && (
        <PopUp set={setShowCalendar} zIndex={102}>
          <Calendar setShowCalendar={setShowCalendar} setDateValue={setDateValue} />
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
  params: PropTypes.arrayOf(taskTypes),
  closeModal: PropTypes.func
};
