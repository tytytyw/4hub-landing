import React from "react";
import styles from "./TaskModals.module.sass";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../../../../../generalComponents/PopUp";
import { MODALS } from "../../../../../../generalComponents/globalVariables";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import PropTypes from "prop-types";
import { useTaskModalTitles } from "../../../../../../generalComponents/collections";

function TaskModals() {
  const dispatch = useDispatch();

  const closeModal = () => dispatch(onSetModals(MODALS.TASKS, null));
  const { Type, params } = useSelector((s) => s.Cabinet.modals.taskModals);
  const TITLES = useTaskModalTitles();

  return (
    <PopUp set={closeModal}>
      <form
        className={styles.taskModalsWrap}
        style={{
          width: params.width ?? 420
        }}
      >
        <header className={styles.header}>
          <button className={styles.button} onClick={closeModal}>
            <span className={styles.cross} />
          </button>
          <span className={styles.title}>{TITLES[Type]}</span>
        </header>
        <Type />
      </form>
    </PopUp>
  );
}

export default TaskModals;

TaskModals.propTypes = {
  params: PropTypes.shape({
    width: PropTypes.number
  }).isRequired
};
