import React, { useEffect, useState } from "react";

import styles from "./Library.module.sass";
import WorkSpace from "./WorkSpace/WorkSpace";
import PropTypes from "prop-types";
import { filePreviewProps } from "../../../../types/File";
import { fileAddCustomizationProps } from "../../../../types/File";
import LibraryList from "./LibraryList/LibraryList";
import { useDispatch } from "react-redux";
import { onLoadFolders, onSetPath } from "../../../../Store/actions/CabinetActions";
import { LIBRARY } from "../../../../generalComponents/globalVariables";
import { cancelRequest } from "../../../../api";
import { useStandardLibraries } from "../../../../generalComponents/collections";

function Library({
  menuItem,
  filesPage,
  setFilesPage,
  fileSelect,
  fileAddCustomization,
  setFileAddCustomization,
  setFilePreview,
  filePreview
}) {
  const STANDARD_LIBRARIES = useStandardLibraries();
  const [listCollapsed, setListCollapsed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onSetPath(STANDARD_LIBRARIES.EDUCATION.path));
    dispatch(onLoadFolders(LIBRARY.API_GET_FOLDERS));
    return () => {
      cancelRequest(LIBRARY.API_GET_FILES).then(() => console.log(`${LIBRARY.API_GET_FILES}.php was cancelled`));
      cancelRequest(LIBRARY.API_GET_FOLDERS).then(() => console.log(`${LIBRARY.API_GET_FOLDERS}.php was cancelled`));
    };
    //eslint-disable-next-line
  }, []);

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
      />
    </div>
  );
}

export default Library;

Library.propTypes = {
  listCollapsed: PropTypes.bool,
  menuItem: PropTypes.string,
  filesPage: PropTypes.number,
  setFilesPage: PropTypes.func,
  fileSelect: PropTypes.func,
  fileAddCustomization: fileAddCustomizationProps,
  setFileAddCustomization: PropTypes.func,
  setFilePreview: PropTypes.func,
  filePreview: filePreviewProps
};
