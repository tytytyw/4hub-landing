import React from "react";

import styles from "./General.module.sass";
import { ReactComponent as FolderIcon } from "../../../../../../../assets/PrivateCabinet/folder-2.svg";
import { colors } from "../../../../../../../generalComponents/collections";
import InputField from "../../../../../../../generalComponents/InputField";
import { useLocales } from "react-localized";
import { propertiesFolderProps } from "../../../../../../../types/PropertiesFolder";

const General = ({ folder }) => {
  const { __ } = useLocales();
  return (
    <div className={styles.generalWrap}>
      <div className={styles.nameBlock}>
        <div className={styles.folderWrap}>
          <FolderIcon className={`${styles.folderWrap} ${colors.filter((el) => el.color === folder.color)[0]?.name}`} />
        </div>
        <div className={styles.inputWrap}>
          <InputField height="90%" placeholder={folder.name} disabled={true} />
        </div>
      </div>
      <div className={styles.typeBlock}>
        <div className={styles.typeWrap}>
          <span className={styles.name}>{__("Тип файла:")}</span>
          <span className={styles.value}>{__("Папка")}</span>
        </div>
        <div className={styles.typeWrap}>
          <span className={styles.name}>{__("Расположение:")}</span>
          <span className={styles.value}>{folder.path}</span>
        </div>
      </div>
      <div className={styles.infoBlock}>
        <div className={styles.infoWrap}>
          <span className={styles.name}>{__("Размер:")}</span>
          <span className={styles.value}>{folder.size_now}</span>
        </div>
        <div className={styles.infoWrap}>
          <span className={styles.name}>{__("Дата создания:")}</span>
          <span className={styles.value}>{folder.mtime}</span>
        </div>
        <div className={styles.infoWrap}>
          <span className={styles.name}>{__("Дата изменения:")}</span>
          <span className={styles.value}>{folder.ctime}</span>
        </div>
      </div>
    </div>
  );
};

export default General;

General.propTypes = {
  folder: propertiesFolderProps
};
