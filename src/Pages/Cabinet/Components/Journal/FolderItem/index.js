import React from "react";
import styles from "./CustomFolderItem.module.sass";
import classNames from "classnames";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { projectFolderStructure } from "../../../../../types/Project";
import { chosenFolderProps } from "../../../../../types/CreateFolder";

const FolderItem = ({ folder, chosenFolder, setChosenFolder, setMouseParams }) => {
  const onClickHandler = () => {
    setChosenFolder(folder?.id);
  };

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles.active]: chosenFolder === folder?.id
      })}
      onClick={onClickHandler}
    >
      <div className={styles.innerFolder}>
        <div className={styles.innerFolderName}>
          <img
            src={`${imageSrc}assets/PrivateCabinet/journal/${folder.icon}.svg`}
            alt="icon"
            className={styles.innerFolderIcon}
          />
          <div className={styles.nameWrap}>
            <div className={styles.name}>{folder.name}</div>
          </div>
        </div>

        <div className={styles.innerFolderMedia}>
          <div
            className={styles.menuWrap}
            onClick={(e) => {
              setMouseParams({
                x: e.clientX,
                y: e.clientY,
                width: 200,
                height: 25
              });
            }}
          >
            <span className={styles.menu} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderItem;

FolderItem.propTypes = {
  folder: projectFolderStructure,
  chosenFolder: chosenFolderProps,
  setChosenFolder: PropTypes.func,
  setMouseParams: PropTypes.func
};
