import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { usePeriods } from "../../../../generalComponents/collections";
import styles from "./MyFiles.module.sass";
import List from "../List";
import FileItem from "./FileItem/index";
import WorkSpace from "./WorkSpace/index";
import { onChooseFiles } from "../../../../Store/actions/CabinetActions";
import { onGetUserInfo } from "../../../../Store/actions/startPageAction";
import CreateSafePassword from "../CreateSafePassword";
import SuccessMessage from "../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage";
import Loader from "../../../../generalComponents/Loaders/4HUB";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import { useScrollElementOnScreen } from "../../../../generalComponents/Hooks";
import FilesGroup from "../WorkElements/FilesGroup/FilesGroup";
import ContextMenuFileList from "../ContextMenuComponents/ContextMenuFileList";
import CreateFile from "../CreateFile";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { filePreviewProps } from "../../../../types/File";
import { fileAddCustomizationProps } from "../../../../types/File";
import { loadedFilesProps, loadingFileProps } from "../../../../types/LoadingFiles";
import classnames from "classnames";

const MyFiles = ({
  filePreview,
  setFilePreview,
  setFileAddCustomization,
  fileSelect,
  fileAddCustomization,
  menuItem,
  setMenuItem,
  nullifyAddingSeveralFiles,
  saveCustomizeSeveralFiles,
  setLoadingType,
  filesPage,
  setFilesPage,
  awaitingFiles,
  setAwaitingFiles,
  loaded,
  setLoaded,
  loadingFile,
  fileErrors,
  setLoadingFile
}) => {
  const { __ } = useLocales();
  const periods = usePeriods();
  const dispatch = useDispatch();
  const [chosenFile, setChosenFile] = useState(null);
  const { theme } = useSelector((state) => state.user.userInfo);
  const fileList = useSelector((state) => state.Cabinet.fileList);
  const workElementsView = useSelector((state) => state.Cabinet.view);
  const search = useSelector((state) => state.Cabinet.search);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const [gLoader, setGLoader] = useState(false);
  const { pathname } = useLocation();
  const [listCollapsed, setListCollapsed] = useState(false);
  const [chosenFolder] = useState({
    path: "global/all",
    open: false,
    subPath: ""
  });
  const [filePick, setFilePick] = useState({ show: false, files: [] });
  const [mouseParams, setMouseParams] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [action, setAction] = useState({ type: "", name: "", text: "" });
  const nullifyAction = () => setAction({ type: "", name: "", text: "" });
  const nullifyFilePick = () => setFilePick({ show: false, files: [], customize: false });

  const [safePassword, setSafePassword] = useState({ open: false });
  const renderFileItem = (Type, list) => {
    if (!list) return null;
    return list.map((file, i) => {
      return (
        <Type
          chosenFile={chosenFile}
          setChosenFile={setChosenFile}
          key={i}
          file={file}
          chosen={
            filePick.show ? filePick.files.findIndex((el) => el === file.fid) >= 0 : chosenFile?.fid === file?.fid
          }
          listCollapsed={listCollapsed}
          setMouseParams={setMouseParams}
          action={action}
          setAction={setAction}
          nullifyAction={nullifyAction}
          setFilePreview={setFilePreview}
          filePreview={filePreview}
          filePick={filePick}
          setFilePick={setFilePick}
        />
      );
    });
  };

  const renderGroups = (list, params) => {
    if (!list) return null;
    const keys = Object.keys(list);
    return keys.map((k, i) =>
      list[k].length > 0 ? (
        <FilesGroup
          key={i}
          index={i}
          fileList={list[k]}
          filePreview={filePreview}
          setFilePreview={setFilePreview}
          chosenFile={chosenFile}
          setChosenFile={setChosenFile}
          filePick={filePick}
          setFilePick={setFilePick}
          title={periods[k] ?? __("Более года назад")}
          setAction={setAction}
          setMouseParams={setMouseParams}
          //WorkLinesPreview
          params={params}
          menuItem={menuItem}
          renderFileItem={renderFileItem}
        />
      ) : null
    );
  };

  const onSafePassword = (boolean) => setSafePassword({ ...safePassword, open: boolean });

  useEffect(() => {
    dispatch(onGetUserInfo());
    setMenuItem("myFiles");
    return () => setMenuItem("");
  }, []); //eslint-disable-line

  const onSuccessLoading = (result) => {
    if (typeof result === "number") {
      setTimeout(() => {
        result > 0 ? setFilesPage((filesPage) => filesPage + 1) : setFilesPage(0);
        setLoadingFiles(false);
      }, 50); // 50ms needed to prevent recursion of ls_json requests
    } else if (typeof result === "object") {
      let moreElements = false;
      for (let key in result) {
        if (result[key].length > 0) moreElements = true;
      }
      setTimeout(() => {
        moreElements ? setFilesPage((filesPage) => filesPage + 1) : setFilesPage(0);
        setLoadingFiles(false);
      }, 500);
    } else {
      setTimeout(() => {
        setFilesPage(0);
        setLoadingFiles(false);
      }, 500);
    }
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
  };

  const load = (entry) => {
    if (!gLoader) {
      if (
        entry.isIntersecting &&
        !loadingFiles &&
        filesPage !== 0 &&
        (pathname.includes("files") || pathname === "/archive")
      ) {
        setLoadingFiles(true);
        dispatch(onChooseFiles("", search, filesPage, onSuccessLoading, "", "", "file_list_all", pathname));
        pathname === "/files" &&
          dispatch(
            onChooseFiles(fileList?.path, search, filesPage, onSuccessLoading, "", "", "file_list_all", pathname)
          );
        pathname === "/downloaded-files" &&
          dispatch(
            onChooseFiles(fileList?.path, search, filesPage, onSuccessLoading, "", "", "file_list_all", pathname)
          );
      }
    }
  };

  const [scrollRef] = useScrollElementOnScreen(options, load);

  return (
    <>
      <div className={styles.workAreaWrap}>
        {workElementsView === "workLinesPreview" && (
          <List
            title={__("Загрузить файл")}
            src="add-file.svg"
            setListCollapsed={setListCollapsed}
            listCollapsed={listCollapsed}
            onCreate={() => fileSelect()}
            chosenFile={chosenFile}
            setChosenFile={setChosenFile}
          >
            <div className={classnames(styles.folderListWrap, `scrollbar-thin-${theme}`)}>
              {Array.isArray(fileList?.files)
                ? renderFileItem(FileItem, fileList?.files)
                : renderGroups(fileList?.files)}
              {!gLoader ? (
                <div
                  className={`${styles.bottomLine} ${filesPage === 0 ? styles.bottomLineHidden : ""}`}
                  style={{ height: "100px" }}
                  ref={scrollRef}
                >
                  <Loader
                    type="bounceDots"
                    position="absolute"
                    background="white"
                    zIndex={5}
                    width="100px"
                    height="100px"
                    containerType="bounceDots"
                  />
                </div>
              ) : null}
            </div>
          </List>
        )}
        <WorkSpace
          chosenFolder={chosenFolder}
          workElementsView={workElementsView}
          mouseParams={mouseParams}
          setMouseParams={setMouseParams}
          action={action}
          setAction={setAction}
          nullifyAction={nullifyAction}
          nullifyFilePick={nullifyFilePick}
          chosenFile={chosenFile}
          setChosenFile={setChosenFile}
          filePreview={filePreview}
          setFilePreview={setFilePreview}
          setSafePassword={setSafePassword}
          fileSelect={fileSelect}
          filePick={filePick}
          setFilePick={setFilePick}
          setShowSuccessMessage={setShowSuccessMessage}
          fileAddCustomization={fileAddCustomization}
          setFileAddCustomization={setFileAddCustomization}
          nullifyAddingSeveralFiles={nullifyAddingSeveralFiles}
          saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
          setLoadingType={setLoadingType}
          filesPage={filesPage}
          setFilesPage={setFilesPage}
          gLoader={gLoader}
          setGLoader={setGLoader}
          menuItem={menuItem}
        />
        {fileAddCustomization.show ? (
          <CreateFile
            title={fileAddCustomization.create ? __("Создать файл") : __("Добавление файла")}
            info={chosenFolder}
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
            create={fileAddCustomization.create}
            setGLoader={setGLoader}
            initFolder={chosenFolder}
            showChoiceFolders={true}
            menuItem={menuItem}
          />
        ) : null}
        {safePassword.open && (
          <CreateSafePassword onToggle={onSafePassword} title={__("Создайте пароль для Сейфа с паролями")} />
        )}
        {showSuccessMessage && (
          <SuccessMessage showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} />
        )}
      </div>
      {mouseParams !== null ? (
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
    </>
  );
};

export default MyFiles;
MyFiles.propTypes = {
  filePreview: filePreviewProps,
  setFilePreview: PropTypes.func,
  setFileAddCustomization: PropTypes.func,
  fileSelect: PropTypes.func,
  fileAddCustomization: fileAddCustomizationProps,
  menuItem: PropTypes.string,
  setMenuItem: PropTypes.func,
  nullifyAddingSeveralFiles: PropTypes.func,
  saveCustomizeSeveralFiles: PropTypes.func,
  setLoadingType: PropTypes.func,
  filesPage: PropTypes.number,
  setFilesPage: PropTypes.func,
  awaitingFiles: PropTypes.oneOfType([PropTypes.arrayOf(loadingFileProps), PropTypes.array]),
  setAwaitingFiles: PropTypes.func,
  loaded: PropTypes.arrayOf(loadedFilesProps),
  setLoaded: PropTypes.func,
  loadingFile: PropTypes.oneOfType([PropTypes.arrayOf(loadingFileProps), PropTypes.array]),
  fileErrors: PropTypes.arrayOf(PropTypes.string),
  setLoadingFile: PropTypes.func
};
