import React from "react";
import styles from "./FileLine.module.sass";

import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { onSetModals } from "../../../../../Store/actions/CabinetActions";
import FileInfo from "./FileInfo";
import Buttons from "./Buttons";
import OptionalButton from "./OptionalButton";
import OptionalDate from "./OptionalDate";
import { MODALS } from "../../../../../generalComponents/globalVariables";

const FileLine = ({
  file,
  setChosenFile,
  chosen,
  setMouseParams,
  setAction,
  filePick,
  setFilePick,
  callbackArrMain,
  folderSelect,
  openFolderMenu,
  successLoad
}) => {
  const size = useSelector(state => state.Cabinet.size);
  const previewFile = useSelector(state => state.Cabinet.modals.previewFile);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const onPickFile = () => {
    if (filePick.show) {
      const isPicked = filePick.files.filter(el => el === file?.fid);
      isPicked.length > 0
        ? setFilePick({
            ...filePick,
            files: filePick.files.filter(el => el !== file?.fid)
          })
        : setFilePick({ ...filePick, files: [...filePick.files, file?.fid] });
    }
    setChosenFile(file);
  };

  const handleDoubleClick = () => {
    if (file?.is_dir) {
      folderSelect(file);
    } else {
      dispatch(
        onSetModals(MODALS.FILE_PREVIEW, { ...previewFile, open: true, file })
      );
    }
  };

  const renderAdditionalItems = () => (
    <div className={styles.AdditionalItemsWrapper}>
      <OptionalButton file={file} successLoad={successLoad} />
      <OptionalDate file={file} />
    </div>
  );

  return (
    <div
      onClick={onPickFile}
      onDoubleClick={handleDoubleClick}
      className={classNames({
        [styles.wrapper]: true,
        [styles.active]: chosen,
        [styles?.[`wrapper_${size}`]]: size !== "medium",
        [styles.shortWidth]: pathname === "/downloaded-files"
      })}
    >
      <FileInfo file={file} />
      <div className={styles.flexContainer}>
        <div />
        {pathname === "/downloaded-files" && renderAdditionalItems()}
        {pathname === "/archive" && renderAdditionalItems()}
        <Buttons
          file={file}
          callbackArrMain={callbackArrMain}
          setAction={setAction}
          openFolderMenu={openFolderMenu}
          setMouseParams={setMouseParams}
        />
      </div>
    </div>
  );
};

export default FileLine;
