import React, { useState } from "react";

import styles from "./CreateTask.module.sass";
import InputField from "../../../../../../../generalComponents/InputField";
import { colors, useTags } from "../../../../../../../generalComponents/collections";
import Colors from "../../../../../../../generalComponents/Elements/Colors";
import Signs from "../../../../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../../../../generalComponents/Elements/Emoji";
import Select from "./Select/Select";
import { imageSrc, MODALS, TASK } from "../../../../../../../generalComponents/globalVariables";
import { useDispatch, useSelector } from "react-redux";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import classnames from "classnames";
import { ADD_NEW_TASK } from "Store/types";
import { onAddNewTask, onSetModals } from "Store/actions/CabinetActions";
import { useEvents } from "generalComponents/CalendarHelper";
import { getMaskDate } from "generalComponents/generalHelpers";

const CreateTask = ({ closeModal }) => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.user.userInfo);
  const tags = useTags();
  const [eventType, setEventType] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [email, setEmail] = useState("");
  const [tagOption, setTagOption] = useState({ chosen: "", count: 30 });
  const [text, setText] = useState("");
  const [color, setColor] = useState(colors[0]);
  const [figure, setFigure] = useState("");
  const [emoji, setEmoji] = useState("");
  const [idType, setIdType] = useState("");
  const [name, setName] = useState("");
  const events = useEvents();

  const renderTags = () => {
    return tags.map((tag, i) => {
      return (
        <div key={i} onClick={() => onChangeTag(tag)}>
          {tag}
        </div>
      );
    });
  };

  const addNewTask = () => {
    dispatch({
      type: ADD_NEW_TASK,
      payload: {
        name,
        idType,
        text,
        dateStart,
        timeStart,
        tagOption,
        filters: {
          color,
          emoji,
          figure
        },
        emails: [email]
      }
    });
    dispatch(onSetModals(MODALS.LOADER, true));
    dispatch(onAddNewTask(TASK.API_ADD_TASKS, __("Не удалось добавить задачу")));
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
          <span className={styles.title}>{__("Добавить событие")}</span>
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
              <Select placeholder={__("Выбрать")} data={events} value={getEventName(eventType)}>
                <ul className={styles.eventsList}>
                  {events.map((event, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setEventType(event?.id);
                        setIdType(event?.id);
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
              </Select>
            </div>
            <div className={styles.rangeDateLabel}>{__("Срок выполнения:")}</div>
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
                  placeholder={__("_ _ . _ _ ")}
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
            <div className={styles.tagPicker}>
              <span>#</span>
              <input
                className={styles.inputField}
                type="text"
                placeholder={__("Добавте #Тег")}
                value={tagOption.chosen}
                onChange={(e) => onChangeTag(e.target.value)}
                onFocus={() => {
                  setTagOption({ ...tagOption, show: true });
                }}
              />
              <span>{tagOption.count}/30</span>
              <div className={classnames(styles.tagList, `scrollbar-thin-${theme}`)}>{renderTags()}</div>
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

        <div className={styles.buttonsWrap}>
          <div className={styles.cancel} onClick={closeModal}>
            {__("Отмена")}
          </div>
          <div className={styles.add} onClick={addNewTask}>
            {__("Создать")}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTask;

CreateTask.propTypes = {
  closeModal: PropTypes.func
};
