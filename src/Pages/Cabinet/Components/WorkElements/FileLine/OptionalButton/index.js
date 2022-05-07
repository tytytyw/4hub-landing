import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./OptionalButton.module.sass";
import { useHistory, useLocation } from "react-router";
import {
  onSetPath,
  onChooseFiles,
  onsetInitialChosenFile,
  onSetModals,
  onGetArchiveFiles
} from "../../../../../../Store/actions/CabinetActions";
import api from "../../../../../../api";
import classNames from "classnames";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { fileProps } from "../../../../../../types/WorkElements";
import PropTypes from "prop-types";

import { fileProps } from "../../../../../../types/WorkElements";

const OptionalButton = ({ file, successLoad }) => {
  const { __ } = useLocales();
  const history = useHistory();
  const { pathname } = useLocation();
  const size = useSelector((state) => state.Cabinet.size);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);

  const goToFolder = () => {
    const path = file.gdir;
    dispatch(onsetInitialChosenFile(file));
    dispatch(onChooseFiles(path, "", 1, "", ""));
    dispatch(onSetPath(path));
    setTimeout(() => history.push("/folders"), 50);
  };

  const unArchiveFile = () => {
    api
      .get(`/ajax/file_unarchive.php?uid=${uid}&fid=${file.fid}`)
      .then((res) => {
        if (res.data.ok) {
          //TODO: replace to topMessage
          onGetArchiveFiles("", 1, "", successLoad, "");
          //TODO: dispatch fileList filter
          dispatch(
            onSetModals("topMessage", {
              open: true,
              type: "message",
              message: __("Файл успешно разархивирован")
            })
          );
        } else throw new Error();
      })
      .catch(() =>
        dispatch(
          onSetModals("error", {
            open: true,
            message: __("что-то пошло не так"),
            title: __("ошибка")
          })
        )
      );
  };

  const renderInSharedFiles = () => (
    <div className={styles.button} onClick={goToFolder}>
      <span>{__("Открыть файл в системе 4Hub")}</span>
    </div>
  );

  const renderInArchive = () => (
    <div className={styles.button} onClick={unArchiveFile}>
      <span>{__("Разархивировать")}</span>
    </div>
  );

  return (
    <div className={classNames(styles.wrapper, styles[size])}>
      {pathname === "/downloaded-files" && renderInSharedFiles()}
      {pathname === "/archive" && renderInArchive()}
    </div>
  );
};

export default OptionalButton;
OptionalButton.propTypes = {
  file: fileProps,
  successLoad: PropTypes.func
};
