import React from "react";
import styles from "./LibraryModals.module.sass";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../../../../../generalComponents/PopUp";
import { LIBRARY_MODALS, MODALS } from "../../../../../../generalComponents/globalVariables";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { useLibraryModalTitles } from "../../../../../../generalComponents/collections";
import EditSection from "./EditSection/EditSection";

function TaskModals() {
  const dispatch = useDispatch();

  const closeModal = () => dispatch(onSetModals(MODALS.LIBRARY, { type: MODALS.NO_MODAL, params: null }));
  const { type, params } = useSelector((s) => s.Cabinet.modals.libraryModals);
  const TITLES = useLibraryModalTitles();
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
          <span className={styles.title}>{TITLES[type]}</span>
        </header>
        {type === LIBRARY_MODALS.ADD_SECTION && <EditSection type={type} params={params} closeModal={closeModal} />}
      </form>
    </PopUp>
  );
}

export default TaskModals;
