import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import api from "../../../../../api";
import { previewFormats } from "../../../../../generalComponents/collections";
import styles from "./PreviewSafeFile.module.sass";
import PopUp from "../../../../../generalComponents/PopUp";
import File from "../../../../../generalComponents/Files";

const PreviewSafeFile = ({ setFilePreview, file, filePreview, setLoadingType }) => {
  const uid = useSelector((state) => state.user.uid);
  const authorizedSafe = useSelector((state) => state.Cabinet.safe.authorizedSafe);

  const standardPrev = (
    <div className={styles.filePreviewWrapWrap}>
      <div className={styles.filePreviewWrap}>
        <File format={file?.ext} color={file?.color} />
      </div>
    </div>
  );

  const set = () => setFilePreview({ ...filePreview, view: false, file: null });
  const [previewReq, setPreviewReq] = useState({ sent: false, data: null });

  const getPreview = () => {
    if (!previewReq.sent) {
      const mType = file?.mime_type;
      setLoadingType("squarify");
      setPreviewReq({ ...previewReq, sent: true });
      api
        .get(
          `/ajax/safe_file_download.php?uid=${uid}&fid=${file.fid}&id_safe=${authorizedSafe.id_safe}&pass=${authorizedSafe.password}&code=${authorizedSafe.code}`,
          {
            responseType: "blob"
          }
        )
        .then((res) => {
          const blob = new Blob([res.data], { type: mType });
          let objectURL = URL.createObjectURL(blob);
          setPreviewReq({ sent: true, data: objectURL });
        })
        .catch((err) => console.log(err))
        .finally(() => setLoadingType(false));
    }
  };

  const renderOfficePreview = () => {
    const isFormat = previewFormats.filter((type) => file.ext.toLowerCase().includes(type)).length > 0;
    if (isFormat && file.edit_url) {
      return <iframe src={previewReq.data} title={file.name} frameBorder="0" scrolling="no" />;
    } else {
      return standardPrev;
    }
  };

  const renderFilePreview = () => {
    switch (file.mime_type.split("/")[0]) {
      case "image": {
        return <img src={previewReq.data} alt="filePrieview" />;
      }
      // case 'video': {
      //     return <video controls src={`https://fs2.mh.net.ua${file.preview}`} type={file.mime_type}>
      //         <source src={`https://fs2.mh.net.ua${file.preview}`} type={file.mime_type}/>
      //     </video>
      // }
      // case 'audio': {
      //     return <div className={styles.audioWrap}>
      //         <div className={styles.audioPicWrap}>
      //             <img className={styles.audioPic} src='./assets/PrivateCabinet/file-preview_audio.svg' alt='audio'/>
      //         </div>
      //         <audio controls src={`https://fs2.mh.net.ua${file.preview}`}>
      //             <source src={`https://fs2.mh.net.ua${file.preview}`} type={file.mime_type}/>
      //         </audio>
      //     </div>
      // }
      case "application": {
        return <iframe src={previewReq.data} title={file.name} frameBorder="0" scrolling="no" />;
      }
      default: {
        return standardPrev;
      }
    }
  };

  useEffect(() => {
    if (file.is_preview === 1) getPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PopUp set={set} background={"none"}>
      <div className={styles.preview} onClick={() => set()}>
        {file ? (file.is_preview === 1 ? renderFilePreview() : renderOfficePreview()) : null}
      </div>
    </PopUp>
  );
};

export default PreviewSafeFile;
