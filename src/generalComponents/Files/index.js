import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";

import styles from "./Files.module.sass";

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

  const size = fileSize ?? useSelector((state) => state.Cabinet.size);

  const isFormat = () => formats.indexOf(format);

  const [formatSize, setFormatSize] = useState(0);
  const formatRef = useCallback(
    (node) => {
      if (node !== null) {
        setFormatSize(node.getBoundingClientRect().width);
      }
    },
    [size]
  ); // eslint-disable-line
  const fontSize = formatSize > 40 ? "12px" : formatSize > 30 ? "10px" : "7px";

  return (
    <div className={styles.file}>
      <div
        className={`${styles.corner} ${isFormat() > -1 ? styles[format] : styles.others}`}
        style={{
          background: `${color ? `linear-gradient(45deg, ${color} 0%, ${color} 50%, white 51%)` : ""}`
        }}
      />
      <div className={styles.shadow} />
      <div
        ref={formatRef}
        className={`${styles.label} ${isFormat() > -1 ? styles[`${format}Big`] : styles.othersBig}`}
        style={{ background: `${color ? color : ""}`, fontSize }}
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
  );
};

export default File;
