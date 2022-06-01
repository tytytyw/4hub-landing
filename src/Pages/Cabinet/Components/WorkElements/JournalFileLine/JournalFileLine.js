import React from "react";
import styles from "./JournalFileLine.module.sass";
import PropTypes from "prop-types";
import { fileProps } from "types/File";

function JournalFileLine({ children, recentFiles }) {
  console.log(recentFiles);
  return <div className={styles.JournalFileLine}>{children}</div>;
}

export default JournalFileLine;

JournalFileLine.defaultProps = {};
JournalFileLine.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  recentFiles: PropTypes.arrayOf(fileProps)
};
