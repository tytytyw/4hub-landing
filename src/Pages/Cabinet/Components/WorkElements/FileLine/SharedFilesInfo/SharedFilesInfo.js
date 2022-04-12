import React, { useState } from "react";
import styles from "./SharedFilesInfo.module.sass";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import classnames from "classnames";

const useAccessRightsConst = () => {
  const { __ } = useLocales();
  return {
    WATCH: __("Просмотр"),
    DOWNLOAD: __("Скачивание"),
    EDIT: __("Редактировать")
  };
};

const CONTEXT = {
  EMPTY: "",
  CHANGE_FILE_ACCESS_RIGHTS: "CHANGE_FILE_ACCESS_RIGHTS"
};

function SharedFilesInfo({ file, isChosen }) {
  const { __ } = useLocales();
  const ACCESS_RIGHTS = useAccessRightsConst();

  const [context, setContext] = useState(CONTEXT.EMPTY);
  const [accessRights, setAccessRights] = useState({
    text: ACCESS_RIGHTS.WATCH
  });

  const renderFileAccessRights = () => (
    <div className={styles.reviewOptions}>
      <div
        className={styles.reviewOption}
        onClick={() => {
          setAccessRights(s => ({ ...s, text: ACCESS_RIGHTS.WATCH }));
          //getLink("watch");
        }}
      >
        <div
          className={`${styles.radio} ${
            accessRights.text === ACCESS_RIGHTS.WATCH ? styles.radioChosen : ""
          }`}
        />
        <div className={styles.description}>{ACCESS_RIGHTS.WATCH}</div>
      </div>
      <div
        className={styles.reviewOption}
        onClick={() => {
          setAccessRights(s => ({ ...s, text: ACCESS_RIGHTS.DOWNLOAD }));
          // getLink("download");
        }}
      >
        <div
          className={`${styles.radio} ${
            accessRights.text === ACCESS_RIGHTS.DOWNLOAD
              ? styles.radioChosen
              : ""
          }`}
        />
        <div>Скачивание</div>
      </div>
      <div
        className={`${styles.reviewOption} ${styles.reviewOptionLast}`}
        onClick={() => {
          setAccessRights(s => ({ ...s, text: ACCESS_RIGHTS.EDIT }));
          // getLink("write");
        }}
      >
        <div
          className={`${styles.radio} ${
            accessRights.text === ACCESS_RIGHTS.EDIT ? styles.radioChosen : ""
          }`}
        />
        <div>{ACCESS_RIGHTS.EDIT}</div>
      </div>
      <span className={styles.descr}>
        {__("Может упорядочивать, добавлять и редактировать файл")}
      </span>
    </div>
  );

  return (
    <div
      className={classnames({
        [styles.review]: true,
        [styles.chosen]: isChosen
      })}
      onClick={() => setContext(CONTEXT.CHANGE_FILE_ACCESS_RIGHTS)}
    >
      <span>{accessRights.text}</span>
      <img
        src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
        alt="copy"
        className={
          context === CONTEXT.CHANGE_FILE_ACCESS_RIGHTS
            ? styles.imageReverse
            : ""
        }
      />
      {context === CONTEXT.CHANGE_FILE_ACCESS_RIGHTS
        ? renderFileAccessRights()
        : null}
    </div>
  );
}

export default SharedFilesInfo;
