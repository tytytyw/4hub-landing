import React, { useState } from "react";
import PropTypes from "prop-types";
import { MODALS, TASK_MODALS, TASK_TYPES } from "../../../../../../../generalComponents/globalVariables";
import { editMeetingParams } from "../../../../../../../types/Tasks";
import styles from "./EditCall.module.sass";
import { useLocales } from "react-localized";
import classNames from "classnames";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { ReactComponent as CalendarIcon } from "assets/PrivateCabinet/calendar-6.svg";
import InputField from "generalComponents/InputField";
import { useDispatch } from "react-redux";
import { getFormatTime, getMaskDate } from "generalComponents/generalHelpers";
import { onSetModals } from "Store/actions/CabinetActions";
import { onAddNewTask, onEditTask } from "Store/actions/TasksActions";

function EditCall({ type, params, closeModal }) {
  console.log("TYPE", type);
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const [hh, setHh] = useState(params.date_start ? getFormatTime(params.date_start).split(":")[0] : "");
  const [mm, setMm] = useState(params.date_start ? getFormatTime(params.date_start).split(":")[1] : "");

  const onChangeName = (name) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, name } }));
  };

  const onChangeDate = ({ target }) => {
    if (target.value.length > 10) return;
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
    error: __("Не удалось создать звонок"),
    success: __("Новый звонок создан")
  };

  const messagesEdit = {
    error: __("Не удалось изменить звонок"),
    success: __("Звонок изменина")
  };
  const onSubmit = () => {
    const payload = {
      dateStart: params.date_start,
      timeStart: `${hh}:${mm}`,
      eventType: TASK_TYPES.CALLS,
      name: params.name,
      idTask: params.id
    };
    type === TASK_MODALS.ADD_CALL
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
          <CalendarIcon className={styles.calendarIcon} /> {__("Укажите дату и время звонка")}
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

export default EditCall;

EditCall.defaultProps = {
  closeModal: () => {}
};

EditCall.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: editMeetingParams.isRequired,
  closeModal: PropTypes.func
};
