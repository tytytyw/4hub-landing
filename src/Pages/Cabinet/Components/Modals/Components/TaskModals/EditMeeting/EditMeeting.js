import React from "react";
import PropTypes from "prop-types";
import { TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import { editMeetingParams } from "../../../../../../../types/Tasks";
import styles from "./EditMeeting.module.sass";
import { useLocales } from "react-localized";
import classNames from "classnames";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { ReactComponent as CalendarIcon } from "assets/PrivateCabinet/calendar-6.svg";

function EditMeeting({ type, params, closeModal }) {
  const { __ } = useLocales();
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
          value={params.date}
          placeholder={__("_ _._ _._ _ _ _")}
          onChange={() => {}}
        />
        <div className={classNames(styles.inputs_wrap_time)}>
          <input
            className={styles.time_count}
            type="text"
            placeholder={__("ЧЧ")}
            value={params.time}
            onChange={() => {}}
          />
          <span className={styles.dots}>:</span>
          <input
            className={styles.time_count}
            type="text"
            placeholder={__("ММ")}
            value={params.time}
            onChange={() => {}}
          />
        </div>
        <span className={styles.open_calendar} onClick={() => {}}>
          {__("Календарь")}
        </span>
      </div>
      <SubmitButtons type={type} closeModal={closeModal} />
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
