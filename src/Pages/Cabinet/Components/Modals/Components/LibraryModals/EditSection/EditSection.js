import React from "react";
import styles from "./EditSection.module.sass";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { LIBRARY_MODALS, MODALS } from "../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { editSectionParams } from "../../../../../../../types/Library";
import { useDispatch } from "react-redux";
import { useLocales } from "react-localized";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import InputField from "../../../../../../../generalComponents/InputField";
import { ReactComponent as PlayIcon } from "../../../../../../../assets/PrivateCabinet/play-grey.svg";

function EditSection({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();

  const onChangeTitle = (title) => {
    dispatch(onSetModals(MODALS.LIBRARY, { type, params: { ...params, title } }));
  };

  // const onChangeTag = (tag) => {
  //   dispatch(onSetModals(MODALS.LIBRARY, { type, params: { ...params, tag } }));
  // };
  //
  // const onChangeText = (text) => {
  //   dispatch(onSetModals(MODALS.LIBRARY, { type, params: { ...params, text } }));
  // };

  return (
    <div className={styles.addSectionWrap}>
      <InputField
        model="text"
        value={params.title}
        set={onChangeTitle}
        placeholder={__("Имя раздела")}
        editableClass={"fixedHeight"}
      />
      <div className={styles.margin} />
      <InputField
        model="text"
        value={params.title}
        set={onChangeTitle}
        placeholder={__("Иконка раздела")}
        editableClass={"fixedHeight"}
        icon={<PlayIcon className={styles.playButton} />}
      />
      <SubmitButtons type={type} closeModal={closeModal} />
    </div>
  );
}

export default EditSection;

EditSection.defaultProps = {
  closeModal: () => {}
};

EditSection.propTypes = {
  type: PropTypes.oneOf(Object.values(LIBRARY_MODALS)).isRequired,
  params: editSectionParams.isRequired,
  closeModal: PropTypes.func
};
