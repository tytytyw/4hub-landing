import React from "react";
import styles from "./OpenInFolderButton.module.sass";
import { fileProps, journalFileProps, journalShareFileProps } from "types/File";
import { onLoadFiles, onsetInitialChosenFile, onSetPath } from "Store/actions/CabinetActions";
import { useHistory } from "react-router";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

function OpenInFolderButton({ file, isHover, pathUrl, endpoint }) {
  //mylog
  console.log(file);
  console.log(endpoint);
  const history = useHistory();
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const hover = isHover ? styles.hover : "";

  const goToFolder = () => {
    const path = file.gdir;
    dispatch(onsetInitialChosenFile(file));
    dispatch(onSetPath(path));
    dispatch(onLoadFiles(endpoint, 1));
    setTimeout(() => history.push(pathUrl), 50);
  };

  return (
    <div className={classNames(styles.button, hover)} onClick={goToFolder}>
      <span>{__("Открыть в системе 4Hub")}</span>
    </div>
  );
}

export default OpenInFolderButton;

OpenInFolderButton.propTypes = {
  file: PropTypes.oneOfType([fileProps, journalFileProps, journalShareFileProps]),
  isHover: PropTypes.bool,
  pathUrl: PropTypes.string,
  endpoint: PropTypes.string
};
