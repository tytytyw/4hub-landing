import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "../UploadFile/UploadFile.module.sass";
import api from "../../../../../../api";
import { onGetCompanyDocument } from "../../../../../../Store/actions/CabinetActions";
import { ReactComponent as CaseIcon } from "../../../../../../assets/BusinessCabinet/case.svg";
import { ReactComponent as MissionIco } from "../../../../../../assets/BusinessCabinet/mission.svg";
import { ReactComponent as VisionIco } from "../../../../../../assets/BusinessCabinet/vision.svg";
import classNames from "classnames";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const UploadFile = ({ pageOption, setBlob, blob, setLoadingType, setPageOption }) => {
  const { __ } = useLocales();
  const id_company = useSelector((state) => state.user.id_company);
  const uid = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const [formatError, setFormatError] = useState(false);

  const renderIcon = () => {
    switch (pageOption.name) {
      case "standards":
        return <CaseIcon />;
      case "mission":
        return <MissionIco />;
      case "viziya":
        return <VisionIco />;
      default:
        return "file";
    }
  };

  const onAddFile = (e) => {
    const validateFile = (file) => {
      return (
        file.name.slice(file.name.lastIndexOf(".")) === ".doc" ||
        file.name.slice(file.name.lastIndexOf(".")) === ".docx"
      );
    };
    if (validateFile(e.target.files[0])) {
      setFormatError(false);
      setBlob(e.target.files[0]);
    } else {
      setBlob(null);
      setFormatError(true);
    }
  };

  const sendFile = () => {
    if (blob) {
      setLoadingType("squarify");
      let file = new FormData();
      file.append("file", blob);
      api
        .post(`/ajax/org_file_upload.php?uid=${uid}&id_company=${id_company}&type=${pageOption.name}`, file)
        .then((res) => (res.data.ok ? dispatch(onGetCompanyDocument(pageOption.name, setLoadingType)) : ""))
        .finally(() => setLoadingType(""));
    }
  };

  return (
    <div className={styles.centeredWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {renderIcon()}
          <p className={styles.title}>{pageOption.label}</p>
        </div>

        <div className={styles.infoBlock}>
          <p className={styles.labelText}>
            {__("Добавьте документ")} {pageOption.label.toLowerCase()}
          </p>
          <div className={styles.uploadBlock}>
            <p onClick={(e) => e.stopPropagation()} className={styles.uploadText}>
              {__("Перетащите сюда файл или")}
              <label htmlFor="Verification-upload"> {__("Загрузите")}</label>
            </p>
            <input onChange={onAddFile} id="Verification-upload" type="file" accept=".doc,.docx" />
          </div>
        </div>
        {formatError ? (
          <p className={styles.fileError}>{__("необходимо загрузить файл с раширением .doc или .docx")}</p>
        ) : null}
        <div className={styles.actionBlock}>
          <button
            onClick={() => {
              setPageOption({ name: "init" });
            }}
            className={styles.cancelBtn}
          >
            {__("Отмена")}
          </button>
          <button
            onClick={sendFile}
            className={classNames({
              [styles.action]: true,
              [styles.disableBtn]: !blob
            })}
          >
            {__("Подтвердить")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;

UploadFile.propTypes = {
  pageOption: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string
  }),
  setBlob: PropTypes.func,
  blob: PropTypes.object,
  setLoadingType: PropTypes.func,
  setPageOption: PropTypes.func
};
