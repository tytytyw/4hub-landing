import React, { useState } from "react";
import PropTypes from "prop-types";
import { MODALS, TASK_MODALS, TASK_TYPES } from "../../../../../../../generalComponents/globalVariables";
import styles from "./EditMeeting.module.sass";
import { useLocales } from "react-localized";
import classNames from "classnames";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { ReactComponent as CalendarIcon } from "assets/PrivateCabinet/calendar-6.svg";
import { useDispatch } from "react-redux";
import { onAddNewTask, onEditTask } from "Store/actions/TasksActions";
import { onSetModals } from "Store/actions/CabinetActions";
import { getFormatTime, getMaskDate } from "generalComponents/generalHelpers";
import InputField from "generalComponents/InputField";
import { taskTypes } from "types/Tasks";
import PopUp from "generalComponents/PopUp";
import Calendar from "Pages/StartPage/Components/Calendar";
import { useTaskMessages, useTypesMeeting } from "generalComponents/collections";
import SelectChosen from "generalComponents/SelectChosen/SelectChosen";

function EditMeeting({ type, params, closeModal, onChangeField }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const messages = useTaskMessages();
  const typesMeeting = useTypesMeeting();
  const [hh, setHh] = useState(params.date_start ? getFormatTime(params.date_start).split(":")[0] : "");
  const [mm, setMm] = useState(params.date_start ? getFormatTime(params.date_start).split(":")[1] : "");
  const [showCalendar, setShowCalendar] = useState(false);

  const onChangeDate = ({ target }) => {
    if (target.value.length > 10) return;
    const date_start = getMaskDate(target.value);
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
    type === TASK_MODALS.ADD_MEETING
      ? dispatch(onAddNewTask(payload, messages[TASK_TYPES.MEETINGS][type]))
      : dispatch(onEditTask(payload, messages[TASK_TYPES.MEETINGS][type]));
  };

  const getEventName = () => typesMeeting.find((el) => el.id === params.id_type).name;

  return (
    <div className={styles.editMeetingWrap}>
      <h5 className={styles.title}>{__("Название встречи")}</h5>
      <InputField
        model="text"
        value={params.name}
        set={(value) => onChangeField("name", value)}
        editableClass={"fixedHeight"}
      />
      <h5 className={styles.title}>{__("Тип встречи")}</h5>
      <SelectChosen value={getEventName()}>
        <ul className={styles.eventsList}>
          {typesMeeting.map((type) => (
            <li
              key={type.id}
              onClick={() => {
                onChangeField("id_type", type.id);
              }}
              className={styles.typeItem}
            >
              {type.name}
            </li>
          ))}
        </ul>
      </SelectChosen>

      <h5 className={styles.title}>
        <CalendarIcon className={styles.calendarIcon} /> {__("Укажите дату и время встречи")}
      </h5>
      <div className={styles.dateWrap}>
        <span className={styles.dateName}> {__("Дата")} </span>
        <input
          className={styles.date}
          type="text"
          value={params?.date_start.slice(0, 10)}
          placeholder={__("_ _._ _._ _ _ _")}
          onChange={onChangeDate}
        />
        <div className={classNames(styles.inputs_wrap_time)}>
          <input className={styles.time_count} type="text" placeholder={__("ЧЧ")} value={hh} onChange={onChangeHour} />
          <span className={styles.dots}>:</span>
          <input className={styles.time_count} type="text" placeholder={__("ММ")} value={mm} onChange={onChangeMin} />
        </div>
        <span className={styles.open_calendar} onClick={() => setShowCalendar(true)}>
          {__("Календарь")}
        </span>
      </div>
      <SubmitButtons type={type} closeModal={closeModal} onSubmit={onSubmit} />
      {showCalendar && (
        <PopUp set={setShowCalendar} zIndex={102}>
          <Calendar setShowCalendar={setShowCalendar} setDateValue={(value) => onChangeField("date_start", value)} />
        </PopUp>
      )}
    </div>
  );
}

export default EditMeeting;

EditMeeting.defaultProps = {
  closeModal: () => {}
};

EditMeeting.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: taskTypes,
  closeModal: PropTypes.func,
  onChangeField: PropTypes.func
};
