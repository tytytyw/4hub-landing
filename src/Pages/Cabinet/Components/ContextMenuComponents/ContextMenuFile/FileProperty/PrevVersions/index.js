import React from "react";

import styles from "./PrevVersions.module.sass";
import File from "../../../../../../../generalComponents/Files";
import InputField from "../../../../../../../generalComponents/InputField";
import { imageSrc } from "../../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import { fileProps } from "../../../../../../../types/CustomFolderItem";

const PrevVersions = ({ file }) => {
  const { __ } = useLocales();
  return (
    <div className={styles.prevVersionsWrap}>
      <div className={styles.nameBlock}>
        <div className={styles.fileWrap}>
          <File format={file.ext} color={file.color} />
        </div>
        <div className={styles.inputWrap}>
          <InputField height="90%" placeholder={file.fname.slice(0, file.fname.lastIndexOf("."))} disabled={true} />
        </div>
      </div>
      <div className={styles.prevChanged}>
        <div className={styles.infoWrap}>
          <span className={styles.name}>{__("Дата изменения:")}</span>
          <span className={styles.value}>{file.ctime}</span>
        </div>
        <div className={styles.prevFileBlock}>
          <div className={styles.fileWrap}>
            <File format={file.ext} color={file.color} />
          </div>
          <div className={styles.infoFile}>
            <span>{file.fname.slice(0, file.fname.lastIndexOf("."))}</span>
            <div className={styles.fileInfo}>
              {file.fig || file.emo ? (
                <div className={styles.signs}>
                  {file.fig ? <img src={`${imageSrc}assets/PrivateCabinet/signs/${file.fig}.svg`} alt="emoji" /> : null}
                  {file.emo ? (
                    <img src={`${imageSrc}assets/PrivateCabinet/smiles/${file.emo}.svg`} alt="emoji" />
                  ) : null}
                </div>
              ) : null}
              <div className={styles.fileInfoText}>
                <span className={styles.sizeNow}>{file.size_now}</span>
                <span>{file.mtime.slice(0, file.mtime.indexOf(" "))}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          {__(
            "Вы можете восстановить старую версию файла из резервной копии для восстановления старого файла нажмите кнопку восстановить"
          )}
        </div>
        <div className={styles.restoreWrap}>
          <div className={styles.restore}>{__("Восстановить")}</div>
        </div>
      </div>
    </div>
  );
};

export default PrevVersions;

PrevVersions.propTypes = {
  file: fileProps
};
