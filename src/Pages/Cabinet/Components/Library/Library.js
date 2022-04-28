import React, { useState } from "react";

import styles from "./Library.module.sass";
import List from "../List";
import { useLocales } from "react-localized";
import WorkSpace from "./WorkSpace/WorkSpace";
import PropTypes from "prop-types";

function Library({ menuItem, filesPage, setFilesPage, fileSelect }) {
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
      ></List>
      <WorkSpace
        listCollapsed={listCollapsed}
        menuItem={menuItem}
        filesPage={filesPage}
        setFilesPage={setFilesPage}
        fileSelect={fileSelect}
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
  fileSelect: PropTypes.func
};
