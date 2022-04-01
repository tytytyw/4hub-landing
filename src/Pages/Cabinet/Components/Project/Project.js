import React, { useEffect, useRef, useState } from "react";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import styles from "./Project.module.sass";
import List from "./List";
import WorkSpace from "./WorkSpace";
import ProjectItem from "./ProjectItem/ProjectItem";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../../api";
import {
  onGetContacts,
  onGetProjects,
  onGetProjectFolders,
  onAddRecentFiles
} from "../../../../Store/actions/CabinetActions";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import {
  useContextMenuProjects,
  useContextMenuSubFolder
} from "../../../../generalComponents/collections";
import CreateProject from "./CreateProject";
import ProjectContextItem from "./ProjectContextItem";
import CreateFolder from "../ContextMenuComponents/ContextMenuProject/CreateFolder";
import CustomizeFolder from "../ContextMenuComponents/ContextMenuProject/CustomizeFolder";
import CopyLinkShare from "../ContextMenuComponents/generalContextMenuComponents/CopyLinkShare";
import CustomizeProject from "../ContextMenuComponents/ContextMenuProject/CustomizeProject";
import FolderProperty from "../ContextMenuComponents/ContextMenuProject/FolderProperty";
import SuccessMessage from "../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage";
import ActionApproval from "../../../../generalComponents/ActionApproval";
import Error from "../../../../generalComponents/Error";
import Loader from "../../../../generalComponents/Loaders/4HUB";
import ConfigAccessFolder from "../ContextMenuComponents/ContextMenuProject/ConfigAccessFolder/ConfigAccessFolder";
import ProjectProperty from "../ContextMenuComponents/ContextMenuProject/ProjectProperty";
import { ReactComponent as FolderIcon } from "../../../../assets/PrivateCabinet/folder-2.svg";
import CreateFile from "../CreateFile";
import CreateSafePassword from "../CreateSafePassword";
import CustomizeFile from "../ContextMenuComponents/ContextMenuFile/CustomizeFile";
import { getIcon } from "./helpers";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const Project = ({
  setLoadingType,
  setMenuItem,
  fileAddCustomization,
  setFileAddCustomization,
  awaitingFiles,
  setAwaitingFiles,
  loaded,
  setLoaded,
  loadingFile,
  fileErrors,
  setLoadingFile,
  menuItem,
  fileSelect,
  saveCustomizeSeveralFiles
}) => {
  const { __ } = useLocales();
  const contextMenuSubFolder = useContextMenuSubFolder();
  const contextMenuProjects = useContextMenuProjects();
  const dispatch = useDispatch();
  const projects = useSelector(state => state.Cabinet.project.projects);
  const uid = useSelector(state => state.user.uid);
  const size = useSelector(state => state.Cabinet.size);
  const [chosenFolder, setChosenFolder] = useState(null);
  const [mouseParams, setMouseParams] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [createProject, setCreateProject] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [newFolder, setNewFolder] = useState(false);
  const [error, setError] = useState(false);
  const [action, setAction] = useState({ type: "", name: "", text: "" });
  const nullifyAction = () => setAction({ type: "", name: "", text: "" });
  const [selectedProject, setSelectedProject] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [gLoader, setGLoader] = useState(false);
  const [safePassword, setSafePassword] = useState({ open: false });
  const [params, setParams] = useState({ fromRecent: false });
  const [listCollapsed, setListCollapsed] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    dispatch(onGetProjects());
    dispatch(onGetContacts());
    setMenuItem("project");
    dispatch(onAddRecentFiles("history_projects"));
  }, []); // eslint-disable-line

  const callbackArrMain = [
    {
      type: "addMember",
      name: __("Добавить участника"),
      text: ``,
      callback: () => setAddMember(true)
    },
    {
      type: "addFolder",
      name: __("Добавить папку"),
      text: ``,
      callback: () => setNewFolder(true)
    },
    {
      type: "copyLink",
      name: __("Скопировать ссылку и поделиться"),
      text: ``,
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "customize",
      name: __("Редактирование проекта"),
      text: ``,
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "archive",
      name: __("Добавить файл в архив"),
      text: __(
        `Вы действительно хотите архивировать проект ${selectedProject?.name}?`
      ),
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "propertiesProject",
      name: __("Свойства"),
      text: ``,
      callback: (list, index) => setAction(list[index])
    }
  ];

  const additionalMenuItems = [
    {
      type: "delete",
      name: __("Удаление проекта"),
      text: __(
        `Вы действительно хотите удалить проект ${selectedProject?.name}?`
      ),
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "leave",
      name: __("Покинуть проект"),
      text: __(`Вы действительно покинуть проект ${selectedProject?.name}?`),
      callback: (list, index) => setAction(list[index])
    }
  ];

  const callbackArrSub = [
    {
      type: "customizeFolder",
      name: __("Редактирование папки"),
      text: ``,
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "setAccessFolder",
      name: __("Доступ и экспорт"),
      text: ``,
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "propertiesFolder",
      name: __("Свойства"),
      text: ``,
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "deleteFolder",
      name: __("Удаление папки"),
      text: __(`Вы действительно хотите удалить выбранную папку?`),
      callback: (list, index) => setAction(list[index])
    }
  ];

  const renderMenuItems = (target, type) => {
    return target.map((item, i) => {
      return (
        <ContextMenuItem
          key={i}
          width={mouseParams.width}
          height={mouseParams.height}
          text={item.name}
          imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
          callback={() =>
            type.forEach((el, index) => {
              if (el.type === item.type) el.callback(type, index);
            })
          }
        />
      );
    });
  };

  const renderProjectMenuItems = (target, type) => {
    return target.map((item, i) => {
      return (
        <ProjectContextItem
          key={i}
          width={mouseParams.width}
          height={mouseParams.height}
          text={item.name}
          callback={() =>
            type.forEach((el, index) => {
              if (el.type === item.type) el.callback(type, index);
            })
          }
          imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuProject/${item.img}.svg`}
        />
      );
    });
  };

  const renderProjects = () => {
    return projects?.map((project, index) => (
      <ProjectItem
        size={size}
        key={index}
        project={project}
        chosenFolder={chosenFolder}
        setChosenFolder={setChosenFolder}
        setMouseParams={setMouseParams}
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        setSelectedProject={setSelectedProject}
        chosen={selectedProject?.id === project.id}
        setNewFolder={setNewFolder}
        setParams={setParams}
        params={params}
        listRef={listRef}
        listCollapsed={listCollapsed}
      />
    ));
  };

  const deleteProject = () => {
    nullifyAction();
    api
      .post(`/ajax/project_del.php?uid=${uid}&id_project=${selectedProject.id}`)
      .then(res => {
        if (res.data.ok === 1) {
          setShowSuccessMessage(__("Проект удален"));
          dispatch(onGetProjects());
        } else {
          console.log(res);
        }
      })
      .catch(err => console.log(err));
  };

  const deleteFolder = () => {
    nullifyAction();
    api
      .post(
        `/ajax/project_folders_del.php?uid=${uid}&id_project=${selectedProject.id}&dir_name=${chosenFolder.name}`
      )
      .then(res => {
        if (res.data.ok === 1) {
          dispatch(onGetProjectFolders(selectedProject.id));
          setChosenFolder({ ...chosenFolder, open: false });
        } else {
          setError(__("Папка не удалена. Попробуйте еще раз!"));
        }
      })
      .catch(() => setError(__("Папка не удалена. Попробуйте еще раз!")));
  };

  const onSafePassword = boolean =>
    setSafePassword(state => ({ ...state, open: boolean }));

  return (
    <div className={styles.workAreaWrap}>
      <List
        title={__("Создать проект")}
        src="add_project.svg"
        className={styles.listWrap}
        onCreate={setCreateProject}
        ref={listRef}
        listCollapsed={listCollapsed}
        setListCollapsed={setListCollapsed}
      >
        {projects?.length < 1 ? (
          <div className={styles.emptyBlock}>
            <img
              className={styles.emptyImg}
              src={`${imageSrc}/assets/PrivateCabinet/create_arrow.svg`}
              alt="Create Arrow"
            />
            <h4 className={styles.emptyTitle}>
              {__("СОЗДАЙТЕ Ваш первый проект")}
            </h4>
          </div>
        ) : (
          <div className={styles.folderWrap}>{renderProjects()}</div>
        )}
      </List>

      <WorkSpace
        setMouseParams={setMouseParams}
        addMember={addMember}
        setAddMember={setAddMember}
        fileSelect={fileSelect}
        chosenFolder={chosenFolder}
        menuItem={menuItem}
        setParams={setParams}
        setSelectedProject={setSelectedProject}
        mouseParams={mouseParams}
        listCollapsed={listCollapsed}
      />

      {mouseParams?.type === "menu" && (
        <ContextMenu
          params={mouseParams}
          setParams={setMouseParams}
          tooltip={true}
        >
          <div className={styles.mainMenuItems}>
            {renderMenuItems(contextMenuSubFolder.main, callbackArrSub)}
          </div>
        </ContextMenu>
      )}

      {mouseParams?.type === "project" && (
        <ContextMenu
          params={mouseParams}
          setParams={setMouseParams}
          tooltip={true}
        >
          <div className={styles.mainMenuItems}>
            {renderProjectMenuItems(contextMenuProjects.main, callbackArrMain)}
          </div>
          <div className={styles.additionalMenuItems}>
            {renderProjectMenuItems(
              contextMenuProjects.additional,
              additionalMenuItems
            )}
          </div>
        </ContextMenu>
      )}

      {showSuccessMessage && (
        <SuccessMessage
          showSuccessMessage={showSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      )}

      {createProject && (
        <CreateProject
          title={__("Создание проекта")}
          onCreate={setCreateProject}
          setLoadingType={setLoadingType}
        />
      )}
      {newFolder && (
        <CreateFolder
          onCreate={setNewFolder}
          setError={setError}
          projectId={selectedProject.id}
          parentFolder={chosenFolder}
          title={__("Новая папка")}
          setGLoader={setGLoader}
        />
      )}
      {action.type === "customizeFolder" ? (
        <CustomizeFolder
          nullifyAction={nullifyAction}
          setError={setError}
          projectId={selectedProject.id}
          folder={chosenFolder}
          title={__("Редактировать папку")}
          setGLoader={setGLoader}
        />
      ) : null}
      {action.type === "copyLink" ? (
        <CopyLinkShare
          nullifyAction={nullifyAction}
          setShowSuccessMessage={setShowSuccessMessage}
          project={selectedProject}
          // setLoadingType={setLoadingType}
        />
      ) : null}
      {action.type === "delete" ? (
        <ActionApproval
          name={action.name}
          text={action.text}
          set={nullifyAction}
          approve={__("Удалить")}
          callback={deleteProject}
        >
          <div className={styles.fileActionWrap}>
            {getIcon(selectedProject)}
          </div>
        </ActionApproval>
      ) : null}
      {action.type === "leave" ? (
        <ActionApproval
          name={action.name}
          text={action.text}
          set={nullifyAction}
          callback={nullifyAction}
          approve={__("Покинуть")}
        >
          <div className={styles.fileActionWrap}>
            {getIcon(selectedProject)}
          </div>
        </ActionApproval>
      ) : null}
      {action.type === "archive" ? (
        <ActionApproval
          name={action.name}
          text={action.text}
          set={nullifyAction}
          callback={nullifyAction}
          approve={__("Архивировать")}
        >
          <div className={styles.fileActionWrap}>
            {getIcon(selectedProject)}
          </div>
        </ActionApproval>
      ) : null}
      {action.type === "customize" ? (
        <CustomizeProject
          title={__("Редатирование проекта")}
          onCreate={nullifyAction}
          project={selectedProject}
          setLoadingType={setLoadingType}
        />
      ) : null}

      {action.type === "setAccessFolder" ? (
        <ConfigAccessFolder
          folder={chosenFolder}
          files={{}}
          close={nullifyAction}
          showSuccessMessage={showSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      ) : null}

      {action.type === "propertiesProject" ? (
        <ProjectProperty
          close={nullifyAction}
          project={selectedProject}
          getIcon={getIcon}
        />
      ) : null}

      {action.type === "deleteFolder" ? (
        <ActionApproval
          name={action.name}
          text={action.text}
          set={nullifyAction}
          callback={deleteFolder}
          approve={__("Удалить")}
        >
          <div className={styles.fileActionWrap}>
            <FolderIcon className={styles.innerFolderIcon} />
          </div>
        </ActionApproval>
      ) : null}

      {action.type === "propertiesFolder" ? (
        <FolderProperty close={nullifyAction} folder={chosenFolder} />
      ) : null}

      {fileAddCustomization.show && (
        <CreateFile
          title={
            fileAddCustomization.create
              ? __("Создать файл")
              : __("Добавить файл")
          }
          info={{ ...selectedProject, dir: chosenFolder.name }}
          blob={fileAddCustomization.file}
          setBlob={setFileAddCustomization}
          onToggleSafePassword={onSafePassword}
          awaitingFiles={awaitingFiles}
          setAwaitingFiles={setAwaitingFiles}
          loaded={loaded}
          setLoaded={setLoaded}
          loadingFile={loadingFile}
          fileErrors={fileErrors}
          setLoadingFile={setLoadingFile}
          showChoiceFolders={false}
          menuItem={menuItem}
        />
      )}
      {fileAddCustomization.several ? (
        <CustomizeFile
          title={__(`Редактировать выбранные файлы`)}
          info={{ ...selectedProject, dir: chosenFolder.name }}
          fileAddCustomization={fileAddCustomization}
          setFileAddCustomization={setFileAddCustomization}
          saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
          setLoadingType={setLoadingType}
          menuItem={menuItem}
        />
      ) : null}

      {safePassword.open && (
        <CreateSafePassword
          onToggle={onSafePassword}
          title={__("Создайте пароль для сейфа")}
        />
      )}

      {error && <Error error={error} set={setError} message={error} />}
      {gLoader && (
        <Loader
          type="bounceDots"
          position="absolute"
          background="rgba(255, 255, 255, 0.1)"
          zIndex={11}
          containerType="bounceDots"
        />
      )}
    </div>
  );
};

export default Project;

Project.propTypes = {
  setLoadingType: PropTypes.func,
  setMenuItem: PropTypes.func,
  fileAddCustomization: PropTypes.object,
  setFileAddCustomization: PropTypes.func,
  awaitingFiles: PropTypes.array,
  setAwaitingFiles: PropTypes.func,
  loaded: PropTypes.array,
  setLoaded: PropTypes.func,
  loadingFile: PropTypes.array,
  fileErrors: PropTypes.array,
  setLoadingFile: PropTypes.func,
  menuItem: PropTypes.string,
  fileSelect: PropTypes.func,
  saveCustomizeSeveralFiles: PropTypes.func
};
