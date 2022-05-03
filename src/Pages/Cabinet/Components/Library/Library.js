import React, { useState } from "react";

import styles from "./Library.module.sass";
import List from "../List";
import { useLocales } from "react-localized";
import WorkSpace from "./WorkSpace/WorkSpace";
import PropTypes from "prop-types";
import { filePreviewProps } from "../../../../types/WorkElements";

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
  const { __ } = useLocales();
  const [listCollapsed, setListCollapsed] = useState(false);

  return (
    <div className={styles.libraryWrap}>
      <List
        title={__("Библиотека")}
        icon={false}
        leftIconSrc="book.svg"
        listCollapsed={listCollapsed}
        setListCollapsed={setListCollapsed}
      />
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
  fileAddCustomization: PropTypes.object,
  setFileAddCustomization: PropTypes.func,
  setFilePreview: PropTypes.func,
  filePreview: filePreviewProps
};
