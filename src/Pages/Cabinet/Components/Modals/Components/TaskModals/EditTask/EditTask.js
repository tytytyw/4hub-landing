import React from "react";
import PropTypes from "prop-types";
import styles from "./EditTask.module.sass";
import { imageSrc, MODALS, TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import { taskTypes } from "../../../../../../../types/Tasks";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import InputField from "../../../../../../../generalComponents/InputField";
import Colors from "../../../../../../../generalComponents/Elements/Colors";
import TagPicker from "../../../../../../../generalComponents/TagPicker/TagPicker";
import Signs from "../../../../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../../../../generalComponents/Elements/Emoji";
import TextArea from "../../../../../../../generalComponents/TextArea/TextArea";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import SelectChosen from "generalComponents/SelectChosen/SelectChosen";
import { useEvents } from "generalComponents/CalendarHelper";

function EditTask({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const events = useEvents();

  const onChangeEventType = (id_type) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, id_type } }));
  };

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

  const getEventName = (id) => {
    const event = events.find((item) => item.id === id);
    return event?.name;
  };

  return (
    <div className={styles.editTaskWrap}>
      <div className={styles.columnsWrap}>
        <SelectChosen placeholder={__("Имя категории")} value={getEventName(params.id_type)}>
          <ul className={styles.eventsList}>
            {events.map((event, index) => (
              <li
                key={index}
                onClick={() => {
                  onChangeEventType(event?.id);
                }}
                className={styles.eventItem}
              >
                <div className={styles.eventIconWrap}>
                  <img
                    className={styles.eventIcon}
                    src={`${imageSrc}assets/PrivateCabinet/events/${event.icon}.svg`}
                    alt="Event Icon"
                  />
                </div>
                <p className={styles.eventName}>{event.name}</p>
              </li>
            ))}
          </ul>
        </SelectChosen>
        <InputField
          model="text"
          value={params.category}
          set={onChangeCategory}
          placeholder={__("Имя задачи")}
          editableClass={"fixedHeight"}
        />
        <InputField
          model="text"
          value={params.urgency}
          set={onChangeUrgency}
          placeholder={__("Выберите актуальность задачи")}
          editableClass={"fixedHeight"}
        />
        <TagPicker tag={params.tag} onSelectTag={onChangeTag} />
        <InputField
          model="text"
          value={params.startDate}
          set={onChangeStartDate}
          placeholder={__("Дата начала задачи")}
          editableClass={"fixedHeight"}
        />
        <InputField
          model="text"
          value={params.endDate}
          set={onChangeEndDateDate}
          placeholder={__("Дата завершения задачи")}
          editableClass={"fixedHeight"}
        />
        <Colors title={__("Выберите цвет Задачи")} color={params.color} setColor={onChangeColor} />
        <Signs sign={params.sign} title={__("Добавить знак")} setSign={onChangeSign} />
      </div>
      <div className={styles.bottomWrap}>
        <Emoji
          emoji={params.emoji}
          setEmoji={onChangeEmoji}
          emojiEditableClass={"rowEmoji"}
          editableClass={"addTask"}
        />
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
  params: taskTypes,
  closeModal: PropTypes.func
};
