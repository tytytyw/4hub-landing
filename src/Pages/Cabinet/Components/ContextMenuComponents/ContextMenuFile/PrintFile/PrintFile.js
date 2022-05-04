import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { previewFormats } from "../../../../../../generalComponents/collections";
import api from "../../../../../../api";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { useLocation } from "react-router";

function PrintFile() {
  const uid = useSelector((s) => s.user.uid);
  const contextMenuModals = useSelector((s) => s.Cabinet.modals.contextMenuModals);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const closeModal = () =>
    dispatch(
      onSetModals("contextMenuModals", {
        ...contextMenuModals,
        type: "",
        items: [],
        authorizedSafe: null
      })
    );

  const checkMimeTypes = (file) => {
    const mType = file?.mime_type ?? contextMenuModals.items[0]?.mime_type;
    const isFormat =
      previewFormats.filter((format) => contextMenuModals.items[0].ext.toLowerCase().includes(format)).length > 0;
    const fid = contextMenuModals.items[0]?.fid ?? "";
    const preview = file?.preview ?? contextMenuModals.items[0]?.preview;
    if (mType === "application/pdf" || (mType && mType?.includes("image"))) {
      printFile(`${preview}`);
    } else {
      if (isFormat) {
        if (pathname.split("/")[1] !== "safe") {
          api
            .post(`/ajax/file_preview.php?uid=${uid}&fid=${fid}`)
            .then((res) => printFile(res.data.file_pdf))
            .catch((err) => dispatch(onSetModals("error", { open: true, message: err })))
            .finally(() => closeModal());
        } else {
          api
            .get(
              `/ajax/safe_file_download.php?uid=${uid}&fid=${fid}&id_safe=${contextMenuModals.authorizedSafe.id_safe}&pass=${contextMenuModals.authorizedSafe.password}&code=${contextMenuModals.authorizedSafe.code}`,
              {
                responseType: "blob"
              }
            )

            .then((res) => {
              const blob = new Blob([res.data], { type: mType });
              const objectURL = URL.createObjectURL(blob);

              if (mType === "application/pdf" || (mType && mType?.includes("image"))) {
                printFile(objectURL);
              } else if (isFormat) printFile(objectURL);
            })
            .catch((err) => console.log(err))
            .finally(() => closeModal());
        }
      }
    }
  };

  const printFile = (path) => {
    try {
      let pri = document.getElementById("frame");
      pri.src = `https://fs2.mh.net.ua${path}`;
      setTimeout(() => {
        pri.contentWindow.focus();
        pri.contentWindow.print();
        dispatch(
          onSetModals("contextMenuModals", {
            ...contextMenuModals,
            type: "",
            items: []
          })
        );
      }, 1000);
    } catch (err) {
      dispatch(onSetModals("error", { open: true, message: err }));
    }
  };

  useLayoutEffect(() => {
    checkMimeTypes(contextMenuModals.items[0]);
  }, []); //eslint-disable-line

  return <iframe style={{ display: "none" }} title={"print"} frameBorder="0" scrolling="no" id="frame" />;
}

export default PrintFile;
