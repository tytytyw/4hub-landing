import React, { useState } from "react";
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
import SharedFilesInfo from "./SharedFilesInfo/SharedFilesInfo";
import PropTypes from "prop-types";
import { filePickProps, fileProps, fileSharedProps } from "../../../../../types/WorkElements";

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
  successLoad,
  sharedFilesInfo
}) => {
  const size = useSelector((state) => state.Cabinet.size);
  const previewFile = useSelector((state) => state.Cabinet.modals.previewFile);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [params, setParams] = useState({ isChosen: false });

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
    setChosenFile(file);
  };

  const handleDoubleClick = () => {
    if (file?.is_dir) {
      folderSelect(file);
    } else {
      dispatch(onSetModals(MODALS.FILE_PREVIEW, { ...previewFile, open: true, file }));
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
      onMouseOver={() => setParams((s) => ({ ...s, isChosen: true }))}
      onMouseLeave={() => setParams((s) => ({ ...s, isChosen: false }))}
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
        {pathname.startsWith("/downloaded-files") && renderAdditionalItems()}
        {pathname.startsWith("/archive") && renderAdditionalItems()}
        {pathname.startsWith("/shared-files") && (
          <SharedFilesInfo file={file} isChosen={params.isChosen || chosen} sharedFilesInfo={sharedFilesInfo} />
        )}
        <Buttons
          file={file}
          callbackArrMain={callbackArrMain}
          setAction={setAction}
          openFolderMenu={openFolderMenu}
          setMouseParams={setMouseParams}
          sharedFilesInfo={sharedFilesInfo}
        />
      </div>
    </div>
  );
};

export default FileLine;
FileLine.propTypes = {
  file: PropTypes.oneOfType([fileSharedProps, fileProps]),
  setChosenFile: PropTypes.func,
  chosen: PropTypes.bool,
  setMouseParams: PropTypes.func,
  setAction: PropTypes.func,
  filePick: filePickProps,
  setFilePick: PropTypes.func,
  callbackArrMain: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.exact({
        type: PropTypes.string,
        name: PropTypes.string,
        text: PropTypes.string,
        callback: PropTypes.func
      })
    )
  ),
  folderSelect: PropTypes.func,
  openFolderMenu: PropTypes.func,
  successLoad: PropTypes.func,
  sharedFilesInfo: PropTypes.string
};
