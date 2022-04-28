import React, { useEffect, useState } from "react";

import styles from "./FileBar.module.sass";
import File from "../../../../../../generalComponents/Files";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { fileProps } from "../../../../../../types/FileProps";
import { filePreviewProps } from "../../../../../../types/FilePreviewProps";

const FileBar = ({
  file,
  isLoading,
  chosen,
  setChosenFile,
  setMouseParams,
  setFilePreview,
  filePreview,
  filePick,
  setFilePick
}) => {
  const [picked, setPicked] = useState(false);
  const onPickFile = e => {
    e.stopPropagation();
    setPicked(!picked);
    if (!picked === true) {
      setFilePick({ ...filePick, files: [...filePick.files, file.fid] });
    } else {
      const files = filePick.files.filter(el => el !== file.fid);
      setFilePick({ ...filePick, files });
    }
  };

  useEffect(() => {
    if (filePick.show === false) setPicked(false);
  }, [filePick.show]);

  return (
    <>
      <div
        className={`${styles.fileBar} ${chosen ? styles.fileBarChosen : null}`}
        onClick={() => (!isLoading ? setChosenFile(file) : undefined)}
        onDoubleClick={() =>
          setFilePreview({ ...filePreview, view: true, file })
        }>
        <div
          className={styles.menu}
          onClick={e => {
            setMouseParams({
              x: e.clientX,
              y: e.clientY,
              width: 200,
              height: 25
            });
          }}>
          <span />
        </div>
        <div className={styles.symbols}>
          <div>
            {file?.fig && !isLoading ? (
              <img
                src={`${imageSrc}assets/PrivateCabinet/signs/${file.fig}.svg`}
                alt="fig"
              />
            ) : null}
          </div>
          <div>
            {file?.emo && !isLoading ? (
              <img
                src={`${imageSrc}assets/PrivateCabinet/smiles/${file.emo}.svg`}
                alt="emoji"
              />
            ) : null}
          </div>
        </div>
        <div className={styles.file}>
          <File
            color={file.color}
            format={file.ext}
            className={styles.mainFile}
          />
          {file?.is_pass && !isLoading ? (
            <img
              className={styles.locked}
              src={`${imageSrc}assets/PrivateCabinet/locked.svg`}
              alt="lock"
            />
          ) : null}
        </div>
        <div className={file.tag ? styles.ftag : styles.fEmtyTag}>
          {file.tag ? `#${file.tag}` : null}
        </div>
        <div className={styles.fname}>{file.name}</div>
        <div className={styles.fileInfo}>
          <div>{file.size_now}</div>
          <div>{file.mtime.split(" ")[0]}</div>
        </div>
        {filePick?.show ? (
          <div
            className={`${styles.filePickBox} ${
              picked ? styles.filePickBoxPicked : ""
            }`}
            onClick={onPickFile}
            onDoubleClick={e => e.stopPropagation()}
          />
        ) : null}
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
  filePick: PropTypes.object,
  setFilePick: PropTypes.func,
  setFilePreview: PropTypes.func,
  filePreview: filePreviewProps
};
