import React, { useState, useEffect } from "react";
import styles from "./SelectFile.module.sass";
import PopUp from "../../../../../generalComponents/PopUp";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import TextButton from "../../../../../generalComponents/TextButton";
import CustomFolderItem from "../../MyFolders/CustomFolderItem";
import FileLineShort from "../../WorkElements/FileLineShort";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import {
  onGetFolders,
  onChooseFiles,
  clearFileList,
  onSortFile,
} from "../../../../../Store/actions/CabinetActions";
import { useFolders } from "../../../../../generalComponents/collections";

const SelectFile = ({
  nullifyAction,
  title,
  attachedFiles,
  setAttachedFiles,
}) => {
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const global = useSelector((state) => state.Cabinet.global);
  const other = useSelector((state) => state.Cabinet.other);
  const folders = useFolders();
  const fileList = useSelector((state) => state.Cabinet.fileList?.files);
  const path = useSelector((state) => state.Cabinet.fileList?.path);
  const dispatch = useDispatch();

  const [chosenFolder, setChosenFolder] = useState(null);
  const [chosenFiles, setChosenFiles] = useState(attachedFiles ?? []);

  const FileIsChosen = (file) =>
    chosenFiles.some((chosenFile) => chosenFile.fid === file.fid);

  const addChosenFile = (f) => {
    const file = { ...f, kind: "file" };

    setChosenFiles((prevFiles) =>
      FileIsChosen(f)
        ? prevFiles.filter((prveFile) => prveFile.fid !== file.fid)
        : [...prevFiles, file]
    );
  };

  const renderLoader = () => (
    <div style={{ width: "420px" }}>
      <Loader
        type="bounceDots"
        position="relative"
        background="transparent"
        zIndex={5}
        width="100px"
        height="100px"
        containerType="bounceDots"
      />
    </div>
  );

  const renderFiles = (files, folder) => {
    if (!files) return null;
    return files.map((file, i) => {
      return (
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
            paddingLeft: 25 * (folder?.path?.split("/").length - 1) ?? 0,
          }}
          disablexContexMenu={true}
        />
      );
    });
  };

  const renderFolderList = (root) => {
    if (!Array.isArray(root)) return null;
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
          {chosenFolder?.info?.path === folder.path &&
          Array.isArray(fileList) &&
          fileList.length
            ? renderFiles(fileList, folder)
            : null}
          {chosenFolder?.info?.path === folder.path && !fileList
            ? renderLoader()
            : null}
        </CustomFolderItem>
      );
    });
  };

  const onSubmit = () => {
    if (
      chosenFiles &&
      !(attachedFiles && attachedFiles.some((f) => f.fid === chosenFiles.fid))
    )
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
    if (path) dispatch(onChooseFiles(path, "", 1, "", ""));
  }, [path]); // eslint-disable-line

  return (
    <PopUp
      set={nullifyAction}
      background={chatTheme.name === "dark" ? "#292929" : ""}
    >
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
          <TextButton
            text="Отправить"
            type="ok"
            disabled={!chosenFiles}
            callback={onSubmit}
          />
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
  setAttachedFiles: PropTypes.func.isRequired,
};
