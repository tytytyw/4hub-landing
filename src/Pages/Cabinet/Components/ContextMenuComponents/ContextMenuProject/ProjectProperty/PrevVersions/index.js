import React from "react";

import styles from "./PrevVersions.module.sass";
import InputField from "../../../../../../../generalComponents/InputField";
import { imageSrc } from "../../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { projectProps } from "../../../../../../../types/ContextMenuFile";

const PrevVersions = ({ project, getIcon }) => {
  const { __ } = useLocales();
  return (
    <div className={styles.prevVersionsWrap}>
      <div className={styles.nameBlock}>
        <div className={styles.projectWrap}>{getIcon(project)}</div>
        <div className={styles.inputWrap}>
          <InputField height="90%" placeholder={project.name} disabled={true} />
        </div>
      </div>
      <div className={styles.prevChanged}>
        <div className={styles.infoWrap}>
          <span className={styles.name}>{__("Дата изменения:")}</span>
          <span className={styles.value}>{project.ctime}</span>
        </div>
        <div className={styles.prevProjectBlock}>
          <div className={styles.projectWrap}>{getIcon(project)}</div>
          <div className={styles.infoProject}>
            <span>{project.name}</span>
            <div className={styles.projectInfo}>
              {project.fig || project.emo ? (
                <div className={styles.signs}>
                  {project.fig ? (
                    <img
                      src={`${imageSrc}assets/PrivateCabinet/signs/${project.fig}.svg`}
                      alt="emoji"
                    />
                  ) : null}
                  {project.emo ? (
                    <img
                      src={`${imageSrc}assets/PrivateCabinet/smiles/${project.emo}.svg`}
                      alt="emoji"
                    />
                  ) : null}
                </div>
              ) : null}
              <div className={styles.projectInfoText}>
                <span className={styles.sizeNow}>{project.size_now}</span>
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
  project: projectProps,
  getIcon: PropTypes.func,
};
