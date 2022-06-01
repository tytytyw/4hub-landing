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
  onGetArchiveFiles,
  onLoadFiles,
  clearFileList
} from "../../../../../Store/actions/CabinetActions";
import DateFilter from "../DateFilter";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { filePickProps, filePreviewProps, fileProps } from "../../../../../types/File";
import { actionProps } from "../../../../../types/Action";
import { fileAddCustomizationProps } from "../../../../../types/File";
import { createFilesProps } from "../../../../../types/CreateFile";
import { callbackArrMain } from "types/CallbackArrMain";
import { CART } from "../../../../../generalComponents/globalVariables";
import { cancelRequest } from "../../../../../api";
import { LOADING_STATE, VIEW_TYPE } from "../../../../../generalComponents/globalVariables";

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
  const recentFiles = useSelector((state) => state.Cabinet.recentFiles);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [containerRef, width] = useElementResize();
  const { pathname } = useLocation();
  const { view } = useSelector((s) => s.Cabinet);
  const [dateFilter, setDateFilter] = useState({});
  const successLoad = () => {
    setFilesPage(2);
    setGLoader(false);
  };

  useEffect(() => {
    const type = view === VIEW_TYPE.LINES_PREVIEW ? LOADING_STATE.LOAD_NEXT_COLUMN : LOADING_STATE.LOADING;
    setFilesPage(0);
    setChosenFile(null);
    pathname === "/files" && dispatch(onAddRecentFiles());
    //TODO - Need to change request after server changes
    if (pathname === "/files") dispatch(onChooseFiles("", "", 1, "", successLoad, "", "file_list_all", pathname));
    if (pathname === "/archive") dispatch(onGetArchiveFiles("", 1, "", successLoad, "", pathname));

    if (pathname === "/cart") dispatch(onLoadFiles(CART.API_GET_FILES, 1, type));
    if (pathname === "/journal") dispatch(onAddRecentFiles("history_files", 1));

    setFilesPage(2);
    //TODO: need dispatch downloaded-files
    if (pathname === "/downloaded-files")
      dispatch(onChooseFiles("", "", 1, "", successLoad, "", "file_list_all", pathname));
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
      cancelRequest(CART.API_GET_FILES).then(() => console.log(`${CART.API_GET_FILES}.php was cancelled`));
      dispatch(clearFileList());
    };
  }, [pathname]); // eslint-disable-line

  const onActiveCallbackArrMain = (type) => {
    let index;
    callbackArrMain.forEach((el, i) => (el.type === type ? (index = i) : undefined));
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
          <RecentFiles setFilePreview={setFilePreview} filePreview={filePreview} width={width} />
        )}
        <ServePanel
          chosenFile={chosenFile}
          setAction={setAction}
          fileSelect={fileSelect}
          archive={() => onActiveCallbackArrMain("archive")}
          share={() => onActiveCallbackArrMain("share")}
          chooseSeveral={() => setFilePick({ ...filePick, files: [], show: !filePick.show })}
          filePick={filePick}
          fileAddCustomization={fileAddCustomization}
          setFileAddCustomization={setFileAddCustomization}
          addFile={fileSelect}
          setGLoader={setGLoader}
          setFilesPage={setFilesPage}
          dateFilter={dateFilter}
        />
        {(pathname === "/archive" || pathname === "/cart" || pathname === "/journal") && (
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
            actionName={filePick.intoZip ? __("Сжать в Zip") : __("Редактировать")}
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

WorkSpace.propTypes = {
  chosenFile: fileProps,
  setChosenFile: PropTypes.func,
  listCollapsed: PropTypes.bool,
  setItem: PropTypes.func,
  setMouseParams: PropTypes.func,
  action: actionProps,
  setAction: PropTypes.func,
  nullifyFilePick: PropTypes.func,
  callbackArrMain: PropTypes.arrayOf(PropTypes.objectOf(callbackArrMain)),
  setFilePreview: PropTypes.func,
  filePreview: filePreviewProps,
  fileSelect: PropTypes.func,
  filePick: filePickProps,
  setFilePick: PropTypes.func,
  chosenFolder: createFilesProps,
  fileAddCustomization: fileAddCustomizationProps,
  setFileAddCustomization: PropTypes.func,
  filesPage: PropTypes.number,
  setFilesPage: PropTypes.func,
  gLoader: PropTypes.bool,
  setGLoader: PropTypes.func,
  menuItem: PropTypes.string
};
