import React from "react";

import styles from "./PrevVersions.module.sass";
import { ReactComponent as FolderIcon } from "../../../../../../../assets/PrivateCabinet/folder-2.svg";
import { colors } from "../../../../../../../generalComponents/collections";
import InputField from "../../../../../../../generalComponents/InputField";
import { imageSrc } from "../../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import { projectFolderStructure } from "../../../../../../../types/Project";

const PrevVersions = ({ folder }) => {
  const { __ } = useLocales();
  return (
    <div className={styles.prevVersionsWrap}>
      <div className={styles.nameBlock}>
        <div className={styles.folderWrap}>
          <FolderIcon className={`${styles.folderWrap} ${colors.filter((el) => el.color === folder.color)[0]?.name}`} />
        </div>
        <div className={styles.inputWrap}>
          <InputField height="90%" placeholder={folder.name.slice(0, folder.name.lastIndexOf("."))} disabled={true} />
        </div>
      </div>
      <div className={styles.prevChanged}>
        <div className={styles.infoWrap}>
          <span className={styles.name}>{__("Дата изменения:")}</span>
          <span className={styles.value}>{folder.ctime}</span>
        </div>
        <div className={styles.prevFileBlock}>
          <div className={styles.folderWrap}>
            <FolderIcon
              className={`${styles.folderWrap} ${colors.filter((el) => el.color === folder.color)[0]?.name}`}
            />
          </div>
          <div className={styles.infoFile}>
            <span>{folder.name.slice(0, folder.name.lastIndexOf("."))}</span>
            <div className={styles.folderInfo}>
              {folder.fig || folder.emo ? (
                <div className={styles.signs}>
                  {folder.fig ? (
                    <img src={`${imageSrc}assets/PrivateCabinet/signs/${folder.fig}.svg`} alt="emoji" />
                  ) : null}
                  {folder.emo ? (
                    <img src={`${imageSrc}assets/PrivateCabinet/smiles/${folder.emo}.svg`} alt="emoji" />
                  ) : null}
                </div>
              ) : null}
              <div className={styles.folderInfoText}>
                <span className={styles.sizeNow}>{folder.size_now}</span>
                <span />
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
  folder: projectFolderStructure
};
