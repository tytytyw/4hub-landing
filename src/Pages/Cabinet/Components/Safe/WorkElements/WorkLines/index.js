import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onGetSafeFileList } from "../../../../../../Store/actions/CabinetActions";
import Loader from "../../../../../../generalComponents/Loaders/4HUB";
import { useScrollElementOnScreen } from "../../../../../../generalComponents/Hooks";

import styles from "./WorkLines.module.sass";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { filePickProps } from "../../../../../../types/WorkElements";

const WorkLines = ({
  children,
  fileRef,
  gLoader,
  filePick,
  filesPage,
  onSuccessLoading,
  loadingFiles,
  setLoadingFiles
}) => {
  const { __ } = useLocales();
  const size = useSelector(state => state.Cabinet.size);
  const search = useSelector(state => state.Cabinet.search);
  const dispatch = useDispatch();
  const authorizedSafe = useSelector(
    state => state.Cabinet.safe.authorizedSafe
  );

  const load = entry => {
    if (!gLoader && authorizedSafe) {
      if (entry.isIntersecting && !loadingFiles && filesPage !== 0) {
        setLoadingFiles(true);
        dispatch(
          onGetSafeFileList(
            authorizedSafe.code,
            authorizedSafe.id_safe,
            authorizedSafe.password,
            onSuccessLoading,
            "",
            "",
            search,
            filesPage,
            ""
          )
        );
      }
    }
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
  };

  const [containerRef] = useScrollElementOnScreen(options, load);

  useEffect(() => {
    setLoadingFiles(false);
  }, []); //eslint-disable-line

  return (
    <div
      className={styles.workLinesWrap}
      ref={fileRef}
      style={{
        height: `${
          filePick.show
            ? "calc(100% - 90px - 55px - 90px)"
            : "calc(100% - 90px - 55px)"
        }`,
        gridTemplateColumns:
          size === "small"
            ? "repeat(auto-fill, 118px)"
            : size === "medium"
            ? "repeat(auto-fill, 160px)"
            : "repeat(auto-fill, 205px)",
        gridAutoRows:
          size === "small" ? "118px" : size === "medium" ? "160px" : "205px"
      }}>
      {children?.length === 0 && search.length !== 0 ? (
        <div className={styles.noSearchResults}>
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
      {!gLoader ? (
        <div
          className={styles.bottomLine}
          style={{ height: "100px" }}
          ref={containerRef}>
          {loadingFiles && (
            <Loader
              type="bounceDots"
              position="absolute"
              background="white"
              zIndex={5}
              width="100px"
              height="100px"
              containerType="bounceDots"
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default WorkLines;

WorkLines.propTypes = {
  children: PropTypes.node,
  fileRef: PropTypes.object,
  gLoader: PropTypes.bool,
  filePick: filePickProps,
  filesPage: PropTypes.number,
  onSuccessLoading: PropTypes.func,
  loadingFiles: PropTypes.bool,
  setLoadingFiles: PropTypes.func
};
