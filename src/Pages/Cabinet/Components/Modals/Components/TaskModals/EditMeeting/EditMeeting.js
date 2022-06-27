import React, { useState } from "react";
import PropTypes from "prop-types";
import { MODALS, TASK_MODALS, TASK_TYPES } from "../../../../../../../generalComponents/globalVariables";
import { editMeetingParams } from "../../../../../../../types/Tasks";
import styles from "./EditMeeting.module.sass";
import { useLocales } from "react-localized";
import classNames from "classnames";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { ReactComponent as CalendarIcon } from "assets/PrivateCabinet/calendar-6.svg";
import { useDispatch } from "react-redux";
import { onAddNewTask, onEditTask } from "Store/actions/TasksActions";
import { onSetModals } from "Store/actions/CabinetActions";
import { getMaskDate } from "generalComponents/generalHelpers";

function EditMeeting({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const [hh, setHh] = useState("");
  const [mm, setMm] = useState("");

  console.log(params);

  const onChangeDate = ({ target }) => {
    const dateStart = getMaskDate(target.value);
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, dateStart } }));
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

  const onSubmit = () => {
    const payload = {
      dateStart: params.dateStart,
      time_start: `${hh}:${mm}`,
      eventType: TASK_TYPES.OFFLINE_MEETIGN,
      name: "meeting"
    };
    type === TASK_MODALS.ADD_MEETING
      ? dispatch(onAddNewTask(payload, __("Не удалось создать встречу")))
      : dispatch(onEditTask(payload, __("Не удалось изменить встречу")));
  };
  return (
    <div className={styles.editMeetingWrap}>
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
          value={params.dateStart}
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
  params: editMeetingParams.isRequired,
  closeModal: PropTypes.func
};
