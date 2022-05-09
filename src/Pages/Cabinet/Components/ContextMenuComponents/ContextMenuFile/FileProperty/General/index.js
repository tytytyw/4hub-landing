import React from "react";

import styles from "./General.module.sass";
import File from "../../../../../../../generalComponents/Files";
import InputField from "../../../../../../../generalComponents/InputField";
import { useLocales } from "react-localized";
import { fileProps } from "../../../../../../../types/File";

const General = ({ file }) => {
  const { __ } = useLocales();
  return (
    <div className={styles.generalWrap}>
      <div className={styles.nameBlock}>
        <div className={styles.fileWrap}>
          <File format={file.ext} color={file.color} />
        </div>
        <div className={styles.inputWrap}>
          <InputField height="90%" placeholder={file.fname.slice(0, file.fname.lastIndexOf("."))} disabled={true} />
        </div>
      </div>
      <div className={styles.typeBlock}>
        <div className={styles.typeWrap}>
          <span className={styles.name}>{__("Тип файла:")}</span>
          <span className={styles.value}>{file.ext}</span>
        </div>
        <div className={styles.typeWrap}>
          <span className={styles.name}>{__("Расположение:")}</span>
          <span className={styles.value}>{file.gdir}</span>
        </div>
      </div>
      <div className={styles.infoBlock}>
        <div className={styles.infoWrap}>
          <span className={styles.name}>{__("Размер:")}</span>
          <span className={styles.value}>{file.size_now}</span>
        </div>
        <div className={styles.infoWrap}>
          <span className={styles.name}>{__("Дата создание:")}</span>
          <span className={styles.value}>{file.mtime}</span>
        </div>
        <div className={styles.infoWrap}>
          <span className={styles.name}>{__("Дата изменения:")}</span>
          <span className={styles.value}>{file.ctime}</span>
        </div>
      </div>
    </div>
  );
};

export default General;

General.propTypes = {
  file: fileProps
};
