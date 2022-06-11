import React, { useEffect, useState } from "react";

import styles from "./Library.module.sass";
import WorkSpace from "./WorkSpace/WorkSpace";
import PropTypes from "prop-types";
import { filePreviewProps } from "../../../../types/File";
import { fileAddCustomizationProps } from "../../../../types/File";
import LibraryList from "./LibraryList/LibraryList";
import { useDispatch, useSelector } from "react-redux";
import { onLoadFolders, onSetPath } from "../../../../Store/actions/CabinetActions";
import { LIBRARY } from "../../../../generalComponents/globalVariables";
import { cancelRequest } from "../../../../api";
import { useStandardLibraries } from "../../../../generalComponents/collections";
import CreateFile from "../CreateFile";
import { useLocales } from "react-localized";
import { loadedFilesProps, loadingFileProps } from "types/LoadingFiles";

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
  const chosenFolder = {
    dir: useSelector((s) => s.Cabinet.folderList.path)
  };

  useEffect(() => {
    dispatch(onSetPath(STANDARD_LIBRARIES.EDUCATION.path));
    dispatch(onLoadFolders(LIBRARY.API_GET_FOLDERS));
    setMenuItem("library");
    return () => {
      cancelRequest(LIBRARY.API_GET_FILES).then(() => console.log(`${LIBRARY.API_GET_FILES}.php was cancelled`));
      cancelRequest(LIBRARY.API_GET_FOLDERS).then(() => console.log(`${LIBRARY.API_GET_FOLDERS}.php was cancelled`));
    };
    //eslint-disable-next-line
  }, []);

  const successLoad = () => {
    if (fileSelect === 1) {
      setGLoader(false);
    }
    setFilesPage(2);
  };

  return (
    <div className={styles.libraryWrap}>
      <LibraryList listCollapsed={listCollapsed} setListCollapsed={setListCollapsed} />
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
