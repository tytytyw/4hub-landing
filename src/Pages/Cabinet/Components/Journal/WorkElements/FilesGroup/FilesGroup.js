import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./FilesGroup.module.sass";
import WorkBars from "../../../WorkElements/WorkBars";
import WorkBarsPreview from "../../../WorkElements/WorkBarsPreview";
import FileLineShort from "../../../Archive/WorkElements/FileLineShort";
import FileBar from "../../../WorkElements/FileBar";
import FileLine from "../FileLine";
import classNames from "classnames";
import { ReactComponent as PlayIcon } from "../../../../../../assets/PrivateCabinet/play-grey.svg";

import WorkLinesPreview from "../WorkLinesPreview";
import SideList from "../../../SharedFiles/SideList/SideList";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { filePreviewProps } from "../../../../../../types/FilePreviewProps";

function FilesGroup({
  fileList,
  filePreview,
  setFilePreview,
  callbackArrMain,
  chosenFile,
  setChosenFile,
  filePick,
  setFilePick,
  setAction,
  setMouseParams,
  mounthName,
  index
}) {
  const { __ } = useLocales();
  const [collapse, setCollapse] = useState(index === 0);
  const workElementsView = useSelector(state => state.Cabinet.view);

  const renderFiles = (Type, shareLink) => {
    if (!fileList || fileList.length === 0) return null;
    return fileList.files?.map((file, index) => (
      <Type
        key={index}
        file={file}
        setChosenFile={setChosenFile}
        chosenFile={chosenFile}
        setMouseParams={setMouseParams}
        setAction={setAction}
        filePreview={filePreview}
        setFilePreview={setFilePreview}
        setFilePick={setFilePick}
        filePick={filePick}
        chosen={
          filePick.show
            ? filePick.files.findIndex(el => el === file.fid) >= 0
            : chosenFile?.fid === file?.fid
        }
        callbackArrMain={callbackArrMain}
        shareLink={shareLink}
      />
    ));
  };

  return (
    <div className={styles.fileWrap}>
      {fileList?.files.length > 0 && (
        <div
          onClick={() => {
            setCollapse(!collapse);
          }}
          className={styles.collapseHeader}>
          <p className={styles.dateName}>{mounthName}</p>
          <div className={styles.buttonsWrap}>
            <button className={styles.collapseBtn}>
              {fileList?.files.length ?? 0} {__("объектов")}
            </button>
            <div
              className={classNames({
                [styles.arrowFile]: true,
                [styles.active]: !!collapse
              })}>
              <PlayIcon
                className={classNames({
                  [styles.playButton]: true,
                  [styles.revert]: !!collapse
                })}
              />
            </div>
          </div>
        </div>
      )}

      {collapse &&
        workElementsView !== "preview" &&
        workElementsView !== "workLinesPreview" && (
          <div className={styles.fileDate}>
            {/* TODO: заменить дату при получении сгруппированного на даты списка файлов  */}
            {fileList?.files.length > 0 && <p>10.08.2020</p>}
          </div>
        )}

      {collapse && (
        <>
          {workElementsView === "bars" && (
            <WorkBars filePick={filePick} hideUploadFile={true}>
              {renderFiles(FileBar)}
            </WorkBars>
          )}

          {workElementsView === "lines" && (
            <div className={styles.collapseContent}>
              {renderFiles(FileLine, true)}
            </div>
          )}

          {workElementsView === "preview" && (
            <div className={styles.workSpace}>
              <WorkBarsPreview file={chosenFile} filePick={filePick}>
                {renderFiles(FileBar)}
              </WorkBarsPreview>
            </div>
          )}
          {workElementsView === "workLinesPreview" && (
            <div
              className={`${styles.workSpace} ${styles.workSpacePreviewLine}`}>
              <SideList>{renderFiles(FileLineShort, true)}</SideList>
              <div className={styles.filePreviewWrap}>
                <WorkLinesPreview
                  file={chosenFile}
                  hideFileList={true}
                  filePick={filePick}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FilesGroup;

FilesGroup.propTypes = {
  fileList: PropTypes.object,
  filePreview: filePreviewProps,
  setFilePreview: PropTypes.func,
  callbackArrMain: PropTypes.array,
  chosenFile: PropTypes.object,
  setChosenFile: PropTypes.func,
  filePick: PropTypes.object,
  setFilePick: PropTypes.func,
  setAction: PropTypes.func,
  setMouseParams: PropTypes.func,
  mounthName: PropTypes.string,
  index: PropTypes.number
};
