import React from "react";
import styles from "./SubmitButtons.module.sass";
import PropTypes from "prop-types";
import { TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import TextButton from "../../../../../../../generalComponents/TextButton";
import { useLocales } from "react-localized";

function SubmitButtons({ type, closeModal }) {
  const { __ } = useLocales();

  const renderSubmitButtons = () => {
    if ([TASK_MODALS.ADD_NOTE, TASK_MODALS.ADD_TASK, TASK_MODALS.ADD_MEETING, TASK_MODALS.ADD_CALL].includes(type)) {
      return renderSubmitCancel();
    }
  };

  const renderSubmitCancel = () => (
    <div className={styles.submitCancelWrap}>
      <TextButton text={__("Отмена")} type="cancel" callback={closeModal} />
      <TextButton text={__("Добавить")} type="ok" />
    </div>
  );

  return <>{renderSubmitButtons()}</>;
}

export default SubmitButtons;

SubmitButtons.defaultProps = {
  type: undefined,
  closeModal: () => {}
};

SubmitButtons.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  closeModal: PropTypes.func
};
