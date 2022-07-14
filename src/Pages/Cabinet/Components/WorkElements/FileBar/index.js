import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import styles from "./FileBar.module.sass";
import File from "../../../../../generalComponents/Files";
import { onSetModals, setDragged } from "../../../../../Store/actions/CabinetActions";
import { ReactComponent as FolderIcon } from "../../../../../assets/PrivateCabinet/folder-2.svg";
import { colors } from "../../../../../generalComponents/collections";
import PropTypes from "prop-types";
import { filePickProps, fileProps } from "../../../../../types/File";
import { changePreviewTime } from "generalComponents/generalHelpers";

const FileBar = ({
  file,
  isLoading,
  chosen,
  setChosenFile,
  setMouseParams,
  filePick,
  setFilePick,
  folderSelect,
  openFolderMenu
}) => {
  const size = useSelector((state) => state.Cabinet.size);
  const uid = useSelector((state) => state.user.uid);
  const previewFile = useSelector((s) => s.Cabinet.modals.previewFile);
  const dispatch = useDispatch();

  const onPickFile = () => {
    if (filePick.show) {
      const isPicked = filePick.files.filter((el) => el === file?.fid);
      isPicked.length > 0
        ? setFilePick({
            ...filePick,
            files: filePick.files.filter((el) => el !== file?.fid)
          })
        : setFilePick({ ...filePick, files: [...filePick.files, file?.fid] });
    }
    if (!isLoading) setChosenFile(file);
  };

  const handleDoubleClick = () => {
    if (file?.is_dir) {
      folderSelect(file);
      setChosenFile(null);
    } else {
      dispatch(onSetModals("previewFile", { ...previewFile, open: true, file }));
      changePreviewTime(uid, file.fid, dispatch);
    }
  };

  const handleDragStart = () => {
    dispatch(setDragged(file));
  };

  return (
    <>
      <div
        className={`
                    ${styles.fileBar} 
                    ${chosen ? (size === "small" ? styles.fileBarSmallChosen : styles.fileBarChosen) : null} 
                    ${size === "medium" ? styles.mediumSize : null}
                    ${size === "small" ? styles.smallSize : null}
                `}
        onClick={onPickFile}
        onDoubleClick={handleDoubleClick}
        draggable={window.location.pathname === "/folders" && file?.is_dir === 0}
        onDragStart={handleDragStart}
      >
        <div
          className={styles.menu}
          onClick={(e) => {
            file?.is_dir
              ? openFolderMenu(e, file)
              : setMouseParams({
                  x: e.clientX,
                  y: e.clientY,
                  width: 240,
                  height: 25
                });
          }}
        >
          <span />
        </div>
        <div className={styles.symbols}>
          <div>
            {file?.fig && !isLoading ? (
              <img src={`${imageSrc}assets/PrivateCabinet/signs/${file?.fig}.svg`} alt="fig" />
            ) : null}
          </div>
          <div>
            {file?.emo && !isLoading ? (
              <img src={`${imageSrc}assets/PrivateCabinet/smiles/${file?.emo}.svg`} alt="emoji" />
            ) : null}
          </div>
        </div>
        <div className={`${styles.file} ${file?.is_dir ? styles.fileFolder : ""}`}>
          {file?.is_dir ? (
            <FolderIcon
              className={`${styles.folderIcon} ${colors.filter((el) => el.color === file?.color)[0]?.name}`}
            />
          ) : (
            <File
              color={file?.is_write === "0" ? "#C1C1C1" : file?.color}
              format={file?.ext}
              className={styles.mainFile}
            />
          )}
          {file?.is_pass && !isLoading ? (
            <img className={styles.locked} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt="lock" />
          ) : null}
        </div>
        <div className={file?.tag ? styles.ftag : styles.fEmtyTag}>{file?.tag ? `#${file?.tag}` : null}</div>
        <div className={styles.fname}>{file?.name}</div>
        <div className={styles.fileInfo}>
          <div>{file?.size_now}</div>
          <div>{file?.ctime?.split(" ")[0]}</div>
        </div>
      </div>
    </>
  );
};

export default FileBar;

FileBar.propTypes = {
  file: fileProps,
  isLoading: PropTypes.bool,
  chosen: PropTypes.bool,
  setChosenFile: PropTypes.func,
  setMouseParams: PropTypes.func,
  filePick: filePickProps,
  setFilePick: PropTypes.func,
  folderSelect: PropTypes.func,
  openFolderMenu: PropTypes.func
};
