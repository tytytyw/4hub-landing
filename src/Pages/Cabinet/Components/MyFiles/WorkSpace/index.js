import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./WorkSpace.module.sass";
import { useLocation } from "react-router";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile/Profile";
import ServePanel from "../../ServePanel";
import BottomPanel from "../../BottomPanel";
import RecentFiles from "../../RecentFiles";
import OptionButtomLine from "../../WorkElements/OptionButtomLine";
import ItemsList from "../../WorkElements/ItemsList/ItemsList";
import { useElementResize } from "../../../../../generalComponents/Hooks";
import {
  onAddRecentFiles,
  onChooseFiles,
  onGetArchiveFiles
} from "../../../../../Store/actions/CabinetActions";
import DateFilter from "../DateFilter";
import { useLocales } from "react-localized";

const WorkSpace = ({
  chosenFile,
  setChosenFile,
  listCollapsed,
  setItem,
  setMouseParams,
  action,
  setAction,
  nullifyFilePick,
  callbackArrMain,
  setFilePreview,
  filePreview,
  fileSelect,
  fileLoading,
  filePick,
  setFilePick,
  chosenFolder,
  fileAddCustomization,
  setFileAddCustomization,
  filesPage,
  setFilesPage,
  gLoader,
  setGLoader,
  menuItem
}) => {
  const { __ } = useLocales();
  const recentFiles = useSelector(state => state.Cabinet.recentFiles);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [containerRef, width] = useElementResize();
  const { pathname } = useLocation();
  const [dateFilter, setDateFilter] = useState({});

  const successLoad = () => {
    setFilesPage(2);
    setGLoader(false);
  };
  useEffect(() => {
    setFilesPage(0);
    setGLoader(true);
    setChosenFile(null);
    pathname === "/files" && dispatch(onAddRecentFiles());
    //TODO - Need to change request after server changes
    if (pathname === "/files")
      dispatch(
        onChooseFiles("", "", 1, "", successLoad, "", "file_list_all", pathname)
      );
    if (pathname === "/archive")
      dispatch(onGetArchiveFiles("", 1, "", successLoad, "", pathname));
    //TODO: need dispatch downloaded-files
    if (pathname === "/downloaded-files")
      dispatch(
        onChooseFiles("", "", 1, "", successLoad, "", "file_list_all", pathname)
      );
    dispatch({
      type: "SORT_FILES",
      payload:
        pathname === "/archive"
          ? "byDateArchived&sort_reverse=1&group=date_archive"
          : "byDateCreated&sort_reverse=1&group=ctime"
    });
    return () => {
      dispatch({ type: "CHOOSE_FILES", payload: [] }); //cleaning fileList when changing tabs
      dispatch({
        type: "SORT_FILES",
        payload: "byDateCreated&sort_reverse=1&group=ctime"
      });
    };
  }, [pathname]); //eslint-disable-line

  const onActiveCallbackArrMain = type => {
    let index;
    callbackArrMain.forEach((el, i) =>
      el.type === type ? (index = i) : undefined
    );
    callbackArrMain[index].callback(callbackArrMain, index);
  };

  return (
    <>
      <div
        className={`
					${styles.workSpaceWrap} 
					${
            typeof listCollapsed === "boolean"
              ? listCollapsed
                ? styles.workSpaceWrapCollapsed
                : styles.workSpaceWrapShort
              : undefined
          }`}
        ref={containerRef}
      >
        <div className={styles.header}>
          <SearchField setChosenFile={setChosenFile} menuItem={menuItem} />
          <div className={styles.infoHeader}>
            <StorageSize />
            <Notifications />
            <Profile setItem={setItem} />
          </div>
        </div>
        {pathname === "/files" && recentFiles?.length > 0 && (
          <RecentFiles
            setFilePreview={setFilePreview}
            filePreview={filePreview}
            width={width}
          />
        )}
        <ServePanel
          chosenFile={chosenFile}
          setAction={setAction}
          fileSelect={fileSelect}
          archive={() => onActiveCallbackArrMain("archive")}
          share={() => onActiveCallbackArrMain("share")}
          chooseSeveral={() =>
            setFilePick({ ...filePick, files: [], show: !filePick.show })
          }
          filePick={filePick}
          fileAddCustomization={fileAddCustomization}
          setFileAddCustomization={setFileAddCustomization}
          addFile={fileSelect}
          setGLoader={setGLoader}
          setFilesPage={setFilesPage}
          dateFilter={dateFilter}
        />
        {pathname === "/archive" && (
          <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
        )}
        <ItemsList
          setGLoader={setGLoader}
          setFilesPage={setFilesPage}
          setChosenFile={setChosenFile}
          filePick={filePick}
          setMouseParams={setMouseParams}
          setAction={setAction}
          setFilePreview={setFilePreview}
          filePreview={filePreview}
          setFilePick={setFilePick}
          callbackArrMain={callbackArrMain}
          chosenFile={chosenFile}
          fileLoading={fileLoading}
          fileSelect={fileSelect}
          filesPage={filesPage}
          chosenFolder={chosenFolder}
          gLoader={gLoader}
          fileRef={fileRef}
          width={width}
          menuItem={menuItem}
          dateFilter={dateFilter}
          successLoad={successLoad}
        />

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
        <BottomPanel />
      </div>
    </>
  );
};

export default WorkSpace;
