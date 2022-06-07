import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import styles from "./WorkSpace.module.sass";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile/Profile";
import ServePanel from "../../ServePanel";
import BottomPanel from "../../BottomPanel";
import WorkLinesPreview from "../WorkElements/WorkLinesPreview";
import WorkBarsPreview from "../WorkElements/WorkBarsPreview";
import WorkBars from "../WorkElements/WorkBars";
import WorkLines from "../WorkElements/WorkLines";
import FileBar from "../../WorkElements/FileBar";
import FileLine from "../../WorkElements/FileLine";
import FileLineShort from "../FileLineShort";
import ContextMenu from "../../../../../generalComponents/ContextMenu";
import CustomizeFile from "../../ContextMenuComponents/ContextMenuFile/CustomizeFile";
import OptionButtomLine from "../../WorkElements/OptionButtomLine";
import classNames from "classnames";
import ContextMenuFileList from "../../ContextMenuComponents/ContextMenuFileList";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { filePreviewProps, filePickProps, fileProps, fileListProps } from "../../../../../types/File";
import { fileAddCustomizationProps } from "../../../../../types/File";
import { safeActionProps } from "../../../../../types/Safe";

const WorkSpace = ({
  menuItem,
  chosenFile,
  setChosenFile,
  listCollapsed,
  setFilePreview,
  filePreview,
  fileSelect,
  action,
  setAction,
  fileList,
  filePick,
  setFilePick,
  fileAddCustomization,
  setFileAddCustomization,
  nullifyFilePick,
  nullifyAddingSeveralFiles,
  saveCustomizeSeveralFiles,
  setLoadingType,
  filesPage,
  setFilesPage,
  loadingFiles,
  setLoadingFiles,
  onSuccessLoading,
  gLoader
}) => {
  const { __ } = useLocales();
  const workElementsView = useSelector((state) => state.Cabinet.view);
  const size = useSelector((state) => state.Cabinet.size);
  const authorizedSafe = useSelector((state) => state.Cabinet.safe.authorizedSafe);
  const [mouseParams, setMouseParams] = useState(null);

  const nullifyAction = () => setAction({ type: "", name: "", text: "" });

  const fileRef = useRef(null);
  // Types of Files view
  const renderFiles = (Type) => {
    if (!fileList?.files) return null;
    return fileList.files.map((file, i) => {
      return (
        <Type
          key={i}
          file={file}
          setChosenFile={setChosenFile}
          chosen={
            filePick.show ? filePick.files.findIndex((el) => el === file.fid) >= 0 : chosenFile?.fid === file?.fid
          }
          chosenFile={chosenFile}
          setMouseParams={setMouseParams}
          setAction={setAction}
          setFilePreview={setFilePreview}
          filePreview={filePreview}
          filePick={filePick}
          setFilePick={setFilePick}
          size={size}
        />
      );
    });
  };

  useEffect(() => {
    if (fileList?.files?.length <= 10) {
      setFilesPage(2);
      if (fileRef.current) {
        fileRef.current.scrollTop = 0;
      }
    }
  }, [fileList?.files]); //eslint-disable-line

  return (
    <>
      <div
        className={classNames({
          [styles.workSpaceWrap]: true,
          [styles.workSpaceWrapCollapsed]: !!listCollapsed,
          [styles.workSpaceWrapUncollapsed]: !listCollapsed
        })}
      >
        <div className={styles.header}>
          <SearchField setChosenFile={setChosenFile} menuItem={menuItem} />
          <div></div>
          <div className={styles.infoHeader}>
            <StorageSize />
            <Notifications />
            <Profile />
          </div>
        </div>
        <ServePanel
          chosenFile={chosenFile}
          setAction={setAction}
          chooseSeveral={() => setFilePick({ ...filePick, files: [], show: !filePick.show })}
          filePick={filePick}
          fileAddCustomization={fileAddCustomization}
          setFileAddCustomization={setFileAddCustomization}
          addFile={fileSelect}
        />

        {workElementsView === "bars" && (
          <WorkBars
            file={chosenFile}
            filePick={filePick}
            filesPage={filesPage}
            loadingFiles={loadingFiles}
            setLoadingFiles={setLoadingFiles}
            onSuccessLoading={onSuccessLoading}
            fileRef={fileRef}
            gLoader={gLoader}
          >
            {renderFiles(FileBar)}
          </WorkBars>
        )}

        {workElementsView === "lines" && (
          <WorkLines
            file={chosenFile}
            filePick={filePick}
            filesPage={filesPage}
            setFilesPage={setFilesPage}
            loadingFiles={loadingFiles}
            setLoadingFiles={setLoadingFiles}
            onSuccessLoading={onSuccessLoading}
            fileRef={fileRef}
            gLoader={gLoader}
          >
            {renderFiles(FileLine)}
          </WorkLines>
        )}

        {workElementsView === "preview" && (
          <WorkBarsPreview
            file={chosenFile}
            filePick={filePick}
            setLoadingType={setLoadingType}
            filesPage={filesPage}
            setFilesPage={setFilesPage}
            loadingFiles={loadingFiles}
            setLoadingFiles={setLoadingFiles}
            onSuccessLoading={onSuccessLoading}
            fileRef={fileRef}
            gLoader={gLoader}
          >
            {renderFiles(FileBar)}
          </WorkBarsPreview>
        )}

        {workElementsView === "workLinesPreview" && (
          <WorkLinesPreview
            file={chosenFile}
            filePick={filePick}
            setLoadingType={setLoadingType}
            filesPage={filesPage}
            setFilesPage={setFilesPage}
            loadingFiles={loadingFiles}
            setLoadingFiles={setLoadingFiles}
            onSuccessLoading={onSuccessLoading}
            fileRef={fileRef}
            gLoader={gLoader}
          >
            {renderFiles(FileLineShort)}
          </WorkLinesPreview>
        )}

        {filePick.show ? (
          <OptionButtomLine
            filePick={filePick}
            setFilePick={setFilePick}
            actionName={filePick.intoZip ? __("Сжать в Zip") : __("Редактировать")}
            setAction={setAction}
            action={action}
            nullifyFilePick={nullifyFilePick}
          />
        ) : null}

        <BottomPanel />
      </div>

      {mouseParams !== null ? (
        <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
          <ContextMenuFileList
            filePick={filePick}
            file={chosenFile}
            mouseParams={mouseParams}
            filesPage={filesPage}
            menuItem={menuItem}
            authorizedSafe={authorizedSafe}
          />
        </ContextMenu>
      ) : null}

      {action.type === "customize" || filePick.customize || fileAddCustomization.several ? (
        <CustomizeFile
          title={
            filePick.customize || fileAddCustomization?.several ? __(`Редактировать выбранные файлы`) : action.name
          }
          file={chosenFile}
          close={
            filePick.customize
              ? nullifyFilePick
              : fileAddCustomization.several
              ? nullifyAddingSeveralFiles
              : nullifyAction
          }
          filePick={filePick}
          setFilePick={setFilePick}
          fileAddCustomization={fileAddCustomization}
          setFileAddCustomization={setFileAddCustomization}
          saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
          setLoadingType={setLoadingType}
          menuItem={menuItem}
        />
      ) : null}
    </>
  );
};

export default WorkSpace;

WorkSpace.propTypes = {
  menuItem: PropTypes.string,
  chosenFile: fileProps,
  setChosenFile: PropTypes.func,
  listCollapsed: PropTypes.bool,
  setFilePreview: PropTypes.func,
  filePreview: filePreviewProps,
  fileSelect: PropTypes.func,
  action: safeActionProps,
  setAction: PropTypes.func,
  fileList: fileListProps,
  filePick: filePickProps,
  setFilePick: PropTypes.func,
  fileAddCustomization: fileAddCustomizationProps,
  setFileAddCustomization: PropTypes.func,
  nullifyFilePick: PropTypes.func,
  nullifyAddingSeveralFiles: PropTypes.func,
  saveCustomizeSeveralFiles: PropTypes.func,
  setLoadingType: PropTypes.func,
  filesPage: PropTypes.number,
  setFilesPage: PropTypes.func,
  loadingFiles: PropTypes.bool,
  setLoadingFiles: PropTypes.func,
  onSuccessLoading: PropTypes.func,
  gLoader: PropTypes.bool
};
