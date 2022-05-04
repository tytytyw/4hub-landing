import React from "react";

import styles from "./FileLineShort.module.sass";
import File from "../../../../../generalComponents/Files";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as FolderIcon } from "../../../../../assets/PrivateCabinet/folder-2.svg";
import { colors } from "../../../../../generalComponents/collections";
import { onChooseFiles, onSetModals } from "../../../../../Store/actions/CabinetActions";

const FileLineShort = ({
  file,
  setChosenFile,
  chosen,
  setMouseParams,
  filePick,
  setFilePick,
  setGLoader,
  params = null,
  chooseItemNext,
  openFolderMenu,
  filesSize,
  style,
  disablexContexMenu = false
}) => {
  const size = filesSize ?? useSelector((state) => state.Cabinet.size);
  const previewFile = useSelector((s) => s.Cabinet.modals.previewFile);
  const dispatch = useDispatch();

  const onPickFile = () => {
    if (params?.next) {
      chooseItemNext(file);
    } else {
      if (filePick?.show) {
        const isPicked = filePick.files.filter((el) => el === file.fid);
        isPicked.length > 0
          ? setFilePick({
              ...filePick,
              files: filePick.files.filter((el) => el !== file.fid)
            })
          : setFilePick({ ...filePick, files: [...filePick.files, file.fid] });
      }
      if (file.is_dir) {
        dispatch(onChooseFiles(file.path, "", 1, "", setGLoader, "next"));
      }
    }
    setChosenFile(file);
  };

  const handleDoubleClick = () => {
    if (file?.is_dir) {
      // folderSelect(file)
    } else {
      dispatch(onSetModals("previewFile", { ...previewFile, open: true, file }));
    }
  };

  return (
    <div
      className={`
            ${styles.fileLineShortWrap} 
            ${chosen ? styles.fileChosen : ""}
            ${size === "medium" ? styles.mediumSize : ""}
            ${size === "big" ? styles.bigSize : ""}
        `}
      onClick={onPickFile}
      onDoubleClick={!disablexContexMenu ? handleDoubleClick : null}
      style={style}
    >
      <div className={`${styles.infoWrap} ${chosen ? styles.fileChosenTriangle : ""}`}>
        <div className={`${styles.fileWrap} ${file?.is_dir ? styles.fileFolder : ""}`}>
          {file?.is_dir ? (
            <FolderIcon className={`${styles.folderIcon} ${colors.filter((el) => el.color === file.color)[0]?.name}`} />
          ) : (
            <File
              color={file.is_write === "0" ? "#C1C1C1" : file.color}
              format={file.ext}
              className={styles.mainFile}
            />
          )}
        </div>
        <div className={styles.fileName}>{file.name}</div>
      </div>
      {!disableContextMenu ? (
        <div
          className={styles.menuWrap}
          onClick={(e) => {
            file.is_dir
              ? openFolderMenu(e, file)
              : setMouseParams({
                  x: e.clientX,
                  y: e.clientY,
                  width: 240,
                  height: 25
                });
          }}
        >
          <span className={styles.menu} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FileLineShort;
