import React from "react";
import { useSelector } from "react-redux";

import styles from "./WorkBars.module.sass";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import { useScrollElementOnScreen } from "../../../../../generalComponents/Hooks";
import { renderHeight } from "../../../../../generalComponents/generalHelpers";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { filePickProps } from "../../../../../types/File";
import classNames from "classnames";

const WorkBars = ({ children, filePick, hideUploadFile, filesPage, fileRef, gLoader, load, options }) => {
  const { __ } = useLocales();
  const { theme } = useSelector((state) => state.user.userInfo);
  const recentFiles = useSelector((state) => state.Cabinet.recentFiles);
  const size = useSelector((state) => state.Cabinet.size);
  const search = useSelector((state) => state.Cabinet.search);

  const [containerRef] = useScrollElementOnScreen(options, load);

  const hideUploadFileStyle = hideUploadFile
    ? styles.workBarsWrapNoScroll
    : renderHeight(recentFiles, filePick, styles);

  return (
    <div
      ref={fileRef}
      className={classNames(styles.workBarsWrap, `scrollbar-${theme}`, hideUploadFileStyle)}
      style={{
        gridTemplateColumns:
          size === "small"
            ? "repeat(auto-fill, minmax(118px, 1fr))"
            : size === "medium"
            ? "repeat(auto-fill, minmax(160px, 1fr))"
            : "repeat(auto-fill, minmax(205px, 1fr))",
        gridAutoRows: size === "small" ? "118px" : size === "medium" ? "160px" : "205px"
      }}
    >
      {children?.length === 0 && (search.length !== 0 || hideUploadFile) ? (
        <div
          className={styles.noSearchResults}
          style={{
            left: size === "small" ? "158px" : size === "medium" ? "200px" : "245px"
          }}
        >
          {__("Нет элементов удовлетворяющих условиям поиска")}
        </div>
      ) : null}
      {gLoader ? (
        <Loader
          type="bounceDots"
          position="absolute"
          background="rgba(255, 255, 255, 0.75)"
          zIndex={5}
          containerType="bounceDots"
        />
      ) : (
        children
      )}
      {hideUploadFile ? null : !gLoader ? (
        <div
          className={`${styles.bottomLine} ${filesPage === 0 ? styles.bottomLineHidden : ""}`}
          style={{ height: "100%" }}
          ref={containerRef}
        >
          <Loader
            type="bounceDots"
            position="absolute"
            background="white"
            zIndex={5}
            width="100px"
            height="100px"
            containerType="bounceDots"
          />
        </div>
      ) : null}
    </div>
  );
};

export default WorkBars;

WorkBars.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  filePick: filePickProps,
  hideUploadFile: PropTypes.bool,
  filesPage: PropTypes.number,
  fileRef: PropTypes.exact({ current: PropTypes.instanceOf(Element) }),
  gLoader: PropTypes.bool,
  load: PropTypes.func,
  options: PropTypes.exact({
    root: PropTypes.number,
    rootMargin: PropTypes.string,
    threshold: PropTypes.number
  })
};
