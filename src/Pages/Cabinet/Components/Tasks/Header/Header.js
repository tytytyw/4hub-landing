import React from "react";
import styles from "./Header.module.sass";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile/Profile";

function Header() {
  return (
    <div className={styles.header}>
      <SearchField />
      <div className={styles.infoHeader}>
        <StorageSize />
        <Notifications />
        <Profile />
      </div>
    </div>
  );
}

export default Header;
