import React, { useState } from "react";

import styles from "./ProjectProperty.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import General from "./General";
import Security from "./Security";
import PrevVersions from "./PrevVersions";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { projectProps } from "../../../../../../types/ContextMenuFile";

const ProjectProperty = ({ close, project, getIcon }) => {
  const { __ } = useLocales();
  const [inset, setInset] = useState("general");
  return (
    <PopUp set={close}>
      <div className={styles.propertiesWrap}>
        <span className={styles.cross} onClick={close} />
        <span className={styles.title}>Свойства: {project?.name}</span>
        <div className={styles.insetWrap}>
          <div
            className={`${styles.inset} ${
              inset === "general" ? styles.chosen : null
            }`}
            onClick={() => setInset("general")}>
            {__("Общие")}
          </div>
          <div
            className={`${styles.inset} ${
              inset === "security" ? styles.chosen : null
            }`}
            onClick={() => setInset("security")}>
            {__("Доступы")}
          </div>
          <div
            className={`${styles.inset} ${
              inset === "prev" ? styles.chosen : null
            }`}
            onClick={() => setInset("prev")}>
            {__("Предыдущие версии")}
          </div>
        </div>
        {inset === "general" ? (
          <General project={project} getIcon={getIcon} />
        ) : null}
        {inset === "security" ? <Security project={project} /> : null}
        {inset === "prev" ? (
          <PrevVersions project={project} getIcon={getIcon} />
        ) : null}
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

export default ProjectProperty;

ProjectProperty.propTypes = {
  close: PropTypes.func,
  project: projectProps,
  getIcon: PropTypes.func
};
