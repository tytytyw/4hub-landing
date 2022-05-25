import React from "react";
import PropTypes from "prop-types";
import styles from "./EditLetter.module.sass";
import { MODALS, TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import { editLetterParams } from "../../../../../../../types/Tasks";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import InputField from "../../../../../../../generalComponents/InputField";
import TextArea from "../../../../../../../generalComponents/TextArea/TextArea";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { ReactComponent as ContactBookIcon } from "assets/PrivateCabinet/contact-book.svg";

function EditLetter({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();

  const onChangeText = (text) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, text } }));
  };

  const onChangeTopic = (topic) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, topic } }));
  };

  const onChangeReceiver = (receiver) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, receiver } }));
  };

  return (
    <div className={styles.editLetterWrap}>
      <InputField
        model="text"
        value={params.topic}
        set={onChangeTopic}
        placeholder={__("Тема письма")}
        editableClass={"fixedHeight"}
      />
      <div className={styles.margin} />
      <InputField
        model="text"
        value={params.receiver}
        set={onChangeReceiver}
        placeholder={__("Получатель")}
        editableClass={"fixedHeight"}
        icon={<ContactBookIcon className={styles.contactIcon} />}
      />
      <div className={styles.margin} />
      <TextArea text={params.text} onChange={onChangeText} placeholder={__("Текст письма")} />
      <div className={styles.margin} />
      <SubmitButtons type={type} closeModal={closeModal} />
    </div>
  );
}

export default EditLetter;

EditLetter.defaultProps = {
  closeModal: () => {}
};

EditLetter.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: editLetterParams.isRequired,
  closeModal: PropTypes.func
};
