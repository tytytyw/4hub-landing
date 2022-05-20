import React, { useEffect, useState } from "react";

import styles from "./Library.module.sass";
import WorkSpace from "./WorkSpace/WorkSpace";
import PropTypes from "prop-types";
import { filePreviewProps } from "../../../../types/File";
import { fileAddCustomizationProps } from "../../../../types/File";
import LibraryList from "./WorkSpace/LibraryList/LibraryList";
import { useDispatch, useSelector } from "react-redux";
import { clearFileList, onLoadFiles } from "../../../../Store/actions/CabinetActions";
import { LIBRARY, LOADING_STATE, VIEW_TYPE } from "../../../../generalComponents/globalVariables";
import { cancelRequest } from "../../../../api";

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
  const [listCollapsed, setListCollapsed] = useState(false);
  const { view } = useSelector((s) => s.Cabinet);
  const dispatch = useDispatch();

  useEffect(() => {
    const type = view === VIEW_TYPE.LINES_PREVIEW ? LOADING_STATE.LOAD_NEXT_COLUMN : LOADING_STATE.LOADING;
    dispatch(onLoadFiles(LIBRARY.API_GET_FILES, 1, type));

    return () => {
      cancelRequest(LIBRARY.API_GET_FILES).then(() => console.log(`${LIBRARY.API_GET_FILES}.php was cancelled`));
      dispatch(clearFileList());
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
