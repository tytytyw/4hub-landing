import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./WorkLinesPreview.module.sass";
import { colors } from "../../../../../../generalComponents/collections";
import File from "../../../../../../generalComponents/Files";
import Loader from "../../../../../../generalComponents/Loaders/4HUB";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { onChooseFiles } from "../../../../../../Store/actions/CabinetActions";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { filePickProps, fileProps } from "../../../../../../types/WorkElements";
import { chosenFolderProps } from "../../../../../../types/CreateFolder";

const WorkLinesPreview = ({
  fileList,
  file,
  children,
  hideFileList,
  page,
  setPage,
  fileRef,
  chosenFolder,
  gLoader
}) => {
  const { __ } = useLocales();
  const size = useSelector((state) => state.Cabinet.size);
  const search = useSelector((state) => state.Cabinet?.search);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const dispatch = useDispatch();
  const [color, setColor] = useState(null);
  const [f, setF] = useState(null);
  useEffect(() => {
    if (fileList?.find((item) => item?.fid === file?.fid)) {
      setF(file);
    } else {
      setF(null);
    }
    const newColor = colors.filter((c) => c.color === file?.color);
    setColor(newColor[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const audioRef = useRef(null);
  const [play, setPlay] = useState(false);

  const renderFilePreview = () => {
    switch (f.mime_type.split("/")[0]) {
      case "image": {
        return <img src={f.preview} alt="filePrieview" className={hideFileList ? styles.big_pic : ""} />;
      }
      case "video": {
        return (
          <video controls src={`https://fs2.mh.net.ua${f.preview}`} type={f.mime_type}>
            <source src={`https://fs2.mh.net.ua${f.preview}`} type={f.mime_type} />
          </video>
        );
      }
      case "audio": {
        return (
          <>
            <audio controls ref={audioRef} src={`https://fs2.mh.net.ua${f.preview}`}>
              <source src={`https://fs2.mh.net.ua${f.preview}`} type={f.mime_type} />
            </audio>
            <div className={styles.audioPicWrap}>
              <img
                className={styles.audioPic}
                src={imageSrc + "assets/PrivateCabinet/file-preview_audio.svg"}
                alt="audio"
              />
              {!play ? (
                <img
                  className={styles.audioSwitchPlay}
                  src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
                  alt="play"
                  onClick={() => {
                    !play ? audioRef.current.play() : audioRef.current.pause();
                    setPlay(!play);
                  }}
                />
              ) : null}
              {play ? (
                <img
                  className={styles.audioSwitch}
                  src={imageSrc + "assets/PrivateCabinet/pause.svg"}
                  alt="pause"
                  onClick={() => {
                    !play ? audioRef.current.play() : audioRef.current.pause();
                    setPlay(!play);
                  }}
                />
              ) : null}
            </div>
          </>
        );
      }
      default: {
        return (
          <div className={styles.filePreviewWrap}>
            <File format={f?.ext} color={f?.color} />
          </div>
        );
      }
    }
  };

  // Loading files to full the page
  useEffect(() => {
    onCheckFilesPerPage();
  }, [size, page, chosenFolder?.files_amount]); // eslint-disable-line

  const onSuccessLoading = (result) => {
    setLoadingFiles(false);
    result > 0 ? setPage((page) => page + 1) : setPage(0);
  };

  const loadFiles = (e, access) => {
    if (
      !loadingFiles &&
      (e?.target?.scrollHeight - e?.target?.offsetHeight - 200 < e?.target?.scrollTop || access) &&
      page > 0
    ) {
      if (chosenFolder?.files_amount > fileList?.files.length) {
        setLoadingFiles(true);
        dispatch(onChooseFiles(fileList?.path, search, page, onSuccessLoading, ""));
      }
    }
  };

  const onCheckFilesPerPage = () => {
    if (
      fileRef?.current &&
      fileRef?.current?.offsetHeight === fileRef?.current?.scrollHeight &&
      fileList?.path === chosenFolder?.path
    ) {
      loadFiles("", true);
    }
  };

  return (
    <div className={styles.workLinesPreviewWrap}>
      {!hideFileList && (
        <div className={styles.fileListWrap} ref={fileRef} onScroll={loadFiles}>
          {!gLoader && children}
          <div className={styles.bottomLine} style={{ height: loadingFiles ? "100px" : "40px" }}>
            {loadingFiles && !gLoader ? (
              <Loader
                type="bounceDots"
                position="absolute"
                background="white"
                zIndex={5}
                width="100px"
                height="100px"
                containerType="bounceDots"
              />
            ) : null}
          </div>
        </div>
      )}
      {gLoader && (
        <Loader
          type="bounceDots"
          position="absolute"
          background="rgba(255, 255, 255, 0.75)"
          zIndex={5}
          containerType="bounceDots"
        />
      )}

      <div className={styles.previewFileWrap}>
        <div className={styles.preview}>
          {f ? (
            f.is_preview === 1 ? (
              renderFilePreview()
            ) : (
              <div>
                <div className={styles.filePreviewWrap}>
                  <File format={f?.ext} color={f?.color} />
                </div>
              </div>
            )
          ) : null}
        </div>

        <div className={styles.previewFileInfo}>
          {f && (
            <div className={styles.previewFileInfoWrap}>
              <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{__("Цвет")}</span>
                {f?.color ? (
                  <span
                    className={styles.colorCircle}
                    style={{
                      background: color?.light,
                      border: `1px solid ${color?.dark}`
                    }}
                  />
                ) : (
                  <span className={styles.optionItem}>{__("Добавить цвет")}</span>
                )}
              </div>

              <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{__("Эмоджи")}</span>
                {f?.emo ? (
                  <img src={`${imageSrc}assets/PrivateCabinet/smiles/${f.emo}.svg`} alt="sign" />
                ) : (
                  <span className={styles.optionItem}>{__("Добавить эмоджи")}</span>
                )}
              </div>

              <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{__("Знаки")}</span>
                {f?.fig ? (
                  <img src={`${imageSrc}assets/PrivateCabinet/signs/${f.fig}.svg`} alt="sign" />
                ) : (
                  <span className={styles.optionItem}>{__("Добавить знаки")}</span>
                )}
              </div>

              <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{__("Тег")}</span>
                {f?.tag ? (
                  <span className={styles.tagName}>#{f.tag}</span>
                ) : (
                  <span className={styles.optionItem}>{__("Добавить тег")}</span>
                )}
              </div>

              <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{__("Создан")}</span>
                {f?.ctime ? <span className={styles.description}>{f.mtime.split(" ")[0]}</span> : ""}
              </div>

              <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{__("Изменен")}</span>
                {f?.mtime ? <span className={styles.description}>{f.ctime.split(" ")[0]}</span> : ""}
              </div>

              <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{__("Размеры")}</span>
                {f?.size_now ? <span className={styles.description}>{f.size_now}</span> : ""}
              </div>

              <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{__("Резрешение")}</span>
                <span className={styles.description}>{__("72 х 72")}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkLinesPreview;

WorkLinesPreview.propTypes = {
  file: fileProps,
  fileList: PropTypes.shape({
    files: PropTypes.array,
    path: PropTypes.string,
    find: PropTypes.func
  }),
  children: PropTypes.node,
  fileRef: PropTypes.shape({
    current: PropTypes.string
  }),
  filePick: filePickProps,
  setPage: PropTypes.func,
  gLoader: PropTypes.bool,
  chosenFolder: chosenFolderProps,
  hideFileList: PropTypes.bool,
  page: PropTypes.string
};
