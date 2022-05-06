import React, { useEffect, useRef, useState } from "react";

import styles from "./ProjectItem.module.sass";
import classNames from "classnames";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import CustomFolderItem from "../CustomFolderItem";
import { useDispatch, useSelector } from "react-redux";
import { onChooseProject, onGetProjectFolders } from "../../../../../Store/actions/CabinetActions";
import CustomItem from "../CustomItem";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { getIcon } from "../helpers";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { chosenFolderProps } from "../../../../../types/CreateFolder";

const ProjectItem = ({
  project,
  listCollapsed,
  setMouseParams,
  size,
  chosenFolder,
  setChosenFolder,
  setSelectedProject,
  chosen,
  setNewFolder,
  params,
  setParams,
  listRef
}) => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.Cabinet.project.projectFolders);
  const [collapse, setCollapse] = useState(false);
  const projectRef = useRef(null);

  useEffect(() => {
    if (params.fromRecent) {
      if (chosen) {
        setTimeout(() => {
          setCollapse(true);
          listRef.current.scrollTo({
            top: projectRef.current.offsetTop - 67, // minus height of the header in the list
            behavior: "smooth"
          });
        }, 0);
      } else {
        setCollapse(false);
      }
      setSelectedProject(project);
      setParams((state) => ({ ...state, fromRecent: false }));
    }
  }, [params.fromRecent]); //eslint-disable-line

  const renderFolders = () => {
    const projectFolders = folders[project.id];
    return projectFolders?.map((folder, index) => {
      return (
        <CustomFolderItem
          key={index}
          listSize={size}
          folder={folder}
          chosenFolder={chosenFolder}
          setChosenFolder={setChosenFolder}
          setMouseParams={setMouseParams}
          project={project}
          collapsed={listCollapsed}
        />
      );
    });
  };

  const handleOpenProject = () => {
    if (!collapse) {
      dispatch(onGetProjectFolders(project.id));
      dispatch(onChooseProject(project));
    }
    setSelectedProject(project);
  };

  return (
    <div onClick={handleOpenProject} className={styles.parentWrap} ref={projectRef}>
      <div
        className={classNames({
          [styles.wrapper]: true,
          [styles.wrapperChosen]: !!chosen,
          [styles?.[`wrapper_${size}`]]: !!size
        })}
      >
        <div
          className={classNames({
            [styles.titleWrap]: true,
            [styles.titleWrapChosen]: !!collapse
          })}
        >
          <div onClick={() => setCollapse(!collapse)} className={styles.leftWrap}>
            <div className={styles.leftTitleWrap}>
              {getIcon(project)}
              {!listCollapsed ? (
                <div className={styles.nameWrap}>
                  <p className={styles.title}>{project.name}</p>
                  <div
                    className={classNames({
                      [styles.tagBlock]: true,
                      [styles.ftag]: !!project?.tags
                    })}
                  >
                    {project?.tags && `#${project.tags}`}
                  </div>
                </div>
              ) : null}
            </div>

            <div className={styles.stickWrap}>
              {!listCollapsed ? (
                <div className={styles.symbolWrap}>
                  {project?.id_fig && (
                    <img
                      className={styles.symbols}
                      src={`${imageSrc}/assets/PrivateCabinet/signs/${project.id_fig}.svg`}
                      alt="emoji"
                    />
                  )}

                  {project?.id_emo && (
                    <img
                      className={classNames(styles.symbols, styles.smiles)}
                      src={`${imageSrc}/assets/PrivateCabinet/smiles/${project.id_emo}.svg`}
                      alt="emoji"
                    />
                  )}
                </div>
              ) : null}

              <PlayIcon
                className={classNames({
                  [styles.playButton]: true,
                  [styles.revert]: collapse
                })}
              />
            </div>
          </div>

          <div
            className={styles.menuWrap}
            onClick={(e) => {
              e.preventDefault();
              setMouseParams({
                x: e.clientX,
                y: e.clientY,
                width: 200,
                height: 25,
                type: "project"
              });
            }}
          >
            <span className={styles.menu} />
          </div>
        </div>

        <div
          className={classNames({
            [styles.innerFolders]: true,
            [styles.hidden]: !collapse
          })}
        >
          <CustomItem
            collapsed={listCollapsed}
            listSize={size}
            badge={project?.tasks}
            onClick={() => {}}
            item={{
              name: __("Создать лист"),
              img: `${imageSrc}assets/PrivateCabinet/documentGrey.svg`,
              symbol: `${imageSrc}/assets/PrivateCabinet/folders/add.svg`
            }}
          />
          <CustomItem
            collapsed={listCollapsed}
            listSize={size}
            onClick={() => setNewFolder(true)}
            item={{
              name: __("Создать новую папку"),
              img: `${imageSrc}/assets/PrivateCabinet/folders/folder-grey.svg`,
              symbol: `${imageSrc}/assets/PrivateCabinet/folders/add.svg`
            }}
          />
          {renderFolders()}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

ProjectItem.propTypes = {
  project: PropTypes.object,
  listCollapsed: PropTypes.bool,
  setMouseParams: PropTypes.func,
  size: PropTypes.string,
  chosenFolder: chosenFolderProps,
  setChosenFolder: PropTypes.func,
  setSelectedProject: PropTypes.func,
  chosen: PropTypes.bool,
  setNewFolder: PropTypes.func,
  params: PropTypes.object,
  setParams: PropTypes.func,
  listRef: PropTypes.any
};
