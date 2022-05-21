import React from "react";
import PropTypes from "prop-types";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile/Profile";
import styles from "./Header.module.sass";

function Header({ setItem }) {
  return (
    <div className={styles.header}>
      <SearchField />
      <div className={styles.infoHeader}>
        <StorageSize />
        <Notifications />
        <Profile setItem={setItem} />
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  setItem: PropTypes.func
};
