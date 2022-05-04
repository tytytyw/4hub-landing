import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import styles from "./FilesGroup.module.sass";
import WorkBars from "../WorkBars";
import FileBar from "../FileBar";
import classNames from "classnames";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import FileLine from "../FileLine";
import FileLineShort from "../FileLineShort";
import FileItem from "../../MyFiles/FileItem";

function FilesGroup({
  fileList,
  filePick,
  fileLoading,
  fileSelect,
  filesPage,
  setFilesPage,
  title,
  setChosenFolder,
  fileRef,
  chosenFolder,
  gLoader,
  renderFiles,
  params = null,
  menuItem = "",
  renderFileItem = () => {},
  setGroupInfo = () => {}
}) {
  const [collapse, setCollapse] = useState(true); //first one to collapse - index === 0
  const workElementsView = useSelector((state) => state.Cabinet.view);
  const workBarsPreviewGroupRef = useRef(null);
  const { pathname } = useLocation();

  const handleChangeGroup = () => {
    setChosenFolder((state) => ({
      ...state,
      group: { title, amount: fileList?.length }
    }));
    setGroupInfo((state) => ({ ...state, title, amount: fileList?.length }));
  };
  return (
    <>
      {workElementsView === "preview" ? (
        <div className={styles.group} ref={workBarsPreviewGroupRef} onClick={handleChangeGroup}>
          {renderFiles(FileBar, fileList)}
        </div>
      ) : (
        <div className={styles.fileWrap}>
          {fileList.length > 0 && (
            <div
              onClick={() => {
                setCollapse(!collapse);
              }}
              className={styles.collapseHeader}
            >
              <p
                className={`${styles.dateName} ${workElementsView === "workLinesPreview" ? styles.dateNameShort : ""}`}
              >
                {title}
              </p>
              <div className={styles.buttonsWrap}>
                <button
                  className={`${styles.collapseBtn} ${
                    workElementsView === "workLinesPreview" ? styles.collapseBtnShort : ""
                  }`}
                >
                  {fileList.length ?? 0} объектов
                </button>
                <div
                  className={classNames({
                    [styles.arrowFile]: true,
                    [styles.active]: !!collapse
                  })}
                >
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

          {collapse && (
            <>
              {workElementsView === "bars" && (
                <WorkBars
                  filePick={filePick}
                  fileLoading={fileLoading}
                  fileSelect={fileSelect}
                  filesPage={filesPage}
                  setFilesPage={setFilesPage}
                  fileRef={fileRef}
                  chosenFolder={chosenFolder}
                  gLoader={gLoader}
                  hideUploadFile={true}
                >
                  {renderFiles(FileBar, fileList)}
                </WorkBars>
              )}
              {workElementsView === "lines" && (
                <div className={styles.collapseContent}>{renderFiles(FileLine, fileList)}</div>
              )}
              {workElementsView === "workLinesPreview" ? (
                pathname.includes("files") || pathname === "/archive" || pathname === "/cart" ? (
                  <div className={styles.collapseContentFileItem}>{renderFileItem(FileItem, fileList)}</div>
                ) : (
                  <div className={styles.collapseContentShort}>{renderFiles(FileLineShort, fileList, params)}</div>
                )
              ) : null}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default FilesGroup;
