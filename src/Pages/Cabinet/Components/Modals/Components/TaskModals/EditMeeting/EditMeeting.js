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

function EditMeeting({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const [hh, setHh] = useState(params.date_start ? getFormatTime(params.date_start).split(":")[0] : "");
  const [mm, setMm] = useState(params.date_start ? getFormatTime(params.date_start).split(":")[1] : "");

  const onChangeName = (name) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, name } }));
  };

  const onChangeDate = ({ target }) => {
    // if (target.value.length > 10) return;
    console.log("first", target.value);
    const date_start = getMaskDate(target.value);
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, date_start } }));
  };

  const onChangeHour = ({ target }) => {
    if (target.value.length > 2) return;
    const h = getMaskDate(target.value);
    setHh(h);
  };
  const onChangeMin = ({ target }) => {
    if (target.value.length > 2) return;
    const m = getMaskDate(target.value);
    setMm(m);
  };
  const messagesAdd = {
    error: __("Не удалось создать встречу"),
    success: __("Новая встреча создана")
  };

  const messagesEdit = {
    error: __("Не удалось изменить встречу"),
    success: __("Встреча изменина")
  };
  const onSubmit = () => {
    const payload = {
      dateStart: params.date_start,
      timeStart: `${hh}:${mm}`,
      eventType: TASK_TYPES.MEETINGS,
      name: params.name,
      idTask: params.id
    };
    type === TASK_MODALS.ADD_MEETING
      ? dispatch(onAddNewTask(payload, messagesAdd))
      : dispatch(onEditTask(payload, messagesEdit));
  };
  return (
    <div className={styles.editMeetingWrap}>
      <InputField
        model="text"
        value={params.name}
        set={onChangeName}
        placeholder={__("Имя задачи")}
        editableClass={"fixedHeight"}
      />
      <div className={styles.title_wrap}>
        <h5 className={styles.title}>
          <CalendarIcon className={styles.calendarIcon} /> {__("Укажите дату и время встречи")}
        </h5>
      </div>
      <div className={styles.dateWrap}>
        <span className={styles.dateName}> {__("Дата")} </span>
        <input
          className={styles.date}
          type="text"
          value={params.date_start.slice(0, 10)}
          placeholder={__("_ _._ _._ _ _ _")}
          onChange={onChangeDate}
        />
        <div className={classNames(styles.inputs_wrap_time)}>
          <input className={styles.time_count} type="text" placeholder={__("ЧЧ")} value={hh} onChange={onChangeHour} />
          <span className={styles.dots}>:</span>
          <input className={styles.time_count} type="text" placeholder={__("ММ")} value={mm} onChange={onChangeMin} />
        </div>
        <span className={styles.open_calendar} onClick={() => {}}>
          {__("Календарь")}
        </span>
      </div>
      <SubmitButtons type={type} closeModal={closeModal} onSubmit={onSubmit} />
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
  closeModal: PropTypes.func
};
