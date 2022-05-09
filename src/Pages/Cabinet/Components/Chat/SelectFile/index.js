import React, { useState, useEffect } from "react";
import styles from "./SelectFile.module.sass";
import PopUp from "../../../../../generalComponents/PopUp";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import TextButton from "../../../../../generalComponents/TextButton";
import CustomFolderItem from "../../MyFolders/CustomFolderItem";
import FileLineShort from "../../WorkElements/FileLineShort";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import { MODALS } from "../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import { useScrollElementOnScreen } from "../../../../../generalComponents/Hooks";
import {
  onGetFolders,
  onChooseFiles,
  clearFileList,
  onSortFile,
  onSetModals
} from "../../../../../Store/actions/CabinetActions";
import { useFolders } from "../../../../../generalComponents/collections";
import classNames from "classnames";

const SelectFile = ({ nullifyAction, title, attachedFiles, setAttachedFiles }) => {
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const global = useSelector((state) => state.Cabinet.global);
  const other = useSelector((state) => state.Cabinet.other);
  const folders = useFolders();
  const fileList = useSelector((state) => state.Cabinet.fileList?.files);
  const path = useSelector((state) => state.Cabinet.fileList?.path);
  const dispatch = useDispatch();
  const { __ } = useLocales();

  const [chosenFolder, setChosenFolder] = useState(null);
  const [chosenFiles, setChosenFiles] = useState(attachedFiles ?? []);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [filesPage, setFilesPage] = useState(1);

  const FileIsChosen = (file) => chosenFiles.some((chosenFile) => chosenFile.fid === file.fid);

  const addChosenFile = (f) => {
    const file = { ...f, kind: "file" };

    if (!FileIsChosen(f) && chosenFiles.length > 19)
      dispatch(onSetModals(MODALS.ERROR, { open: true, message: __("Максимум 20 файлов") }));
    else
      setChosenFiles((prevFiles) =>
        FileIsChosen(f) ? prevFiles.filter((prveFile) => prveFile.fid !== file.fid) : [...prevFiles, file]
      );
  };

  const renderLoader = (position = "relative") => (
    <div style={{ width: "420px" }}>
      <Loader
        type="bounceDots"
        position={position}
        background="transparent"
        zIndex={5}
        width="100px"
        height="100px"
        containerType="bounceDots"
      />
    </div>
  );

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
  const load = (entry) => {
    if (entry.isIntersecting && !loadingFiles && filesPage !== 0) {
      setLoadingFiles(true);
      dispatch(onChooseFiles(path, "", filesPage, onSuccessLoading));
    }
  };
  const [scrollRef] = useScrollElementOnScreen(
    {
      root: null,
      rootMargin: "0px",
      threshold: 0
    },
    load
  );

  const renderFiles = (files, folder) => {
    if (!files) return null;
    return (
      <div className={styles.fileListWrap}>
        {files.map((file, i) => {
          return !file.is_dir ? (
            <FileLineShort
              key={i}
              file={file}
              setChosenFile={addChosenFile}
              chosen={FileIsChosen(file)}
              setMouseParams={null}
              setAction={null}
              setFilePreview={null}
              filePreview={null}
              filePick={null}
              setFilePick={null}
              callbackArrMain={null}
              folderSelect={null}
              setGLoader={null}
              filesSize="small"
              style={{
                width: 420,
                paddingLeft: 25 * (folder?.path?.split("/").length - 1) ?? 0
              }}
              disableContextMenu={true}
            />
          ) : null;
        })}
        <div
          className={classNames({ [styles.bottomLine]: true, [styles.bottomLineHidden]: filesPage === 0 })}
          style={{ height: filesPage ? "100px" : 0 }}
          ref={scrollRef}
        >
          {renderLoader("absolute")}
        </div>
      </div>
    );
  };

  const renderFolderList = (root) => {
    if (!Array.isArray(root)) return renderLoader("absolute");
    return root.map((folder, i) => {
      return (
        <CustomFolderItem
          key={i + folder.name}
          f={folder}
          listCollapsed={false}
          isSelectFolder={true}
          setChosenFolder={setChosenFolder}
          chosenFolder={chosenFolder}
          chosen={chosenFolder?.info?.path === folder.path}
          p={25}
          isRecent={false}
          subFolder={false}
          offDispatch={true}
          foldersWidth={420}
          renderFiles={renderFiles}
          disableChosenFolderStyles={true}
          renderLoader={renderLoader}
        >
          {chosenFolder?.info?.path === folder.path && Array.isArray(fileList) && fileList.length
            ? renderFiles(fileList, folder)
            : null}
          {chosenFolder?.info?.path === folder.path && !fileList ? renderLoader() : null}
        </CustomFolderItem>
      );
    });
  };

  const onSubmit = () => {
    if (chosenFiles && !(attachedFiles && attachedFiles.some((f) => f.fid === chosenFiles.fid)))
      setAttachedFiles(chosenFiles);
    nullifyAction();
  };

  // TODO - Need to fix
  // eslint-disable-next-line
  useEffect(async () => {
    dispatch(onGetFolders("", folders));
    await dispatch(onSortFile("byName&sort_reverse=0"));
    return async () => {
      dispatch(onSortFile("byDateCreated&sort_reverse=1&group=ctime"));
      await dispatch(clearFileList());
      dispatch({ type: "CHOOSE_FILES", payload: [] }); //cleaning fileList when changing tabs
    };
  }, []); //eslint-disable-line

  useEffect(() => {
    if (!fileList) setFilesPage(1);
  }, [fileList]);

  return (
    <PopUp set={nullifyAction} background={chatTheme.name === "dark" ? "#292929" : ""}>
      <div className={styles.selectFileWrapper}>
        <span className={styles.title}>{title}</span>
        <div className={styles.crossWrapper} onClick={nullifyAction}>
          <span className={styles.cross} />
        </div>

        <div className={styles.contentWrap}>
          <div className={styles.folderListWrap}>
            {renderFolderList(global)}
            {renderFolderList(other)}
          </div>
        </div>

        <div className={styles.buttonsWrap}>
          <div className={styles.cancelButtonWrapper}>
            <TextButton text="Отмена" type="cancel" callback={nullifyAction} />
          </div>
          <TextButton text="Отправить" type="ok" disabled={!chosenFiles} callback={onSubmit} />
        </div>
      </div>
    </PopUp>
  );
};
export default SelectFile;

SelectFile.propTypes = {
  nullifyAction: PropTypes.func.isRequired,
  title: PropTypes.string,
  attachedFiles: PropTypes.array,
  setAttachedFiles: PropTypes.func.isRequired
};
