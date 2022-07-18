import React from "react";
import PropTypes from "prop-types";
import styles from "./EditTask.module.sass";
import {
  imageSrc,
  MODALS,
  TaskFields,
  TASK_MODALS,
  TASK_TYPES
} from "../../../../../../../generalComponents/globalVariables";
import { taskTypes } from "../../../../../../../types/Tasks";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";
import InputField from "../../../../../../../generalComponents/InputField";
import Colors from "../../../../../../../generalComponents/Elements/Colors";
import TagPicker from "../../../../../../../generalComponents/TagPicker/TagPicker";
import Signs from "../../../../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../../../../generalComponents/Elements/Emoji";
import TextArea from "../../../../../../../generalComponents/TextArea/TextArea";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import SelectChosen from "generalComponents/SelectChosen/SelectChosen";
import { useTaskMessages, useUrgencyTask } from "generalComponents/collections";
import { onAddNewTask, onEditTask } from "Store/actions/TasksActions";
import { getMaskDate } from "generalComponents/generalHelpers";
import { onSetModals } from "Store/actions/CabinetActions";
import { useDepartmentsOfTasks } from "Pages/Cabinet/Components/Tasks/hooks/GetDepartment";

function EditTask({ type, params, closeModal, onChangeField }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const messages = useTaskMessages();
  const urgency = useUrgencyTask();
  const departments = useDepartmentsOfTasks();

  const geSelctName = (array, id) => array.find((item) => item.id === id)?.name;

  const onChangeDate = ({ target }) => {
    if (target.value.length > 10) return;
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, [target.name]: getMaskDate(target.value) } }));
  };

  const onSubmit = () => {
    type === TASK_MODALS.ADD_TASK
      ? dispatch(onAddNewTask(params, messages[TASK_TYPES.TASK][type]))
      : dispatch(onEditTask(params, messages[TASK_TYPES.TASK][type]));
  };
  return (
    <div className={styles.editTaskWrap}>
      <div className={styles.columnsWrap}>
        <SelectChosen placeholder={__("Имя категории")} value={geSelctName(departments, params.id_dep)}>
          <ul className={styles.eventsList}>
            {departments.map((dep) => (
              <li key={dep.id} onClick={() => onChangeField(TaskFields.ID_DEP, dep.id)} className={styles.eventItem}>
                <img
                  className={styles.eventIcon}
                  src={`${imageSrc}assets/PrivateCabinet/library/own/${dep.icon}.svg`}
                  alt="Event Icon"
                />

                <p className={styles.eventName}>{dep.name}</p>
              </li>
            ))}
          </ul>
        </SelectChosen>
        <InputField
          model="text"
          value={params.name}
          set={(value) => onChangeField(TaskFields.NAME, value)}
          placeholder={__("Имя задачи")}
          editableClass={"fixedHeight"}
        />
        <SelectChosen placeholder={__("Имя категории")} value={geSelctName(urgency, params.id_act)}>
          <ul className={styles.eventsList}>
            {urgency.map((item) => (
              <li key={item.id} onClick={() => onChangeField(TaskFields.ID_ACT, item?.id)} className={styles.eventItem}>
                <p className={styles.eventName}>{item.name}</p>
              </li>
            ))}
          </ul>
        </SelectChosen>

        <TagPicker tag={params.tags} onSelectTag={(value) => onChangeField(TaskFields.TAGS, value)} />

        <input
          name={TaskFields.DATE_START}
          value={params.date_start}
          onChange={onChangeDate}
          placeholder={__("Дата начала задачи")}
          className={styles.date}
          autoComplete="off"
        />
        <input
          name={TaskFields.DATE_END}
          value={params.date_end}
          onChange={onChangeDate}
          placeholder={__("Дата завершения задачи")}
          className={styles.date}
          autoComplete="off"
        />
        <Colors
          title={__("Выберите цвет Задачи")}
          color={params.id_color}
          setColor={(value) => onChangeField(TaskFields.ID_COLOR, value)}
        />
        <Signs
          sign={params.id_fig}
          title={__("Добавить знак")}
          setSign={(value) => onChangeField(TaskFields.ID_FIGURE, value)}
        />
      </div>
      <div className={styles.bottomWrap}>
        <Emoji
          emoji={params.id_emo}
          setEmoji={(value) => onChangeField(TaskFields.ID_EMOTION, value)}
          emojiEditableClass={"rowEmoji"}
          editableClass={"addTask"}
        />
        <div className={styles.margin} />
        <TextArea
          text={params.prim}
          onChange={(value) => onChangeField(TaskFields.TEXT, value)}
          placeholder={__("Текст задачи")}
        />
        <div className={styles.buttonsWrap}>
          <SubmitButtons type={type} closeModal={closeModal} onSubmit={onSubmit} />
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
  closeModal: PropTypes.func,
  onChangeField: PropTypes.func
};
