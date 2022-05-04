import React, { useState } from "react";

import styles from "./UploadLogo.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
// import api from '../../../../../../api';
// import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { ReactComponent as FileIco } from "../../../../../../assets/BusinessCabinet/file_dowload.svg";
import CropImage from "./CropImage/CropImage";
import classNames from "classnames";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const UploadLogo = ({ nullifyAction, setCompanyLogo, blob, setBlob }) => {
  const { __ } = useLocales();
  // const [response, setResponse] = useState('');
  const [error, setError] = useState(false);
  const [cropParams, setCropParams] = useState(null);
  const [picParams, setPicParams] = useState(null);

  const sendFile = () => {
    if (blob) {
      let form = new FormData();
      form.append("file", blob);
      // TODO: add api
      // api.post('', form)
      //     .then(res => {
      //         if(res.status === 200) {
      //             setResponse(res.data);
      //         } else {
      //             setError(true);
      //         }
      //     })
      //     .catch(err => {
      //         console.log(err);
      //         setError(true);
      //     })
    } else {
      // setError(true);
    }
  };

  const createNewImage = () => {
    if (!blob) return false;
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");
    canvas.width = cropParams.offsetWidth;
    canvas.height = cropParams.offsetHeight;
    const scaleX = picParams.naturalWidth / picParams.width;
    const scaleY = picParams.naturalHeight / picParams.height;
    context.drawImage(
      picParams,
      cropParams.offsetLeft * scaleX,
      cropParams.offsetTop * scaleY,
      canvas.width * scaleX,
      canvas.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );
    const newImageUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const newImage = new Image();
    newImage.src = newImageUrl;
    setCompanyLogo(newImage);

    nullifyAction();
  };

  const onAddFile = (e) => {
    const validateFile = (file) => {
      return file.size < 5252000 && file.type.includes("image/");
    };
    if (validateFile(e.target.files[0])) {
      setError(false);
      setBlob(e.target.files[0]);
    } else {
      setBlob(null);
      setError(true);
    }
  };

  return (
    <PopUp set={nullifyAction}>
      <div className={styles.wrapper}>
        <span className={styles.cross} onClick={nullifyAction} />
        <p className={styles.title}>Логотип компании</p>
        <form onClick={() => setError(false)} className={styles.sendFile}>
          <div className={styles.uploadWrap}>
            <input
              type="file"
              className={styles.inputFile}
              onChange={onAddFile}
              accept=".png,.jpeg,.jpg"
              draggable={false}
            />
            <FileIco />

            <span className={styles.text}>
              Перетащите Файл или Нажмите{" "}
              <span className={styles.download} onClick={sendFile}>
                {__("Загрузить")}
              </span>
            </span>
          </div>
          {error ? (
            <p className={styles.fileError}>
              {__("необходимо загрузить изображение менее 5мб")}
            </p>
          ) : null}
        </form>

        {blob && (
          <CropImage
            setCompanyLogo={setCompanyLogo}
            blob={blob}
            setCropParams={setCropParams}
            setPicParams={setPicParams}
          />
        )}

        <div className={styles.buttonsWrap}>
          <div className={styles.cancel} onClick={nullifyAction}>
            {__("Отмена")}
          </div>
          <div
            className={classNames({
              [styles.action]: true,
              [styles.disableBtn]: !blob,
            })}
            onClick={createNewImage}
          >
            {__("Сохранить")}
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default UploadLogo;

UploadLogo.propTypes = {
  nullifyAction: PropTypes.func,
  setCompanyLogo: PropTypes.func,
  blob: PropTypes.object,
  setBlob: PropTypes.func,
};
