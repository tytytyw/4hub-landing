import React from "react";
import styles from "./ManagementPanel.module.sass";
import { useLocales } from "react-localized";
import { BUTTON_TYPES, MODALS, TASK_MODALS } from "../../../../../generalComponents/globalVariables";
import Button from "../../../../../generalComponents/CustomableButton/CustomableButton";
import { ReactComponent as Bag } from "assets/PrivateCabinet/tasks/bag.svg";
import { ReactComponent as Home } from "assets/PrivateCabinet/tasks/home.svg";
import { ReactComponent as AddIcon } from "../../../../../assets/PrivateCabinet/plus-3.svg";
import classNames from "classnames";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import { onSetModals } from "../../../../../Store/actions/CabinetActions";
import { useDispatch } from "react-redux";

function ManagementPanel() {
  const { __ } = useLocales();
  const dispatch = useDispatch();

  const onAddSection = () =>
    dispatch(onSetModals(MODALS.TASKS, { type: TASK_MODALS.ADD_SECTION, params: { width: 420, title: "" } }));

  return (
    <div className={styles.panelWrap}>
      <Button light style={BUTTON_TYPES.LIGHT_LONG}>
        {<Bag />} {__("Рабочие задачи")} {<PlayIcon className={styles.playIcon} />}
      </Button>
      <div className={styles.space} />
      <Button light style={BUTTON_TYPES.LIGHT_LONG}>
        {<Home />} {__("Личные задачи")} {<PlayIcon className={styles.playIcon} />}
      </Button>
      <div className={styles.space} />
      <Button light style={BUTTON_TYPES.LIGHT_LONG} onClick={onAddSection}>
        {<AddIcon className={classNames(styles.addIcon)} />} {__("Создать раздел")}
      </Button>
    </div>
  );
}

export default ManagementPanel;
