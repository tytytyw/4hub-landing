import React from "react";
import PropTypes from "prop-types";
import styles from "./EditTask.module.sass";
import { MODALS, TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import { editTaskParams } from "../../../../../../../types/Tasks";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import InputField from "../../../../../../../generalComponents/InputField";
import Colors from "../../../../../../../generalComponents/Elements/Colors";
import TagPicker from "../../../../../../../generalComponents/TagPicker/TagPicker";
import Signs from "../../../../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../../../../generalComponents/Elements/Emoji";
import TextArea from "../../../../../../../generalComponents/TextArea/TextArea";
import SubmitButtons from "../SubmitButtons/SubmitButtons";

function EditTask({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();

  const onChangeColor = (color) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, color } }));
  };

  const onChangeTag = (tag) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, tag } }));
  };

  const onChangeText = (text) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, text } }));
  };

  const onChangeCategory = (category) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, category } }));
  };

  const onChangeUrgency = (urgency) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, urgency } }));
  };

  const onChangeStartDate = (startDate) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, startDate } }));
  };

  const onChangeEndDateDate = (endDate) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, endDate } }));
  };

  const onChangeSign = (sign) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, sign } }));
  };

  const onChangeEmoji = (emoji) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, emoji } }));
  };

  return (
    <div className={styles.editTaskWrap}>
      <div className={styles.columnsWrap}>
        <div className={styles.leftColumn}>
          <InputField
            model="text"
            value={params.category}
            set={onChangeCategory}
            placeholder={__("Имя категории")}
            editableClass={"fixedHeight"}
          />
          <div className={styles.margin} />
          <InputField
            model="text"
            value={params.urgency}
            set={onChangeUrgency}
            placeholder={__("Выберите актуальность задачи")}
            editableClass={"fixedHeight"}
          />
          <div className={styles.margin} />
          <InputField
            model="text"
            value={params.startDate}
            set={onChangeStartDate}
            placeholder={__("Дата начала задачи")}
            editableClass={"fixedHeight"}
          />
          <div className={styles.margin} />
          <Colors title={__("Выберите цвет Задачи")} color={params.color} setColor={onChangeColor} />
        </div>
        <div className={styles.rightColumn}>
          <InputField
            model="text"
            value={params.category}
            set={onChangeCategory}
            placeholder={__("Имя задачи")}
            editableClass={"fixedHeight"}
          />
          <div className={styles.margin} />
          <TagPicker tag={params.tag} onSelectTag={onChangeTag} />
          <div className={styles.margin} />
          <InputField
            model="text"
            value={params.endDate}
            set={onChangeEndDateDate}
            placeholder={__("Дата завершения задачи")}
            editableClass={"fixedHeight"}
          />
          <div className={styles.margin} />
          <Signs sign={params.sign} title={__("Добавить знак")} setSign={onChangeSign} />
        </div>
      </div>
      <div className={styles.bottomWrap}>
        <Emoji emoji={params.emoji} setEmoji={onChangeEmoji} />
        <div className={styles.margin} />
        <TextArea text={params.text} onChange={onChangeText} placeholder={__("Текст задачи")} />
        <div className={styles.buttonsWrap}>
          <SubmitButtons type={type} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default EditTask;

EditTask.defaultProps = {
  closeModal: () => {}
};

EditTask.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: editTaskParams.isRequired,
  closeModal: PropTypes.func
};
