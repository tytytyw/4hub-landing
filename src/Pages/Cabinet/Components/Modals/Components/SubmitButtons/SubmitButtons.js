import React from "react";
import styles from "./SubmitButtons.module.sass";
import PropTypes from "prop-types";
import { LIBRARY_MODALS, TASK_MODALS } from "../../../../../../generalComponents/globalVariables";
import TextButton from "../../../../../../generalComponents/TextButton";
import { useLocales } from "react-localized";

function SubmitButtons({ type, closeModal, onSubmit }) {
  const { __ } = useLocales();
  const textButton = type === LIBRARY_MODALS.RENAME_SECTION ? __("Сохранить") : __("Добавить");

  const renderSubmitButtons = () => {
    if (
      [
        //Tasks
        TASK_MODALS.ADD_NOTE,
        TASK_MODALS.ADD_TASK,
        TASK_MODALS.ADD_MEETING,
        TASK_MODALS.ADD_CALL,
        TASK_MODALS.ADD_LETTER,
        TASK_MODALS.ADD_SECTION,
        TASK_MODALS.DELETE_TASK,
        //Library
        LIBRARY_MODALS.ADD_SECTION,
        LIBRARY_MODALS.RENAME_SECTION
      ].includes(type)
    ) {
      return renderSubmitCancel();
    }
  };

  const renderSubmitCancel = () => (
    <div className={styles.submitCancelWrap}>
      <TextButton text={__("Отмена")} type="cancel" callback={closeModal} />
      <TextButton text={textButton} type="ok" callback={onSubmit} />
    </div>
  );

  return <>{renderSubmitButtons()}</>;
}

export default SubmitButtons;

SubmitButtons.defaultProps = {
  type: undefined,
  closeModal: () => {},
  onSubmit: () => {}
};

SubmitButtons.propTypes = {
  type: PropTypes.oneOf(Object.values({ ...TASK_MODALS, ...LIBRARY_MODALS })).isRequired,
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func
};
