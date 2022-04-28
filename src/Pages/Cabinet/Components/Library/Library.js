import React, { useState } from "react";

import styles from "./Library.module.sass";
import List from "../List";
import { useLocales } from "react-localized";
import WorkSpace from "./WorkSpace/WorkSpace";

function Library() {
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
      <WorkSpace />
    </div>
  );
}

export default Library;
