import React, { useState } from "react";
import PropTypes from "prop-types";
import { MODALS, TaskFields, TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import styles from "./RescheduleOne.module.sass";
import { useLocales } from "react-localized";
import classNames from "classnames";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { ReactComponent as CalendarIcon } from "assets/PrivateCabinet/calendar-6.svg";
import { useDispatch } from "react-redux";
import { onEditTask } from "Store/actions/TasksActions";
import { onSetModals } from "Store/actions/CabinetActions";
import { getMaskDate } from "generalComponents/generalHelpers";
import { taskTypes } from "types/Tasks";
import PopUp from "generalComponents/PopUp";
import Calendar from "Pages/StartPage/Components/Calendar";
import { useTaskMessages, useTypesMeeting } from "generalComponents/collections";
import InputField from "generalComponents/InputField";
import SelectChosen from "generalComponents/SelectChosen/SelectChosen";

function RescheduleOne({ type, params, closeModal, onChangeField }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const messages = useTaskMessages();
  const typesMeeting = useTypesMeeting();
  const [hh, setHh] = useState(params.time_start ? params.time_start.split(":")[0] : "");
  const [mm, setMm] = useState(params.time_start ? params.time_start.split(":")[1] : "");
  const [showCalendar, setShowCalendar] = useState(false);
  const onChangeDate = ({ target }) => {
    if (target.value.length > 10) return;
    const date_start = getMaskDate(target.value);
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, date_start } }));
  };

  const setDateValue = (date_start) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, date_start } }));
  };

  const onChangeHour = ({ target }) => {
    if (target.value.length > 2) return;
    setHh(getMaskDate(target.value));
  };
  const onChangeMin = ({ target }) => {
    if (target.value.length > 2) return;
    setMm(getMaskDate(target.value));
  };
  const onSubmit = () => {
    const payload = {
      ...params,
      date_start: params.date_start.split(" ")[0],
      time_start: `${hh}:${mm}`
    };
    dispatch(onEditTask(payload, messages[type]));
  };
  const getEventName = () => typesMeeting.find((el) => el.id === params.id_type).name;

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
      <div className={styles.dateName}> {__("Время встречи")} </div>
      <div className={styles.timeWrap}>
        <InputField
          model="text"
          value={params.name}
          set={(value) => onChangeField(TaskFields.NAME, value)}
          editableClass={"fixedHeight"}
        />
        <SelectChosen value={getEventName()}>
          <ul className={styles.eventsList}>
            {typesMeeting.map((type) => (
              <li
                key={type.id}
                onClick={() => {
                  onChangeField(TaskFields.ID_TYPE, type.id);
                }}
                className={styles.typeItem}
              >
                {type.name}
              </li>
            ))}
          </ul>
        </SelectChosen>
        <div className={classNames(styles.inputs_wrap_time)}>
          <input className={styles.time_count} type="text" placeholder={__("ЧЧ")} value={hh} onChange={onChangeHour} />
          <span className={styles.dots}>:</span>
          <input className={styles.time_count} type="text" placeholder={__("ММ")} value={mm} onChange={onChangeMin} />
        </div>
      </div>

      <SubmitButtons type={type} closeModal={closeModal} onSubmit={onSubmit} />
      {showCalendar && (
        <PopUp set={setShowCalendar} zIndex={102}>
          <Calendar setShowCalendar={setShowCalendar} setDateValue={setDateValue} />
        </PopUp>
      )}
    </div>
  );
}

export default RescheduleOne;

RescheduleOne.defaultProps = {
  closeModal: () => {}
};

RescheduleOne.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  closeModal: PropTypes.func,
  params: taskTypes,
  onChangeField: PropTypes.func
};
