import React from "react";
import styles from "./OpenInFolderButton.module.sass";
import { fileProps } from "types/File";
import { onChooseFiles, onsetInitialChosenFile, onSetPath } from "Store/actions/CabinetActions";
import { useHistory } from "react-router";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";

function OpenInFolderButton({ file }) {
  const history = useHistory();
  const { __ } = useLocales();
  const dispatch = useDispatch();

  const goToFolder = () => {
    const path = file.gdir;
    dispatch(onsetInitialChosenFile(file));
    dispatch(onChooseFiles(path, "", 1, "", ""));
    dispatch(onSetPath(path));
    setTimeout(() => history.push("/folders"), 50);
  };

  return (
    <div className={styles.button} onClick={goToFolder}>
      <span>{__("Открыть в системе 4Hub")}</span>
    </div>
  );
}

export default OpenInFolderButton;

OpenInFolderButton.propTypes = {
  file: fileProps
};
