import React from "react";

import styles from "./FileAccessUserList.module.sass";
import { userFileAccess } from "../../../../../../../types/FileAccessRights";
import PropTypes from "prop-types";

function FileAccessUserList({ users }) {
  return <div className={styles.userListWrap}>FileAccessUserList works!</div>;
}

export default FileAccessUserList;

FileAccessUserList.propTypes = {
  users: PropTypes.arrayOf(userFileAccess)
};
