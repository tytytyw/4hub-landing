import React from "react";
import styles from "./ManagementPanel.module.sass";
import { useLocales } from "react-localized";
import { BUTTON_TYPES } from "../../../../../generalComponents/globalVariables";
import Button from "../../../../../generalComponents/CustomableButton/CustomableButton";

function ManagementPanel() {
  const { __ } = useLocales();

  return (
    <div className={styles.panelWrap}>
      <Button style={BUTTON_TYPES.LIGHT_LONG}>{__("Рабочие задачи")}</Button>
    </div>
  );
}

export default ManagementPanel;
