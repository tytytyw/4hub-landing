import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./EditTask.module.sass";
import { imageSrc, MODALS, TASK_MODALS, TASK_TYPES } from "../../../../../../../generalComponents/globalVariables";
import { taskTypes } from "../../../../../../../types/Tasks";
import { useLocales } from "react-localized";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import InputField from "../../../../../../../generalComponents/InputField";
import Colors from "../../../../../../../generalComponents/Elements/Colors";
import TagPicker from "../../../../../../../generalComponents/TagPicker/TagPicker";
import Signs from "../../../../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../../../../generalComponents/Elements/Emoji";
import TextArea from "../../../../../../../generalComponents/TextArea/TextArea";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import SelectChosen from "generalComponents/SelectChosen/SelectChosen";
import { useStandartTasksDepartment, useTaskMessages, useUrgencyTask } from "generalComponents/collections";
import { ReactComponent as Bag } from "assets/PrivateCabinet/tasks/bag.svg";
import { ReactComponent as Home } from "assets/PrivateCabinet/tasks/home.svg";
import { onAddNewTask, onEditTask } from "Store/actions/TasksActions";

function EditTask({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const messages = useTaskMessages();

  const userstDepartment = useSelector((s) => s.Tasks.dep);
  const standartDepartment = useStandartTasksDepartment();
  const urgency = useUrgencyTask();
  const [departments] = useState([
    { ...standartDepartment.WORK_TASK },
    { ...standartDepartment.HOME_TASK },
    ...userstDepartment
  ]);

  const onChangeField = (name, value) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, [name]: value } }));
  };

  const geSelctName = (array, id) => array.find((item) => item.id === id)?.name;

  const getIcon = (dep) => {
    switch (dep.id) {
      case standartDepartment.WORK_TASK.id:
        return <Bag />;

      case standartDepartment.HOME_TASK.id:
        return <Home />;

      default:
        return (
          <img
            className={styles.eventIcon}
            src={`${imageSrc}assets/PrivateCabinet/library/own/${dep.icon}.svg`}
            alt="Event Icon"
          />
        );
    }
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
              <li key={dep.id} onClick={() => onChangeField("id_dep", dep.id)} className={styles.eventItem}>
                {getIcon(dep)}

                <p className={styles.eventName}>{dep.name}</p>
              </li>
            ))}
          </ul>
        </SelectChosen>
        <InputField
          model="text"
          value={params.name}
          set={(value) => onChangeField("name", value)}
          placeholder={__("Имя задачи")}
          editableClass={"fixedHeight"}
        />
        <SelectChosen placeholder={__("Имя категории")} value={geSelctName(urgency, params.id_act)}>
          <ul className={styles.eventsList}>
            {urgency.map((item) => (
              <li key={item.id} onClick={() => onChangeField("id_act", item?.id)} className={styles.eventItem}>
                <p className={styles.eventName}>{item.name}</p>
              </li>
            ))}
          </ul>
        </SelectChosen>

        <TagPicker tag={params.tags} onSelectTag={(value) => onChangeField("tags", value)} />
        <InputField
          model="text"
          value={params.startDate}
          set={(value) => onChangeField("date_start", value)}
          placeholder={__("Дата начала задачи")}
          editableClass={"fixedHeight"}
        />
        <InputField
          model="text"
          value={params.endDate}
          set={(value) => onChangeField("date_end", value)}
          placeholder={__("Дата завершения задачи")}
          editableClass={"fixedHeight"}
        />
        <Colors
          title={__("Выберите цвет Задачи")}
          color={params.id_color}
          setColor={(value) => onChangeField("id_color", value)}
        />
        <Signs sign={params.id_fig} title={__("Добавить знак")} setSign={(value) => onChangeField("id_fig", value)} />
      </div>
      <div className={styles.bottomWrap}>
        <Emoji
          emoji={params.id_emo}
          setEmoji={(value) => onChangeField("id_emo", value)}
          emojiEditableClass={"rowEmoji"}
          editableClass={"addTask"}
        />
        <div className={styles.margin} />
        <TextArea
          text={params.prim}
          onChange={(value) => onChangeField("prim", value)}
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
  closeModal: PropTypes.func
};
