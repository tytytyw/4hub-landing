import React from "react";
import styles from "./EditSection.module.sass";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { MODALS, TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { editSectionParams } from "../../../../../../../types/Tasks";
import { useDispatch } from "react-redux";
import { useLocales } from "react-localized";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import InputField from "../../../../../../../generalComponents/InputField";

function EditSection({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();

  const onChangeTitle = (title) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, title } }));
  };

  return (
    <div className={styles.addNoteWrap}>
      <InputField
        model="text"
        value={params.title}
        set={onChangeTitle}
        placeholder={__("Заголовок")}
        editableClass={"fixedHeight"}
      />
      <div className={styles.margin} />
      <SubmitButtons type={type} closeModal={closeModal} />
    </div>
  );
}

export default EditSection;

EditSection.defaultProps = {
  closeModal: () => {}
};

EditSection.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: editSectionParams.isRequired,
  closeModal: PropTypes.func
};
