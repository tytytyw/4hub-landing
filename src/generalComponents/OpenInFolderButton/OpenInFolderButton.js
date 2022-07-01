import React from "react";
import styles from "./OpenInFolderButton.module.sass";
import { fileProps } from "types/File";
import { onChooseFiles, onsetInitialChosenFile, onSetPath } from "Store/actions/CabinetActions";
import { useHistory } from "react-router";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

function OpenInFolderButton({ file, isHover }) {
  const history = useHistory();
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const hover = isHover ? styles.hover : "";

  const goToFolder = () => {
    const path = file.gdir;
    dispatch(onsetInitialChosenFile(file));
    dispatch(onChooseFiles(path, "", 1, "", ""));
    dispatch(onSetPath(path));
    setTimeout(() => history.push("/folders"), 50);
  };

  return (
    <div className={classNames(styles.button, hover)} onClick={goToFolder}>
      <span>{__("Открыть в системе 4Hub")}</span>
    </div>
  );
}

export default OpenInFolderButton;

OpenInFolderButton.propTypes = {
  file: fileProps,
  isHover: PropTypes.bool
};
