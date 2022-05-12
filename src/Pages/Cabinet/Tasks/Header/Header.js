import React from "react";
import styles from "./Header.module.sass";
import SearchField from "../../Components/SearchField";
import StorageSize from "../../Components/StorageSize";
import Notifications from "../../Components/Notifications";
import Profile from "../../Components/Profile/Profile";

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
