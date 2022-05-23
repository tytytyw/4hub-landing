import React from "react";
import styles from "./TaskModals.module.sass";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../../../../../generalComponents/PopUp";
import { MODALS } from "../../../../../../generalComponents/globalVariables";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";

function TaskModals() {
  const dispatch = useDispatch();

  const closeModal = () => dispatch(onSetModals(MODALS.TASKS, null));
  const { Type } = useSelector((s) => s.Cabinet.modals.taskModals);

  return (
    <>
      {Type ? (
        <PopUp set={closeModal}>
          <form
            className={styles.taskModalsWrap}
            style={{
              width: 420
            }}
          >
            <header className={styles.header}>
              <button className={styles.button} onClick={closeModal}>
                <span className={styles.cross} />
              </button>
              <span className={styles.title}>{123}</span>
            </header>
            <Type />
          </form>
        </PopUp>
      ) : null}
    </>
  );
}

export default TaskModals;
