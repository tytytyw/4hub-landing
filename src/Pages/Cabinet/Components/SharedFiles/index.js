import React, { useEffect, useState } from "react";

import styles from "./SharedFiles.module.sass";
import FilesGroup from "./FilesGroup/FilesGroup";
import WorkLinesPreview from "../WorkElements/WorkLinesPreview";
import SearchField from "../SearchField";
import StorageSize from "../StorageSize";
import Notifications from "../Notifications";
import Profile from "../Profile";
import ServePanel from "../ServePanel";
import { useDispatch, useSelector } from "react-redux";
import DateFilter from "../MyFiles/DateFilter";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import { useContextMenuSharedFiles } from "../../../../generalComponents/collections";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import PreviewFile from "../Modals/Components/PreviewFile/PreviewFile";
import BottomPanel from "../BottomPanel";
import { onGetUserInfo } from "../../../../Store/actions/startPageAction";
import { onGetSharedFiles } from "../../../../Store/actions/CabinetActions";
import { previewFormats } from "../../../../generalComponents/collections";
import api from "../../../../api";
import Share from "../ContextMenuComponents/generalContextMenuComponents/Share/Share";
import FileProperty from "../ContextMenuComponents/ContextMenuFile/FileProperty";
import SuccessMessage from "../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage";
import OptionButtomLine from "../WorkElements/OptionButtomLine";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import SideMenu from "./SideMenu";
import { useMonths } from "../../../../generalComponents/CalendarHelper";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const SharedFiles = ({
  filePreview,
  setFilePreview,
  fileSelect,
  setLoadingType,
  setMenuItem
}) => {
  const { __ } = useLocales();
  const months = useMonths();
  const contextMenuSharedFiles = useContextMenuSharedFiles();
  const workElementsView = useSelector(state => state.Cabinet.view);
  const [search, setSearch] = useState("");
  const [fileList, setFileList] = useState(null);
  const [sideMenuChosenItem, setSideMenuChosenItem] = useState("sharedMe");
  const dispatch = useDispatch();

  const [chosenFile, setChosenFile] = useState(null);
  const [action, setAction] = useState({ type: "", name: "", text: "" });
  const [mouseParams, setMouseParams] = useState(null);
  const nullifyAction = () => setAction({ type: "", name: "", text: "" });
  const [filePick, setFilePick] = useState({ show: false, files: [] });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const uid = useSelector(state => state.user.uid);
  const [sideMenuCollapsed, setSideMenuCollapsed] = useState(false);
  const [dateFilter, setDateFilter] = useState({});

  // const [filesNotCustomize, setFilesNotCustomize] = useState([]);

  const filesSharedMe = useSelector(
    state => state.Cabinet.sharedFiles.sharedMe
  );
  const filesSharedI = useSelector(state => state.Cabinet.sharedFiles.sharedI);
  useEffect(() => {
    setMenuItem("SharedFiles");
    dispatch(onGetUserInfo());
    return () => {
      setMenuItem("");
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    dispatch(onGetSharedFiles("sharedMe", ""));
    dispatch(onGetSharedFiles("sharedI", ""));
  }, []); // eslint-disable-line

  useEffect(() => {
    if (filePick.customize) {
      setFilePick({
        show: true,
        files: filePick?.files,
        customize: true
      });
    }
  }, [filePick.customize]); // eslint-disable-line

  useEffect(() => {
    if (sideMenuChosenItem === "sharedMe") setFileList(filesSharedMe);
    if (sideMenuChosenItem === "sharedI") setFileList(filesSharedI);
  }, [sideMenuChosenItem, filesSharedMe]); // eslint-disable-line

  // TODO: delete unused items
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
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "customize",
      name: __("Редактирование файла"),
      text: __(""),
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "customizeSeveral",
      name: __(`Редактирование файлов`),
      text: __(""),
      callback: () => setFilePick({ ...filePick, show: true })
    },
    {
      type: "properties",
      name: __("Свойства"),
      text: __(""),
      callback: () =>
        setAction({ ...action, type: "properties", name: "Свойства" })
    },
    {
      type: "download",
      name: __("Загрузка файла"),
      text: __(""),
      callback: () => document.downloadFile.submit()
    },
    {
      type: "print",
      name: __("Распечатать файл"),
      text: __(""),
      callback: () => checkMimeTypes()
    }
  ];
  const additionalMenuItems = [
    {
      type: "delete",
      name: __("Удаление файла"),
      text: __(`Вы действительно хотите удалить файл ${chosenFile?.name}?`),
      callback: (list, index) => setAction(list[index])
    }
  ];

  const renderFilesGroup = (mounth, i) => {
    if (!fileList?.files?.length) return null;
    return (
      <FilesGroup
        key={i}
        index={i}
        fileList={fileList}
        filePreview={filePreview}
        setFilePreview={setFilePreview}
        callbackArrMain={callbackArrMain}
        chosenFile={chosenFile}
        setChosenFile={setChosenFile}
        filePick={filePick}
        setFilePick={setFilePick}
        mounthName={mounth}
        setAction={setAction}
        setMouseParams={setMouseParams}
        sideMenuChosenItem={sideMenuChosenItem}
        sideMenuCollapsed={sideMenuCollapsed}
      />
    );
  };

  const excessItems = () => {
    if (chosenFile.is_write === "0") return ["customize", "customizeSeveral"];
    if (filePick.show) {
      return ["intoZip", "properties", "download", "print"];
    } else {
      if (chosenFile.mime_type) {
        switch (chosenFile.mime_type.split("/")[0]) {
          case "image":
            return [];
          case "video":
            return ["print"];
          case "audio":
            return ["print"];
          case "application": {
            return chosenFile.mime_type === "application/x-compressed"
              ? ["print", "intoZip", "intoZipSeveral"]
              : [];
          }
          default:
            return ["print"];
        }
      }
      if (
        previewFormats.filter(ext =>
          chosenFile.ext.toLowerCase().includes(ext)
        )[0]
      )
        return [];
      return ["print"];
    }
  };
  const renderMenuItems = (target, type) => {
    const eItems = excessItems();
    let filteredMenu = [...target];
    filteredMenu.forEach((el, i, arr) => {
      eItems.forEach(excess => {
        if (excess === el.type) delete arr[i];
      });
    });
    return filteredMenu.map((item, i) => {
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

  const onActiveCallbackArrMain = type => {
    let index;
    callbackArrMain.forEach((el, i) =>
      el.type === type ? (index = i) : undefined
    );
    callbackArrMain[index].callback(callbackArrMain, index);
  };

  const checkMimeTypes = file => {
    const mType = file?.mime_type ?? chosenFile?.mime_type;
    const fid = file?.fid ?? chosenFile?.fid;
    const preview = file?.preview ?? chosenFile?.preview;
    const ext = file?.ext ?? chosenFile?.ext;
    if (mType === "application/pdf") {
      setLoadingType("squarify");
      if (mType === "application/pdf") {
        printFile(`${preview}`);
      } else if (mType.includes("image")) {
        printFile(`${preview}`);
      }
    } else {
      const chosenType = previewFormats.filter(format =>
        ext.toLowerCase().includes(format)
      );
      if (chosenType.length > 0) {
        setLoadingType("squarify");
        api
          .post(`/ajax/file_preview.php?uid=${uid}&fid=${fid}`)
          .then(res => printFile(res.data.file_pdf))
          .catch(err => console.log(err));
      }
    }
  };

  const printFile = path => {
    let pri = document.getElementById("frame");
    pri.src = `https://fs2.mh.net.ua/${path}`;
    setLoadingType("");
    setTimeout(() => {
      pri.contentWindow.focus();
      pri.contentWindow.print();
    }, 1000);
  };

  const nullifyFilePick = () =>
    setFilePick({ show: false, files: [], customize: false });

  return (
    <div className={styles.wrapper}>
      <SideMenu
        sideMenuCollapsed={sideMenuCollapsed}
        setSideMenuCollapsed={setSideMenuCollapsed}
        search={search}
        setSearch={setSearch}
        sideMenuChosenItem={sideMenuChosenItem}
        setSideMenuChosenItem={setSideMenuChosenItem}
        filesSharedMe={filesSharedMe}
        filesSharedI={filesSharedI}
        renderFilesGroup={renderFilesGroup}
      />

      <div className={styles.workAreaWrap}>
        <div className={styles.header}>
          <SearchField />
          <div className={styles.infoHeader}>
            <StorageSize />
            <Notifications />
            <Profile />
          </div>
        </div>

        <ServePanel
          view={workElementsView}
          chosenFile={chosenFile}
          setAction={setAction}
          fileSelect={fileSelect}
          archive={() => onActiveCallbackArrMain("archive")}
          share={() => onActiveCallbackArrMain("share")}
          chooseSeveral={() =>
            setFilePick({ ...filePick, files: [], show: !filePick.show })
          }
          filePick={filePick}
        />
        <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
        <div
          className={styles.workSpace}
          style={{
            height: `${
              filePick.show
                ? "calc(100% - 90px - 55px - 86px - 80px)"
                : "calc(100% - 90px - 55px - 86px)"
            }`
          }}
        >
          {workElementsView === "workLinesPreview" && (
            <WorkLinesPreview
              file={chosenFile}
              hideFileList={true}
              filePick={filePick}
            />
          )}
          {/*TODO: заменить при получении сгруппированного на даты списка файлов */}
          {workElementsView !== "workLinesPreview" && (
            <div className={styles.filesList}>
              {months().map((item, i) => renderFilesGroup(item.name, i))}
            </div>
          )}
        </div>
        {filePick.show ? (
          <OptionButtomLine
            callbackArrMain={callbackArrMain}
            filePick={filePick}
            setFilePick={setFilePick}
            actionName={
              filePick.intoZip ? __("Сжать в Zip") : __("Редактировать")
            }
            setAction={setAction}
            action={action}
            nullifyFilePick={nullifyFilePick}
          />
        ) : null}

        {mouseParams !== null && (
          <ContextMenu
            params={mouseParams}
            setParams={setMouseParams}
            tooltip={true}
          >
            <div className={styles.mainMenuItems}>
              {renderMenuItems(contextMenuSharedFiles.main, callbackArrMain)}
            </div>
            <div className={styles.additionalMenuItems}>
              {renderMenuItems(
                contextMenuSharedFiles.additional,
                additionalMenuItems
              )}
            </div>
          </ContextMenu>
        )}

        <BottomPanel />
        {filePreview?.view ? (
          <PreviewFile
            setFilePreview={setFilePreview}
            file={filePreview?.file}
            filePreview={filePreview}
            setLoadingType={setLoadingType}
          />
        ) : null}
        <form
          style={{ display: "none" }}
          name="downloadFile"
          action="/ajax/download.php"
          method="post"
        >
          <input
            style={{ display: "none" }}
            name="fid"
            value={chosenFile?.fid || ""}
            readOnly
          />
        </form>
        <iframe
          style={{ display: "none" }}
          title={"print"}
          frameBorder="0"
          scrolling="no"
          id="frame"
        />
        {action.type === "share" || action.type === "resend" ? (
          <Share
            file={chosenFile}
            files={filePick.files}
            close={nullifyAction}
            action_type={action.type}
            showSuccessMessage={showSuccessMessage}
            setShowSuccessMessage={setShowSuccessMessage}
            setLoadingType={setLoadingType}
          />
        ) : null}
        {action.type === "properties" ? (
          <FileProperty close={nullifyAction} file={chosenFile} />
        ) : null}
        {showSuccessMessage && (
          <SuccessMessage
            showSuccessMessage={showSuccessMessage}
            setShowSuccessMessage={setShowSuccessMessage}
          />
        )}
      </div>
    </div>
  );
};

export default SharedFiles;

SharedFiles.propTypes = {
  filePreview: PropTypes.object,
  setFilePreview: PropTypes.func,
  fileSelect: PropTypes.func,
  setLoadingType: PropTypes.func,
  setMenuItem: PropTypes.func
};
