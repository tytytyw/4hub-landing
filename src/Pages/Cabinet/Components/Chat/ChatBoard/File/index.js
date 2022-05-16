import React from "react";
import PropTypes from "prop-types";
import styles from "./File.module.sass";
import classNames from "classnames";

const File = ({ format, color, fileSize }) => {
  const formats = [
    "png",
    "jpeg",
    "jpg",
    "svg",
    "doc",
    "docx",
    "sketch",
    "ai",
    "psd",
    "mp4",
    "mov",
    "avi",
    "xls",
    "xlsx",
    "pptx"
  ];

  const isFormat = () => formats.indexOf(format);

  return (
    <div className={classNames({ [styles.fileWrapper]: true, [styles.small]: fileSize === "small" })}>
      <div className={styles.corner}>
        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.73115 11.1111H12.1121L0.9375 0V8.33333C0.9375 9.86111 2.19464 11.1111 3.73115 11.1111Z"
            fill={color ?? "grey"}
          />
        </svg>
      </div>
      <div className={styles.file}>
        <div
          className={`${styles.label} ${isFormat() > -1 ? styles[`${format}Big`] : styles.othersBig}`}
          style={{ background: `${color ? color : ""}`, fontSize: 8 }}
        >
          {format?.toUpperCase() === "ZIP" ? (
            <img className={styles.zip} src="/assets/PrivateCabinet/zipper.svg" alt="" />
          ) : null}
          {format ? (
            <span className={format?.toUpperCase() === "ZIP" ? styles.labelZip : null}>{format?.toUpperCase()}</span>
          ) : (
            <img src="./assets/PrivateCabinet/down-arrow-2.svg" alt="img" />
          )}
        </div>
      </div>
    </div>
  );
};

export default File;

File.propTypes = {
  format: PropTypes.string,
  color: PropTypes.string,
  fileSize: PropTypes.string
};
