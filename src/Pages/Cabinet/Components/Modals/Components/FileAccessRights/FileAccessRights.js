import React from "react";

import styles from "./FileAccessRights.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { MODALS } from "../../../../../../generalComponents/globalVariables";

function FileAccessRights() {
  const dispatch = useDispatch();
  const fileAccessRights = useSelector(s => s.Cabinet.modals.fileAccessRights);

  const closeModal = () =>
    dispatch(
      onSetModals(MODALS.FILE_ACCESS_RIGHTS, {
        ...fileAccessRights,
        open: false,
        file: {}
      })
    );

  return (
    <PopUp set={closeModal}>
      <div className={styles.fileAccessRightsWrap}>123</div>
    </PopUp>
  );
}

export default FileAccessRights;
