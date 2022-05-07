import React from "react";

import styles from "./FileLineShort.module.sass";
import File from "../../../../../generalComponents/Files";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as FolderIcon } from "../../../../../assets/PrivateCabinet/folder-2.svg";
import { colors } from "../../../../../generalComponents/collections";
import { onChooseFiles, onSetModals } from "../../../../../Store/actions/CabinetActions";
import PropTypes from "prop-types";
import { filePickProps, fileProps } from "../../../../../types/WorkElements";

import PropTypes from "prop-types";
import { filePickProps, fileProps } from "../../../../../types/WorkElements";
// TODO - add 'params'
const FileLineShort = ({
  file,
  setChosenFile,
  chosen,
  setMouseParams,
  filePick,
  setFilePick,
  setGLoader,
  params,
  chooseItemNext,
  openFolderMenu,
  style,
  disableContextMenu
}) => {
  const sizeSelector = useSelector((state) => state.Cabinet.size);
  const size = filesSize ?? sizeSelector;
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
      onDoubleClick={!disableContextMenu ? handleDoubleClick : null}
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

FileLineShort.propTypes = {
  file: fileProps,
  setChosenFile: PropTypes.func,
  chosen: PropTypes.bool,
  setMouseParams: PropTypes.func,
  filePick: filePickProps,
  setFilePick: PropTypes.func,
  setGLoader: PropTypes.func,
  params: PropTypes.any,
  chooseItemNext: PropTypes.func,
  openFolderMenu: PropTypes.func,
  style: PropTypes.exact({
    width: PropTypes.number,
    paddingLeft: PropTypes.number
  }),
  disableContextMenu: PropTypes.bool,
  filesSize: PropTypes.string
};

FileLineShort.defaultProps = {
  params: null,
  disableContextMenu: false
};
