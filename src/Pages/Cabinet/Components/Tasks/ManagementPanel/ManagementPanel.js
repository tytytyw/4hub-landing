import React from "react";
import styles from "./ManagementPanel.module.sass";
import { useLocales } from "react-localized";
import { BUTTON_TYPES } from "../../../../../generalComponents/globalVariables";
import Button from "../../../../../generalComponents/CustomableButton/CustomableButton";
import { ReactComponent as Bag } from "assets/PrivateCabinet/tasks/bag.svg";
import { ReactComponent as Home } from "assets/PrivateCabinet/tasks/home.svg";
import { ReactComponent as AddIcon } from "../../../../../assets/PrivateCabinet/plus-3.svg";
import classNames from "classnames";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";

function ManagementPanel() {
  const { __ } = useLocales();

  return (
    <div className={styles.panelWrap}>
      <Button style={BUTTON_TYPES.LIGHT_LONG}>
        {<Bag />} {__("Рабочие задачи")} {<PlayIcon className={styles.playIcon} />}
      </Button>
      <div className={styles.space} />
      <Button style={BUTTON_TYPES.LIGHT_LONG}>
        {<Home />} {__("Личные задачи")} {<PlayIcon className={styles.playIcon} />}
      </Button>
      <div className={styles.space} />
      <Button style={BUTTON_TYPES.LIGHT_LONG}>
        {<AddIcon className={classNames(styles.addIcon)} />} {__("Создать раздел")}
      </Button>
    </div>
  );
}

export default ManagementPanel;
