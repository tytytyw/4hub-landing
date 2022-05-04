import React, { useEffect, useState } from "react";
import { getDate } from "../../../../generalComponents/CalendarHelper";
import api from "../../../../api";
import styles from "./DownloadFolder.module.sass";
import { ReactComponent as DownloadIcon } from "../../../../assets/StartPage/down-arrow.svg";
import { ReactComponent as FolderIcon } from "../../../../assets/PrivateCabinet/folder-2.svg";
import Error from "../../../../generalComponents/Error";
import Loader from "../../../../generalComponents/Loaders/4HUB";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const DownloadFolder = ({ setPage, setOptions, loader, setLoader }) => {
  const { __ } = useLocales();
  console.log("sss");
  const emptyFolder = {
    name: "No folder",
    size: 0,
    is_pass: 0,
    deadline: "2022-09-06 19:38:00",
  };

  const [error, setError] = useState(false);
  const [folder, setFolder] = useState();
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState("password");
  const folderId = window.location.search.split("did=")[1];

  const countLeftDays = () => {
    const d1 = new Date(
      Object.values(getDate(0)).reverse().join("-") + " 00:00:00"
    );
    const d2 = new Date(folder.deadline);
    const days = (d2 - d1) / 86400000;
    const last = days.toFixed().toString()[days.toString().length - 1];
    if (last === "1") return `${days.toFixed()} день`;
    if (last === "2" || last === "3" || last === "4")
      return `${days.toFixed()} дня`;
    return `${days.toFixed()} дней`;
  };

  const showTime = () => {
    const date = folder.deadline.split(" ")[0].split("-").reverse().join(".");
    const time = folder.deadline.split(" ")[1];
    return time === "00:00:00"
      ? `${date} 23:59`
      : `${date} ${time.slice(0, 5)}`;
  };

  const setSize = () => {
    let size = folder.size;
    if (size / 1000000000 > 1) size = `${(size / 1000000000).toFixed(2)} GB`;
    if (size / 1000000 > 1) size = `${(size / 1000000).toFixed(2)} MB`;
    if (size / 1000 > 1) size = `${(size / 1000).toFixed(2)} KB`;
    return size;
  };

  useEffect(() => {
    setLoader(true);
    api
      .post(`/ajax/dir_share_download.php?did=${folderId}`)
      .then((res) => {
        setLoader(false);
        if (res.status === 200 && !res.data?.errors) {
          setFolder({ ...emptyFolder, ...res.data }); // TODO - Need to delete emptyFolder after server added size && date
        } else {
          setError(true);
          setFolder(emptyFolder);
          setTimeout(() => {
            setError(false);
          }, 5000);
        }
      })
      .catch(() => {
        setLoader(false);
        setError(true);
        setFolder(emptyFolder);
      });
    // return () => window.history.pushState('', '', "/");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const switchToGuestCabinet = () => {
    setOptions((state) => ({ ...state, guest: !state.guest }));
  };

  return (
    <>
      {folder && (
        <form className={styles.main} name="fdownload">
          <img
            className={styles.hubIcon}
            src={imageSrc + "assets/StartPage/4HUB.svg"}
            alt="4HUB"
            onClick={() => setPage("init")}
          />
          {folder && (
            <>
              <div className={styles.downloadWrapFile}>
                <FolderIcon className={styles.folder} />
                <div className={styles.fileName}>{folder.name}</div>
                <div className={styles.fileSize}>{setSize()}</div>
              </div>
              {folder.name !== "No folder" ? (
                <a href={`${folder.zip}`} download={true}>
                  <DownloadIcon
                    className={styles.download}
                    onClick={() => document.downloadFile.submit()}
                  />
                </a>
              ) : null}
              {folder.name !== "No folder" && (
                <h2>
                  {__("Скачать папку")} «{folder.name}»
                </h2>
              )}
              {folder.is_pass === 1 && (
                <div className={styles.passwordWrap}>
                  <input
                    type={visibility}
                    className={styles.password}
                    name="pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={__("Введите пароль указанный на почте")}
                  />
                  {visibility === "password" && (
                    <img
                      src={imageSrc + "assets/StartPage/invisible.svg"}
                      alt="eye"
                      className={styles.invisible}
                      onClick={() => setVisibility("text")}
                    />
                  )}
                  {visibility === "text" && (
                    <img
                      src={imageSrc + "assets/StartPage/eye.svg"}
                      alt="eye"
                      className={styles.eye}
                      onClick={() => setVisibility("password")}
                    />
                  )}
                </div>
              )}
              {folder.name !== "No folder" ? (
                <span className={styles.term}>
                  {__("Срок хранения папки")} ( {countLeftDays()} до{" "}
                  {showTime()})
                </span>
              ) : null}
              {folder.name !== "No folder" ? (
                <div
                  className={styles.guestButton}
                  onClick={switchToGuestCabinet}
                >
                  {__("Посмотреть в гостевом режиме")}
                </div>
              ) : null}
            </>
          )}
        </form>
      )}
      {error && (
        <Error
          error={error}
          set={setError}
          message={__("Упс... Такая папка не найдена")}
        />
      )}
      {loader ? (
        <>
          <span>{__("Идет процесс созадния ZIP архива")}</span>
          <Loader
            type="bounceDots"
            position="absolute"
            background="rgba(0, 0, 0, 0)"
            zIndex={5}
            containerType="bounceDots"
          />
        </>
      ) : null}
    </>
  );
};

export default DownloadFolder;

DownloadFolder.propTypes = {
  setPage: PropTypes.func,
  setOptions: PropTypes.func,
  loader: PropTypes.bool,
  setLoader: PropTypes.func,
};
