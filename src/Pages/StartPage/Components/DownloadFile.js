import React, { useState, useEffect } from "react";

import styles from "./DownloadFile.module.sass";
import File from "../../../generalComponents/Files";
import api from "../../../api";
import { getDate } from "../../../generalComponents/CalendarHelper";
import { ReactComponent as DownloadIcon } from "../../../assets/StartPage/down-arrow.svg";
import Error from "../../../generalComponents/Error";
import { imageSrc } from "../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const DownloadFile = ({ setPage }) => {
  const { __ } = useLocales();
  const emptyFile = {
    name: "No file",
    size: 0,
    is_pass: 0,
    deadline: ""
  };

  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState("password");
  const FileId = window.location.search.split("fid=")[1];

  const setFormat = () => {
    const arr = file.name.split(".");
    return arr[arr.length - 1];
  };

  const setSize = () => {
    let size = file.size;
    if (size / 1000000000 > 1) size = `${(size / 1000000000).toFixed(2)} GB`;
    if (size / 1000000 > 1) size = `${(size / 1000000).toFixed(2)} MB`;
    if (size / 1000 > 1) size = `${(size / 1000).toFixed(2)} KB`;
    return size;
  };

  const countLeftDays = () => {
    const d1 = new Date(
      Object.values(getDate(0))
        .reverse()
        .join("-") + " 00:00:00"
    );
    const d2 = new Date(file.deadline);
    const days = (d2 - d1) / 86400000;
    const last = days.toFixed().toString()[days.toString().length - 1];
    if (last === "1") return `${days.toFixed()} день`;
    if (last === "2" || last === "3" || last === "4") return `${days.toFixed()} дня`;
    return `${days.toFixed()} ${__("дней")}`;
  };

  const showTime = () => {
    const date = file.deadline
      .split(" ")[0]
      .split("-")
      .reverse()
      .join(".");
    const time = file.deadline.split(" ")[1];
    return time === "00:00:00" ? `${date} 23:59` : `${date} ${time.slice(0, 5)}`;
  };

  useEffect(() => {
    api
      .post(`/ajax/download_start.php?fid=${FileId}&info`)
      .then((res) => {
        if (res.status === 200 && typeof res.data === "object") {
          setFile(res.data);
        } else {
          setError(true);
          setFile(emptyFile);
          setTimeout(() => {
            setError(false);
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setFile(emptyFile);
      });
    return () => window.history.pushState("", "", "/");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {file && (
        <form className={styles.main} name="fdownload" action="/ajax/download_start.php" method="post">
          <img
            className={styles.hubIcon}
            src={imageSrc + "assets/StartPage/4HUB.svg"}
            alt="4HUB"
            onClick={() => setPage("init")}
          />
          {file && (
            <>
              <div className={styles.downloadWrapFile}>
                <div className={styles.fileWrap}>
                  <File format={setFormat().toLowerCase()} />
                </div>
                <div className={styles.fileName}>{file.name}</div>
                <div className={styles.fileSize}>{setSize()}</div>
              </div>
              {file.name !== "No file" && (
                <DownloadIcon className={styles.download} onClick={() => document.fdownload.submit()} />
              )}
              {file.name !== "No file" && <h2>Скачать файл «{file.name}»</h2>}
              <input style={{ display: "none" }} name="fid" value={FileId} readOnly />
              {file.is_pass === 1 && (
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
              {file.name !== "No file" && (
                <span className={styles.term}>
                  Срок хранения файла ( {countLeftDays()} до {showTime()})
                </span>
              )}
            </>
          )}
        </form>
      )}
      {error && <Error error={error} set={setError} message={__("Упс... Такой файл не найден")} />}
    </>
  );
};

export default DownloadFile;

DownloadFile.propTypes = {
  setPage: PropTypes.func
};
