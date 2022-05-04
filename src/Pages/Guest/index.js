import React, { useEffect, useMemo, useState } from "react";

import styles from "./Guest.module.sass";
import SearchField from "./SearchField";
import classNames from "classnames";
import ServePanel from "./ServePanel";

import ContextMenu from "../../generalComponents/ContextMenu";
import { useContextMenuFile } from "../../generalComponents/collections";
import ActionApproval from "../../generalComponents/ActionApproval";
import File from "../../generalComponents/Files";
import ContextMenuItem from "../../generalComponents/ContextMenu/ContextMenuItem";
import { useGetMonthByIndex } from "../../generalComponents/CalendarHelper";
import FilesGroup from "./WorkElements/FilesGroup/FilesGroup";
import { onGetGuestFolderFiles } from "../../Store/actions/CabinetActions";
import CopyLinkShare from "../Cabinet/Components/ContextMenuComponents/generalContextMenuComponents/CopyLinkShare";
import { useDispatch, useSelector } from "react-redux";
import { imageSrc } from "../../generalComponents/globalVariables";

import { getMonth } from "date-fns";
import Loader from "../../generalComponents/Loaders/4HUB";
import { useLocales } from "react-localized";

const getParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param) || false;
};

const Guest = () => {
  const { __ } = useLocales();
  const contextMenuFile = useContextMenuFile();
  const dispatch = useDispatch();
  const fileList = useSelector((state) => state.Cabinet.guestSharedFiles);
  const getMonthByIndex = useGetMonthByIndex();

  const filteredList = useMemo(() => {
    if (!fileList?.length) {
      return [];
    }

    const result = [];
    let files = [];
    fileList.forEach((file) => {
      const month = getMonth(new Date(file.ctime));
      const findGroup = result.find((item) => item.group === month);
      if (!findGroup) {
        files = [];
        result.push({ group: month, files });
      }
      files.push(file);
    });

    return result;
  }, [fileList]);

  const [filePick, setFilePick] = useState({
    show: false,
    files: [],
    customize: false
  });
  const [action, setAction] = useState({ type: "", name: "", text: "" });
  const [mouseParams, setMouseParams] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);

  const [workElementsView, setWorkElementsView] = useState("workLinesPreview");
  const [loadingType, setLoadingType] = useState("");
  const [showLinkCopy, setShowLinkCopy] = useState(false);

  useEffect(() => {
    setLoadingType("squarify");
    dispatch(onGetGuestFolderFiles(getParam("did"), setLoadingType));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const renderMenuItems = (target, type) => {
    return target.map((item, i) => {
      return (
        <ContextMenuItem
          key={i}
          width={mouseParams.width}
          height={mouseParams.height}
          text={item.name}
          callback={() =>
            type.forEach((el, index) => {
              if (el.type === item.type) el.callback(type, index);
            })
          }
          imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
        />
      );
    });
  };

  const callbackArrMain = [
    {
      type: "share",
      name: __(""),
      text: __(""),
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "copyLink",
      name: __(""),
      text: __(""),
      callback: () => setShowLinkCopy(true)
    },
    {
      type: "properties",
      name: __("Свойства"),
      text: __(""),
      callback: () => setAction({ ...action, type: "properties", name: "Свойства" })
    },
    {
      type: "download",
      name: __("Загрузка файла"),
      text: __(""),
      callback: () => document.downloadFile.submit()
    }
  ];

  const renderFilesGroup = (group, files, i) => {
    return (
      <FilesGroup
        key={i}
        index={i}
        fileList={files}
        filePreview={filePreview}
        setFilePreview={setFilePreview}
        callbackArrMain={callbackArrMain}
        chosenFile={chosenFile}
        setChosenFile={setChosenFile}
        filePick={filePick}
        setFilePick={setFilePick}
        mounthName={getMonthByIndex(group)}
        setAction={setAction}
        setMouseParams={setMouseParams}
      />
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logoWrap}>
          <div className={styles.logo}>
            <img className={styles.hubIcon} src={`${imageSrc}assets/PrivateCabinet/4Hub-min.svg`} alt="4HUB" />
            <p>4Hub</p>
          </div>
        </div>

        <div className={styles.navbar}>
          <SearchField />
          <div className={styles.authActionBlock}>
            <button className={styles.authBtn}>{__("Вход")}</button>
            <button className={classNames(styles.authBtn, styles.authBtnReg)}>{__("Регистрация")}</button>
          </div>
        </div>
      </div>

      <ServePanel
        chosenFile={chosenFile}
        workElementsView={workElementsView}
        setWorkElementsView={setWorkElementsView}
      />

      <div className={styles.main}>
        <div className={styles.topBlock}>
          <img src={`${imageSrc}assets/PrivateCabinet/folder-5.svg`} alt="Folder" />
          <p>{__("Дизайн файлообменика")}</p>
        </div>

        <div className={styles.workSpaceWrap}>
          {filteredList?.length !== 0 ? (
            <div className={styles.FilesList}>
              {filteredList.map((item, i) => renderFilesGroup(item.group, item.files, i))}
            </div>
          ) : (
            <div className={styles.centered}>
              <h3>{!loadingType && __("Нет файлов...")}</h3>
            </div>
          )}
        </div>
      </div>

      {mouseParams !== null && (
        <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
          <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFile.main, callbackArrMain)}</div>
        </ContextMenu>
      )}
      {action.type === "delete" ? (
        <ActionApproval
          name={filePick.show ? __("Удаление файлов") : action.name}
          text={filePick.show ? __("Вы действительно хотите удалить выбранные файлы?") : action.text}
          set={() => {}}
          callback={() => {}}
          approve={__("Удалить")}
        >
          <div className={styles.fileActionWrap}>
            <File format={filePick.show ? "FILES" : chosenFile?.ext} color={chosenFile?.color} />
          </div>
        </ActionApproval>
      ) : null}

      {showLinkCopy && <CopyLinkShare fid={chosenFile?.fid} setShowLinkCopy={setShowLinkCopy} />}

      {loadingType ? <Loader position="absolute" zIndex={102} containerType="bounceDots" type="bounceDots" /> : null}
    </div>
  );
};

export default Guest;
