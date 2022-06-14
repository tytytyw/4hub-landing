import React, { useEffect, useState } from "react";

import styles from "./Library.module.sass";
import WorkSpace from "./WorkSpace/WorkSpace";
import PropTypes from "prop-types";
import { filePreviewProps } from "../../../../types/File";
import { fileAddCustomizationProps } from "../../../../types/File";
import LibraryList from "./LibraryList/LibraryList";
import { useDispatch, useSelector } from "react-redux";
import { onLoadFolders, onSetDepartment, onSetModals, onSetPath } from "../../../../Store/actions/CabinetActions";
import {
  CONTEXT_MENU_FOLDER,
  imageSrc,
  LIBRARY,
  LIBRARY_MODALS,
  MODALS
} from "../../../../generalComponents/globalVariables";
import { cancelRequest } from "../../../../api";
import { useContextMenuFolderLibrary, useStandardLibraries } from "../../../../generalComponents/collections";
import CreateFile from "../CreateFile";
import { useLocales } from "react-localized";
import { loadedFilesProps, loadingFileProps } from "types/LoadingFiles";
import ContextMenu from "generalComponents/ContextMenu";
import ContextMenuItem from "generalComponents/ContextMenu/ContextMenuItem";

function Library({
  menuItem,
  setMenuItem,
  filesPage,
  setFilesPage,
  fileSelect,
  fileAddCustomization,
  setFileAddCustomization,
  setFilePreview,
  filePreview,
  setAwaitingFiles,
  awaitingFiles,
  loaded,
  setLoaded,
  loadingFile,
  fileErrors,
  setLoadingFile
}) {
  const { __ } = useLocales();
  const STANDARD_LIBRARIES = useStandardLibraries();
  const [listCollapsed, setListCollapsed] = useState(false);
  const [gLoader, setGLoader] = useState(true);
  const dispatch = useDispatch();
  const folderList = useSelector((s) => s.Cabinet.folderList);
  const chosenFolder = {
    dir: folderList.path,
    name: folderList.folders?.other.find((el) => el.path === `_LIBRARY_/${folderList.path}`)?.name
  };
  const [mouseParams, setMouseParams] = useState(null);
  const contextMenuFolderLibrary = useContextMenuFolderLibrary();

  useEffect(() => {
    dispatch(onSetDepartment("/_LIBRARY_/"));
    dispatch(onSetPath(STANDARD_LIBRARIES.EDUCATION.path));
    dispatch(onLoadFolders(LIBRARY.API_GET_FOLDERS));
    setMenuItem("library");
    return () => {
      cancelRequest(LIBRARY.API_GET_FILES).then(() => console.log(`${LIBRARY.API_GET_FILES}.php was cancelled`));
      cancelRequest(LIBRARY.API_GET_FOLDERS).then(() => console.log(`${LIBRARY.API_GET_FOLDERS}.php was cancelled`));
      dispatch(onSetDepartment("/"));
    };
    //eslint-disable-next-line
  }, []);
  const successLoad = () => {
    setGLoader(false);
    setFilesPage(2);
  };

  const renderMenuItems = (target, type) => {
    return target.map((item, i) => {
      return (
        <ContextMenuItem
          key={i}
          width={mouseParams.width}
          height={mouseParams.height}
          text={item.name}
          callback={() => type[i]?.callback(type, i)}
          imageSrc={imageSrc + `assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
        />
      );
    });
  };
  const callbackArrMain = [
    {
      type: "",
      name: __(""),
      text: __(``),
      callback: () =>
        dispatch(
          onSetModals(MODALS.LIBRARY, {
            type: LIBRARY_MODALS.RENAME_SECTION,
            params: { width: 420, title: chosenFolder?.name, icon: "" }
          })
        )
    },
    {
      type: "",
      name: __(""),
      text: __(``),
      callback: () =>
        dispatch(
          onSetModals("contextMenuModals", {
            type: CONTEXT_MENU_FOLDER.DELETE_FOLDER,
            params: { width: 420, title: `other/${chosenFolder?.name}`, icon: "" }
          })
        )
    }
  ];

  const closeContextMenu = () => {
    setMouseParams(null);
    // setChosenFolder((state) => ({ ...state, contextMenuFolder: null }));
  };

  return (
    <div className={styles.libraryWrap}>
      <LibraryList listCollapsed={listCollapsed} setListCollapsed={setListCollapsed} setMouseParams={setMouseParams} />
      <WorkSpace
        listCollapsed={listCollapsed}
        menuItem={menuItem}
        filesPage={filesPage}
        setFilesPage={setFilesPage}
        fileSelect={fileSelect}
        fileAddCustomization={fileAddCustomization}
        setFileAddCustomization={setFileAddCustomization}
        setFilePreview={setFilePreview}
        filePreview={filePreview}
        gLoader={gLoader}
        setGLoader={setGLoader}
        successLoad={successLoad}
      />

      {fileAddCustomization.show ? (
        <CreateFile
          title={__("Добавление файла")}
          info={chosenFolder}
          blob={fileAddCustomization.file}
          setBlob={setFileAddCustomization}
          // onToggleSafePassword={onSafePassword}
          awaitingFiles={awaitingFiles}
          setAwaitingFiles={setAwaitingFiles}
          loaded={loaded}
          setLoaded={setLoaded}
          loadingFile={loadingFile}
          fileErrors={fileErrors}
          setLoadingFile={setLoadingFile}
          create={fileAddCustomization.create}
          setGLoader={setGLoader}
          // initFolder={chosenFolder}
          showChoiceFolders={false}
          menuItem={menuItem}
        />
      ) : null}
      {mouseParams !== null ? (
        <ContextMenu params={mouseParams} setParams={closeContextMenu} tooltip={true}>
          <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFolderLibrary, callbackArrMain)}</div>
        </ContextMenu>
      ) : null}
    </div>
  );
}

export default Library;

Library.propTypes = {
  listCollapsed: PropTypes.bool,
  menuItem: PropTypes.string,
  setMenuItem: PropTypes.func,
  filesPage: PropTypes.number,
  setFilesPage: PropTypes.func,
  fileSelect: PropTypes.func,
  fileAddCustomization: fileAddCustomizationProps,
  setFileAddCustomization: PropTypes.func,
  setFilePreview: PropTypes.func,
  filePreview: filePreviewProps,
  setAwaitingFiles: PropTypes.func,
  awaitingFiles: PropTypes.oneOfType([PropTypes.arrayOf(loadingFileProps), PropTypes.array]),
  loaded: PropTypes.arrayOf(loadedFilesProps),
  setLoaded: PropTypes.func,
  loadingFile: PropTypes.oneOfType([PropTypes.arrayOf(loadingFileProps), PropTypes.array]),
  fileErrors: PropTypes.arrayOf(PropTypes.string),
  setLoadingFile: PropTypes.func
};
