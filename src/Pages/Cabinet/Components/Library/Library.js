import React, { useState } from "react";

import styles from "./Library.module.sass";
import List from "../List";
import { useLocales } from "react-localized";

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
    </div>
  );
}

export default Library;
