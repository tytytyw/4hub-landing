import React, { useRef } from "react";

import styles from "./PreviewFile.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import MiniToolBar from "../../../WorkElements/MiniToolBar/MiniToolBar";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import Previews from "../../../WorkElements/Previews/Previews";

const PreviewFile = () => {
  const file = useSelector((s) => s.Cabinet.modals.previewFile.file);
  const previewFile = useSelector((s) => s.Cabinet.modals.previewFile);
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const canvasWrapRef = useRef(null);

  const set = (e) => {
    let close = false;
    if (e?.target?.className === styles.preview) close = true;
    if (close) closeModal();
  };

  const closeModal = () =>
    dispatch(onSetModals("previewFile", { ...previewFile, open: false, file: null, message: null }));
  return (
    <PopUp set={set} background={"none"} padding="0">
      <div className={styles.preview} onClick={set}>
        {file ? (
          <div className={styles.imagePreviewWrap} ref={canvasWrapRef}>
            {file?.mime_type && file?.mime_type.includes("image") ? (
              <MiniToolBar
                canvasRef={canvasRef}
                canvasWrapRef={canvasWrapRef}
                file={file}
                share={true}
                closePreview={set}
              />
            ) : null}
            <Previews file={file} ref={canvasRef} errorHandler={closeModal} />
          </div>
        ) : null}
      </div>
    </PopUp>
  );
};

export default PreviewFile;
