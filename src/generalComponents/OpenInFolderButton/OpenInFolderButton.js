import React from "react";
import styles from "./OpenInFolderButton.module.sass";
import { fileProps, journalFileProps, journalShareFileProps } from "types/File";
import { onChooseFiles, onsetInitialChosenFile, onSetPath } from "Store/actions/CabinetActions";
import { useHistory } from "react-router";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

function OpenInFolderButton({ file, isHover, pathUrl }) {
  const history = useHistory();
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const hover = isHover ? styles.hover : "";

  const goToFolder = () => {
    const path = file.gdir;
    dispatch(onsetInitialChosenFile(file));
    // TODO - VZ - заменить функцию
    dispatch(onChooseFiles(path, "", 1, "", ""));
    dispatch(onSetPath(path));
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
  pathUrl: PropTypes.string
};
