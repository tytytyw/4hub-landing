import React, { useState } from "react";

import styles from "./EditTask.module.sass";
import InputField from "../../../../../../../generalComponents/InputField";
import { colors } from "../../../../../../../generalComponents/collections";
import Colors from "../../../../../../../generalComponents/Elements/Colors";
import Signs from "../../../../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../../../../generalComponents/Elements/Emoji";
import { imageSrc, MODALS, TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import { useDispatch, useSelector } from "react-redux";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { onAddNewTask, onEditTask, onSetModals } from "Store/actions/CabinetActions";
import { getStartDate, getStartTime, useEvents } from "generalComponents/CalendarHelper";
import { getMaskDate } from "generalComponents/generalHelpers";
import SelectChosen from "generalComponents/SelectChosen/SelectChosen";
import TagPicker from "generalComponents/TagPicker/TagPicker";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";

const EditTask = ({ closeModal, type }) => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const { taskChoosen } = useSelector((state) => state.Cabinet.modals.calendarModals);
  const events = useEvents();
  const [name, setName] = useState(taskChoosen ? taskChoosen.name : "");
  const [eventType, setEventType] = useState(taskChoosen ? Number(taskChoosen.id_type) : "");
  const [dateStart, setDateStart] = useState(taskChoosen ? getStartDate(taskChoosen.date_start) : "");
  const [timeStart, setTimeStart] = useState(taskChoosen ? getStartTime(taskChoosen.date_start) : "");
  const [email, setEmail] = useState(taskChoosen ? taskChoosen.emails : "");
  const [tagOption, setTagOption] = useState(
    taskChoosen ? { chosen: taskChoosen.tags.chosen, count: taskChoosen.tags.count } : { chosen: "", count: 30 }
  );
  const [text, setText] = useState(taskChoosen ? taskChoosen.prim : "");
  const [color, setColor] = useState(taskChoosen ? taskChoosen.id_color : colors[0]);
  const [figure, setFigure] = useState(taskChoosen ? taskChoosen.id_fig : "");
  const [emoji, setEmoji] = useState(taskChoosen ? taskChoosen.id_emo : "");

  const payload = {
    name,
    eventType,
    text,
    dateStart,
    timeStart,
    tagOption,
    color,
    emoji,
    figure,
    emails: email,
    idTask: taskChoosen ? taskChoosen.id : ""
  };

  const addNewTask = () => {
    dispatch(onSetModals(MODALS.LOADER, true));
    dispatch(onAddNewTask(payload, __("Не удалось добавить задачу")));
  };

  const editTask = () => {
    dispatch(onSetModals(MODALS.LOADER, true));
    dispatch(onEditTask(payload, __("Задача успешно отредактирована"), __("Не удалось изменить задачу")));
    closeModal();
  };

  const onSubmit = (type) => {
    switch (type) {
      case TASK_MODALS.ADD_TASK:
        return addNewTask();
      case TASK_MODALS.EDIT_TASK:
        return editTask();
      default:
        return console.log("Error");
    }
  };
  const width = window.innerWidth;

  const onChangeTag = (chosen) => {
    const count = 30 - chosen.length;
    if (count >= 0) setTagOption({ ...tagOption, chosen, count });
  };

  const getEventName = (id) => {
    const event = events.find((item) => item.id === id);
    return event?.name;
  };

  const onChangeDateFrom = (event) => {
    let { value } = event.target;
    event.target.value = getMaskDate(value);
    setDateStart(event.target.value);
  };

  const onChangeTimeStart = (event) => {
    let { value } = event.target;
    event.target.value = getMaskDate(value);
    setTimeStart(event.target.value);
  };

  return (
    <>
      <div className={styles.createFolderWrap}>
        <div className={styles.content}>
          <div className={styles.inputFieldsWrap}>
            <div className={styles.inputWrap}>
              <InputField
                model="text"
                height={width >= 1440 ? "40px" : "30px"}
                value={name}
                set={setName}
                placeholder={__("Имя")}
              />
            </div>
            <div className={styles.selectWrap}>
              <SelectChosen placeholder={__("Выбрать")} data={events} value={getEventName(eventType)}>
                <ul className={styles.eventsList}>
                  {events.map((event, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setEventType(event?.id);
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
            </div>
            <div className={styles.rangeDateLabel}>{__("Срок выполнения")}:</div>
            <div className={styles.rangeDateWrap}>
              <div className={styles.rangeDateBlock}>
                <span>{__("Дата")}:</span>
                <input
                  type="text"
                  className={styles.rangeInput}
                  placeholder="_ _ . _ _ . _ _ _ _"
                  value={dateStart}
                  maxLength={10}
                  onChange={onChangeDateFrom}
                />
              </div>
              &nbsp;&nbsp;
              <div className={styles.rangeDateBlock}>
                <span>{__("Время")}:</span>
                <input
                  type="text"
                  className={styles.rangeInput}
                  placeholder={__("_ _ : _ _ ")}
                  value={timeStart}
                  maxLength={5}
                  onChange={onChangeTimeStart}
                />
              </div>
            </div>
            <div className={styles.inputWrap}>
              <InputField
                model="text"
                height={width >= 1440 ? "40px" : "30px"}
                value={email}
                set={setEmail}
                placeholder={__("Участники (введите email или выбирите из списка)")}
              />
              <img
                src={`${imageSrc}assets/PrivateCabinet/input-arrow.svg`}
                className={styles.arrowInput}
                alt="Arrow Input"
              />
            </div>
            <div className={styles.inputWrap}>
              <TagPicker tag={tagOption.chosen} onSelectTag={onChangeTag} />
            </div>
            <div className={styles.inputWrap}>
              <textarea
                placeholder={__("Опишите задачу")}
                className={styles.description}
                onChange={(event) => setText(event.target.value)}
                value={text}
              >
                {text}
              </textarea>
            </div>
          </div>
          <div className={styles.customizeEvent}>
            <Colors color={color} setColor={setColor} />
            <Signs sign={figure} setSign={setFigure} />
            <Emoji emoji={emoji} setEmoji={setEmoji} />
          </div>
        </div>

        <div className={styles.edditButtons}>
          <SubmitButtons type={type} closeModal={closeModal} onSubmit={() => onSubmit(type)} />
        </div>
      </div>
    </>
  );
};

export default EditTask;

EditTask.propTypes = {
  closeModal: PropTypes.func,
  type: PropTypes.string
};
