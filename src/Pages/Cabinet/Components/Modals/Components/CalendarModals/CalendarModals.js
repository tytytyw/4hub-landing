import React from "react";
import styles from "./CalendarModals.module.sass";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../../../../../generalComponents/PopUp";
import { CALENDAR_MODALS, MODALS } from "../../../../../../generalComponents/globalVariables";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { useTaskModalTitles } from "../../../../../../generalComponents/collections";
import EditTask from "./EditTask/EditTask";
import SuccessCreated from "./SuccessCreated";

function CalendarModals() {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(onSetModals(MODALS.CALENDAR, { type: MODALS.NO_MODAL, params: null }));
  };

  const { type } = useSelector((s) => s.Cabinet.modals.calendarModals);
  const TITLES = useTaskModalTitles();

  return (
    <PopUp set={closeModal}>
      <form className={styles.calendarModals}>
        <header className={styles.header}>
          <button className={styles.button} onClick={closeModal}>
            <span className={styles.cross} />
          </button>
          <span className={styles.title}>{TITLES[type]}</span>
        </header>
        {(type === CALENDAR_MODALS.ADD_TASK || type === CALENDAR_MODALS.EDIT_TASK) && (
          <EditTask closeModal={closeModal} type={type} />
        )}
        {type === CALENDAR_MODALS.SUCCESS_ADD && <SuccessCreated closeModal={closeModal} />}
      </form>
    </PopUp>
  );
}

export default CalendarModals;
