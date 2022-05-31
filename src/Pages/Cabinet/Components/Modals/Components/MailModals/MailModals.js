import React from "react";
import styles from "./MailModals.module.sass";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../../../../../generalComponents/PopUp";
import { MAIL_MODALS, MODALS } from "../../../../../../generalComponents/globalVariables";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { useMailModalTitles } from "../../../../../../generalComponents/collections";
import NewMail from "./NewMail/NewMail";
import { ReactComponent as FullScreen } from "../../../../../../assets/PrivateCabinet/mail/fullScreen.svg";
import { ReactComponent as CloseModal } from "../../../../../../assets/PrivateCabinet/closeModal.svg";

function MailModals() {
  const dispatch = useDispatch();

  const closeModal = () => dispatch(onSetModals(MODALS.MAIL, { type: MODALS.NO_MODAL, params: null }));
  const fullScreen = (e) => {
    e.preventDefault();
    // TODO - vz - create modal funcion
  };
  const { type, params } = useSelector((s) => s.Cabinet.modals.mailModals);

  const TITLES = useMailModalTitles();

  return (
    <PopUp set={closeModal}>
      <form
        className={styles.mailModalsWrap}
        style={{
          width: params.width ?? 420
        }}
      >
        <header className={styles.header}>
          <div className={styles.title}>{TITLES[type]}</div>
          <div className={styles.buttons}>
            <button className={styles.fullScreen} onClick={fullScreen}>
              <FullScreen />
            </button>
            <button className={styles.closeModal} onClick={closeModal}>
              <CloseModal />
            </button>
          </div>
        </header>
        {type === MAIL_MODALS.NEW_MAIL && <NewMail type={type} params={params} closeModal={closeModal} />}
      </form>
    </PopUp>
  );
}

export default MailModals;
