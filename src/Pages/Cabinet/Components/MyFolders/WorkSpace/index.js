import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import styles from "./WorkSpace.module.sass";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile/Profile";
import ServePanel from "../../ServePanel";
import BottomPanel from "../../BottomPanel";
import ContextMenu from "../../../../../generalComponents/ContextMenu";
import RecentFiles from "../../RecentFiles";
import OptionButtomLine from "../../WorkElements/OptionButtomLine";
import Share from "../../ContextMenuComponents/generalContextMenuComponents/Share/Share";
import CopyLinkShare from "../../ContextMenuComponents/generalContextMenuComponents/CopyLinkShare";
import { useElementResize } from "../../../../../generalComponents/Hooks";
import FolderPath from "../FolderPath";
import ItemsList from "../../WorkElements/ItemsList/ItemsList";
import ContextMenuFileList from "../../ContextMenuComponents/ContextMenuFileList";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { filePreviewProps, fileProps } from "../../../../../types/WorkElements";
import { fileAddCustomizationProps } from "../../../../../types/FileAddCustomization";
import { actionProps } from "../../../../../types/Action";
import { chosenFolderProps } from "../../../../../types/CreateFolder";
// import { createFilesProps } from "../../../../../types/CreateFile";
// import { chosenFolderProps } from "../../../../../types/CreateFolder";

const WorkSpace = ({
  chosenFile,
  setChosenFile,
  chosenFolder,
  listCollapsed,
  setFilePreview,
  filePreview,
  fileSelect,
  action,
  setAction,
  fileAddCustomization,
  setFileAddCustomization,
  showSuccessMessage,
  setShowSuccessMessage,
  setLoadingType,
  gLoader,
  setGLoader,
  setNewFolder,
  setNewFolderInfo,
  newFolderInfo,
  filesPage,
  setFilesPage,
  menuItem,
  setChosenFolder,
  openFolderMenu
}) => {
  const { __ } = useLocales();
  const workElementsView = useSelector((state) => state.Cabinet.view);
  const recentFiles = useSelector((state) => state.Cabinet.recentFiles);
  const [mouseParams, setMouseParams] = useState(null);
  const [filePick, setFilePick] = useState({
    show: false,
    files: [],
    customize: false,
    intoZip: false
  });
  const nullifyAction = () => setAction({ type: "", name: "", text: "" });
  const nullifyFilePick = () => setFilePick({ show: false, files: [], customize: false, intoZip: false });
  const fileRef = useRef(null);
  const [containerRef, width] = useElementResize();

  useEffect(
    () => setChosenFile(null),
    [chosenFolder.path, chosenFolder.subPath] // eslint-disable-line
  );

  return (
    <>
      <div
        className={`${styles.workSpaceWrap} 
                ${
                  typeof listCollapsed === "boolean"
                    ? listCollapsed
                      ? styles.workSpaceWrapCollapsed
                      : styles.workSpaceWrapUncollapsed
                    : undefined
                }`}
        ref={containerRef}
      >
        <div className={styles.header}>
          <SearchField setChosenFile={setChosenFile} menuItem={menuItem} />
          <div className={styles.infoHeader}>
            <StorageSize />
            <Notifications />
            <Profile />
          </div>
        </div>
        {recentFiles?.length > 0 && (
          <RecentFiles setFilePreview={setFilePreview} filePreview={filePreview} width={width} />
        )}
        <ServePanel
          view={workElementsView}
          chosenFile={chosenFile}
          setAction={setAction}
          fileSelect={fileSelect}
          addFolder={(boolean) => {
            setNewFolder(boolean);
            setNewFolderInfo({ ...newFolderInfo, path: "" });
          }}
          addFile={fileSelect}
          chooseSeveral={() => setFilePick({ ...filePick, files: [], show: !filePick.show })}
          filePick={filePick}
          fileAddCustomization={fileAddCustomization}
          setFileAddCustomization={setFileAddCustomization}
          setGLoader={setGLoader}
          setNewFolderInfo={setNewFolderInfo}
          setFilesPage={setFilesPage}
          menuItem={menuItem}
        />
        <FolderPath
          width={width}
          setFilesPage={setFilesPage}
          setGLoader={setGLoader}
          setChosenFolder={setChosenFolder}
        />
        <ItemsList
          setGLoader={setGLoader}
          setFilesPage={setFilesPage}
          setChosenFolder={setChosenFolder}
          setChosenFile={setChosenFile}
          filePick={filePick}
          setMouseParams={setMouseParams}
          setAction={setAction}
          setFilePreview={setFilePreview}
          filePreview={filePreview}
          setFilePick={setFilePick}
          chosenFile={chosenFile}
          fileSelect={fileSelect}
          filesPage={filesPage}
          chosenFolder={chosenFolder}
          gLoader={gLoader}
          fileRef={fileRef}
          width={width}
          openFolderMenu={openFolderMenu}
        />
        {filePick.show ? (
          <OptionButtomLine
            filePick={filePick}
            actionName={filePick.intoZip ? __("Сжать в Zip") : __("Редактировать")}
            setAction={setAction}
            action={action}
            nullifyFilePick={nullifyFilePick}
            chosenFile={chosenFile}
            menuItem={menuItem}
            filesPage={filesPage}
          />
        ) : null}
        <BottomPanel />
      </div>
      {mouseParams !== null && mouseParams?.width && mouseParams?.height ? (
        <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
          <ContextMenuFileList
            filePick={filePick}
            file={chosenFile}
            mouseParams={mouseParams}
            filesPage={filesPage}
            menuItem={menuItem}
          />
        </ContextMenu>
      ) : null}
      {action.type === "resendFolder" ? (
        <Share
          file={action.type === "resendFolder" ? chosenFolder.info : chosenFile}
          files={action.type === "resendFolder" ? [] : filePick.files}
          close={nullifyAction}
          action_type={action.type === "resendFolder" ? "dir_access_add" : "file_share"}
          showSuccessMessage={showSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage}
          setLoadingType={setLoadingType}
        />
      ) : null}
      {action.type === "setAccessFolder" ? (
        <CopyLinkShare
          nullifyAction={nullifyAction}
          setShowSuccessMessage={setShowSuccessMessage}
          item={action.type === "copyLink" ? chosenFile : chosenFolder.info}
          action_type={action.type === "copyLink" ? "file_share" : "dir_access_add"}
        />
      ) : null}
    </>
  );
};

export default WorkSpace;

WorkSpace.propTypes = {
  chosenFile: fileProps,
  setChosenFile: PropTypes.func,
  chosenFolder: chosenFolderProps,
  listCollapsed: PropTypes.bool,
  setFilePreview: PropTypes.func,
  filePreview: filePreviewProps,
  fileSelect: PropTypes.func,
  action: actionProps,
  setAction: PropTypes.func,
  fileAddCustomization: fileAddCustomizationProps,
  setFileAddCustomization: PropTypes.func,
  showSuccessMessage: PropTypes.bool,
  setShowSuccessMessage: PropTypes.func,
  setLoadingType: PropTypes.func,
  gLoader: PropTypes.bool,
  setGLoader: PropTypes.func,
  setNewFolder: PropTypes.func,
  setNewFolderInfo: PropTypes.func,
  newFolderInfo: PropTypes.exact({
    path: PropTypes.string
  }),
  filesPage: PropTypes.number,
  setFilesPage: PropTypes.func,
  menuItem: PropTypes.string,
  setChosenFolder: PropTypes.func,
  openFolderMenu: PropTypes.func
};
