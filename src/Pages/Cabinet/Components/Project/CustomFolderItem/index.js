import React from "react";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { ReactComponent as FolderIcon } from "../../../../../assets/PrivateCabinet/folder-2.svg";
import { colors } from "../../../../../generalComponents/collections";
import styles from "./CustomFolderItem.module.sass";
import classNames from "classnames";
import { onChooseProjectFiles, setChosenFolderProject } from "../../../../../Store/actions/CabinetActions";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { projectFolderStructure } from "../../../../../types/Project";
import { chosenFolderProps } from "../../../../../types/CreateFolder";

const CustomFolderItem = ({ folder, chosenFolder, setMouseParams, listSize, setChosenFolder, project, collapsed }) => {
  const dispatch = useDispatch();

  const onClickHandler = () => {
    setChosenFolder(folder);
    dispatch(onChooseProjectFiles(folder, project));
    dispatch(setChosenFolderProject(folder.name));
  };

  return (
    <div
      className={classNames({
        [styles.innerFolderWrap]: true,
        [styles.active]: folder?.id && chosenFolder === folder?.id,
        [styles?.[`wrapper_${listSize}`]]: !!listSize
      })}
      onClick={onClickHandler}
    >
      <div
        className={classNames({
          [styles.innerFolder]: true,
          [styles.collapsed]: collapsed
        })}
      >
        <div className={styles.innerFolderName}>
          <FolderIcon
            className={classNames(styles.innerFolderIcon, colors.filter((el) => el.name === folder.color)[0]?.name)}
          />
          {folder.is_pass === 1 && (
            <img className={styles.lock} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt="emoji" />
          )}
          {collapsed ? null : (
            <div className={styles.nameWrap}>
              <p className={styles.name}>{folder.name}</p>
              <div
                className={classNames({
                  [styles.tagBlock]: true,
                  [styles.ftag]: !!folder?.tags
                })}
              >
                {folder?.tags && `#${folder.tags}`}
              </div>
            </div>
          )}
        </div>

        <div className={styles.innerFolderMedia}>
          {!collapsed && folder.emo && (
            <img
              className={styles.symbols}
              src={`${imageSrc}/assets/PrivateCabinet/smiles/${folder?.emo}.svg`}
              alt="emoji"
            />
          )}

          {!collapsed && folder.fig && (
            <img
              className={styles.symbols}
              src={`${imageSrc}assets/PrivateCabinet/signs/${folder.fig}.svg`}
              alt="emoji"
            />
          )}

          <div
            className={styles.menuWrap}
            onClick={(e) => {
              e.preventDefault();
              setMouseParams({
                x: e.clientX,
                y: e.clientY,
                width: 200,
                height: 25,
                type: "menu"
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

export default CustomFolderItem;

CustomFolderItem.propTypes = {
  folder: projectFolderStructure,
  chosenFolder: chosenFolderProps,
  setMouseParams: PropTypes.func,
  listSize: PropTypes.string,
  setChosenFolder: PropTypes.func,
  project: PropTypes.object,
  collapsed: PropTypes.bool
};
