import React, { useState } from "react";
import styles from "./SharedFilesInfo.module.sass";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import classnames from "classnames";
import { ReactComponent as UserIcon } from "../../../../../../assets/PrivateCabinet/userIcon.svg";
import { diffDays } from "@fullcalendar/react";

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

  //TODO - Need to replace with real data
  const isEdited = file.user_name !== "tytyty2@";

  const compareDates = endDate => {
    const today = new Date();
    if (endDate.getTime() - today.getTime() < 0) {
      return __("Бессрочно");
    }
    return __(`Осталось (${diffDays(today, endDate).toFixed()} дней)`);
  };

  const renderFileAccessRights = () => (
    <div
      className={styles.reviewOptions}
      onMouseLeave={() => setContext(CONTEXT.EMPTY)}
    >
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
    <>
      <div
        className={classnames({
          [styles.review]: true,
          [styles.chosen]: isChosen
        })}
        onClick={() => {
          if (isEdited) {
            setContext(s =>
              s === CONTEXT.EMPTY
                ? CONTEXT.CHANGE_FILE_ACCESS_RIGHTS
                : CONTEXT.EMPTY
            );
          }
        }}
      >
        <span>{accessRights.text}</span>
        {isEdited ? (
          <img
            src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
            alt="copy"
            className={
              context === CONTEXT.CHANGE_FILE_ACCESS_RIGHTS
                ? styles.imageReverse
                : ""
            }
          />
        ) : null}
        {context === CONTEXT.CHANGE_FILE_ACCESS_RIGHTS
          ? renderFileAccessRights()
          : null}
      </div>
      {isEdited ? null : file.user_icon[0] ? (
        <img src={file.user_icon[0]} />
      ) : (
        <UserIcon title={file.user_name} />
      )}
      <div className={styles.endTime}>
        {__(`Срок пользования: ${compareDates(new Date(file.deadline))}`)}
      </div>
    </>
  );
}

export default SharedFilesInfo;
