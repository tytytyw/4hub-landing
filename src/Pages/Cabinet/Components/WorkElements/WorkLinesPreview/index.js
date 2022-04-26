import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import {
  imageSrc,
  projectSrc
} from "../../../../../generalComponents/globalVariables";
import styles from "./WorkLinesPreview.module.sass";
import { colors } from "../../../../../generalComponents/collections";
import File from "../../../../../generalComponents/Files";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import { useScrollElementOnScreen } from "../../../../../generalComponents/Hooks";
import {
  getMedia,
  renderHeight
} from "../../../../../generalComponents/generalHelpers";
import { ReactComponent as FolderIcon } from "../../../../../assets/PrivateCabinet/folder-2.svg";
import FileLineShort from "../FileLineShort";
import { useLocales } from "react-localized";

const WorkLinesPreview = ({
  file,
  children,
  hideFileList,
  filesPage,
  fileRef,
  filePick,
  gLoader,
  load,
  options,
  renderFiles,
  renderGroups,
  menuItem
}) => {
  const { __ } = useLocales();
  const { pathname } = useLocation();
  const recentFiles = useSelector(state => state.Cabinet.recentFiles);
  const search = useSelector(state => state.Cabinet?.search);
  const fileList = useSelector(state => state.Cabinet?.fileList);
  const filesNext = useSelector(state => state.Cabinet?.fileList?.filesNext);
  const [audio, setAudio] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const [color, setColor] = useState(null);
  const [f, setF] = useState(file);
  useEffect(() => {
    setF(file);
    const newColor = colors.filter(c => c.color === file?.color);
    setColor(newColor[0]);
    if (file) {
      if (
        file?.mime_type &&
        file.mime_type.includes("audio") &&
        file.is_preview
      ) {
        setLoading(true);
        getMedia(
          `${projectSrc}${file.preview}`,
          file.mime_type,
          setAudio,
          setLoading
        );
      }
      if (
        file?.mime_type &&
        file.mime_type.includes("video") &&
        file.is_preview
      ) {
        setLoading(true);
        getMedia(
          `${projectSrc}${file.preview}`,
          file.mime_type,
          setVideo,
          setLoading
        );
      }
    }
  }, [file]);

  const audioRef = useRef(null);
  const [play, setPlay] = useState(false);

  const renderFilePreview = () => {
    switch (f.mime_type.split("/")[0]) {
      case "image": {
        return (
          <img
            src={`${f.preview}?${new Date()}`}
            alt="filePrieview"
            className={hideFileList ? styles.big_pic : ""}
          />
        );
      }
      case "video": {
        return (
          <video
            controls
            src={video ? video : ""}
            type={f.mime_type}
            onError={e => console.log(e)}>
            <source src={video ? video : ""} type={f.mime_type} />
          </video>
        );
      }
      case "audio": {
        return (
          <>
            <audio
              ref={audioRef}
              src={audio ? audio : ""}
              type={f.mime_type}
              controls
              onError={e => console.log(e)}>
              <source src={audio ? audio : ""} type={f.mime_type} />
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
            {f?.is_dir ? (
              <FolderIcon
                className={`${styles.folderIcon} ${
                  colors.filter(el => el.color === file.color)[0]?.name
                }`}
              />
            ) : (
              <File format={f?.ext} color={f?.color} />
            )}
          </div>
        );
      }
    }
  };

  const [containerRef] = useScrollElementOnScreen(options, load);
  const [containerNextRef] = useScrollElementOnScreen(options, load);

  const checkFiles = obj => {
    for (let key in obj) {
      if (obj[key].length > 0) return true;
    }
    return false;
  };

  return (
    <div
      className={`${styles.workLinesPreviewWrap} ${renderHeight(
        recentFiles,
        filePick,
        styles,
        pathname === "/archive"
      )}`}>
      {!hideFileList && menuItem !== "myFiles" && (
        <div className={styles.fileListWrap} ref={fileRef}>
          {!gLoader && children}
          {!gLoader ? (
            <div
              className={`${styles.bottomLine} ${
                filesPage === 0 ? styles.bottomLineHidden : ""
              }`}
              ref={containerRef}>
              <Loader
                type="bounceDots"
                position="absolute"
                background="white"
                zIndex={5}
                width="100px"
                height="100px"
                containerType="bounceDots"
              />
            </div>
          ) : null}
        </div>
      )}
      {file?.is_dir ? (
        <div className={styles.fileListWrap} ref={fileRef}>
          {!gLoader && checkFiles(filesNext?.files) ? (
            Array.isArray(fileList?.filesNext?.files) ? (
              renderFiles(FileLineShort, fileList?.filesNext?.files)
            ) : (
              renderGroups(FileLineShort, fileList?.filesNext?.files, {
                next: true,
                scrollTop: 0
              })
            )
          ) : loading ? null : (
            <div className={styles.emptyFolder}>{__("Папка пустая")}</div>
          )}
          {!gLoader ? (
            <div
              className={`${styles.bottomLine} ${
                filesPage === 0 ? styles.bottomLineHidden : ""
              }`}
              ref={containerNextRef}>
              <Loader
                type="bounceDots"
                position="absolute"
                background="white"
                zIndex={5}
                width="100px"
                height="100px"
                containerType="bounceDots"
              />
            </div>
          ) : null}
        </div>
      ) : null}
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
        {loading ? (
          <Loader
            type="bounceDots"
            position="absolute"
            background="rgba(0, 0, 0, 0)"
            zIndex={5}
            containerType="bounceDots"
          />
        ) : f && f.is_dir === 0 ? (
          <>
            <div className={styles.preview}>
              {f ? (
                f.is_preview === 1 ? (
                  renderFilePreview()
                ) : (
                  <div>
                    <div className={styles.filePreviewWrap}>
                      {f?.is_dir ? (
                        <FolderIcon
                          className={`${styles.folderIcon} ${
                            colors.filter(el => el.color === file.color)[0]
                              ?.name
                          }`}
                        />
                      ) : (
                        <File format={f?.ext} color={f?.color} />
                      )}
                    </div>
                  </div>
                )
              ) : null}
            </div>
            <p className={styles.fileName}>{f.name}</p>
            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("Теги")}</span>
              {f.tag ? (
                <span className={styles.tagName}>#{f.tag}</span>
              ) : (
                <span className={styles.optionItem}>{__("Добавить тег")}</span>
              )}
            </div>
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
              <span className={styles.itemName}>{__("Знаки")}</span>
              {f?.fig ? (
                <img
                  src={`${imageSrc}assets/PrivateCabinet/signs/${f.fig}.svg`}
                  alt="sign"
                />
              ) : (
                <span className={styles.optionItem}>
                  {__("Добавить знаки")}
                </span>
              )}
            </div>
            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("Эмоджи")}</span>
              {f?.emo ? (
                <img
                  src={`${imageSrc}assets/PrivateCabinet/smiles/${f.emo}.svg`}
                  alt="sign"
                />
              ) : (
                <span className={styles.optionItem}>
                  {__("Добавить эмоджи")}
                </span>
              )}
            </div>
            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("Создан")}</span>
              {f?.ctime ? (
                <span className={styles.description}>
                  {f.mtime.split(" ")[0]}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("Изменен")}</span>
              {f?.mtime ? (
                <span className={styles.description}>
                  {f.ctime.split(" ")[0]}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("Размеры")}</span>
              {f?.size_now ? (
                <span className={styles.description}>{f.size_now}</span>
              ) : (
                ""
              )}
            </div>
          </>
        ) : null}
        {children?.length === 0 && search.length !== 0 ? (
          <div className={styles.noSearchResults}>
            {__("Нет элементов удовлетворяющих условиям поиска")}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WorkLinesPreview;
