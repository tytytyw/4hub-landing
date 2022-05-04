import React, { useState } from "react";

import styles from "./FileProperty.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import General from "./General";
import Security from "./Security";
import PrevVersions from "./PrevVersions";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { useLocales } from "react-localized";

const FileProperty = () => {
  const { __ } = useLocales();
  const [inset, setInset] = useState("general");
  const contextMenuModals = useSelector((s) => s.Cabinet.modals.contextMenuModals);
  const file = contextMenuModals.items[0];
  const dispatch = useDispatch();

  const close = () =>
    dispatch(
      onSetModals("contextMenuModals", {
        ...contextMenuModals,
        type: "",
        items: []
      })
    );

  return (
    <PopUp set={close}>
      <div className={styles.propertiesWrap}>
        <span className={styles.cross} onClick={close} />
        <span className={styles.title}>Свойства: {file?.fname.slice(0, file?.fname.lastIndexOf("."))}</span>
        <div className={styles.insetWrap}>
          <div
            className={`${styles.inset} ${inset === "general" ? styles.chosen : null}`}
            onClick={() => setInset("general")}
          >
            {__("Общие")}
          </div>
          <div
            className={`${styles.inset} ${inset === "security" ? styles.chosen : null}`}
            onClick={() => setInset("security")}
          >
            {__("Доступы")}
          </div>
          <div
            className={`${styles.inset} ${inset === "prev" ? styles.chosen : null}`}
            onClick={() => setInset("prev")}
          >
            {__("Предыдущие версии")}
          </div>
        </div>
        {inset === "general" ? <General file={file} /> : null}
        {inset === "security" ? <Security file={file} /> : null}
        {inset === "prev" ? <PrevVersions file={file} /> : null}
        <div className={styles.buttonsWrap}>
          <div className={styles.cancel} onClick={close}>
            {__("Отмена")}
          </div>
          <div className={`${styles.add}`} onClick={close}>
            {__("Готово")}
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default FileProperty;
