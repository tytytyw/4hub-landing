import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Share.module.sass";
import api from "../../../../../../api";
import PopUp from "../../../../../../generalComponents/PopUp";
import Error from "../../../../../../generalComponents/Error";
import StoragePeriod from "../StoragePeriod/StoragePeriod";
import ShareToMessengers from "../ShareToMessengers/ShareToMessengers";
import SetPassword from "../SetPassword/SetPassword";
import { ReactComponent as Password } from "../../../../../../assets/PrivateCabinet/password.svg";
import { ReactComponent as Calendar } from "../../../../../../assets/PrivateCabinet/calendar-6.svg";
import FileInfo from "../../../../../../generalComponents/FileInfo/FileInfo";
import { arrayForPhpRequest } from "../../../../../../generalComponents/generalHelpers";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { fileProps } from "../../../../../../types/WorkElements";

function Share({ files, action_type, setShowSuccessMessage, setLoadingType }) {
  const { __ } = useLocales();
  const [error, setError] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [displayStotagePeriod, setDisplayStotagePeriod] = useState(false);
  const [displaySetPassword, setDisplaySetPassword] = useState(false);
  const [displayMessengers, setDisplayMessengers] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState({
    hours: "",
    minutes: "",
    seconds: ""
  });
  const [password, setPassword] = useState("");
  const uid = useSelector(state => state.user.uid);
  const share = useSelector(state => state.Cabinet.modals.share);
  const file = useSelector(state => state.Cabinet.modals.share.file);

  const dispatch = useDispatch();
  const [data, setData] = useState({
    uid,
    fids:
      file?.is_dir || !!file?.folders
        ? ""
        : files?.length
        ? [...files]
        : file
        ? [file?.fid]
        : share.fids,
    user_to: "",
    prim: "",
    deadline: "",
    pass: "",
    is_write: 0
  });
  const setTime = (time, limit) => {
    return time < limit ? (time < 10 ? `0${time}` : time) : time[0];
  };

  const close = () => {
    dispatch(
      onSetModals("share", { open: false, fids: [], action_type: "", file: {} })
    );
  };

  useEffect(() => {
    setData(data => ({
      ...data,
      deadline: dateValue
        ? `${dateValue} ${
            timeValue.hours ? setTime(timeValue.hours, 24) : "23"
          }:${timeValue.minutes ? setTime(timeValue.minutes, 60) : "59"}`
        : ""
    }));
  }, [dateValue, timeValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setData(data => ({ ...data, pass: password }));
  }, [password]); // eslint-disable-line react-hooks/exhaustive-deps

  const onShareFile = () => {
    setLoadingType
      ? setLoadingType("squarify")
      : dispatch(onSetModals("loader", true));
    const newData =
      action_type === "dir_access_add"
        ? `uid=${data.uid}&email=${data.user_to}&deadline=${
            data.deadline
          }&is_read=${data?.is_write}&pass=${data.pass}&dir=${
            file?.is_dir || file?.folders ? file.path : ""
          }&prim=${data.prim}`
        : `uid=${data.uid}&user_to=${data.user_to}&deadline=${
            data.deadline
          }${arrayForPhpRequest("fids", data.fids)}&is_write=${
            data?.is_write
          }&pass=${data.pass}&prim=${data.prim}`;
    api
      .post(`/ajax/${action_type || share.action_type}.php?${newData}`)
      .then(res => {
        let isBool = !!res.data.ok;
        if (isBool) {
          setShowSuccessMessage
            ? setShowSuccessMessage(__("Отправлено"))
            : dispatch(
                onSetModals("success", {
                  open: true,
                  message: __("Отправка прошла успешно")
                })
              );
          closeModal();
        } else if (res.data.error) {
          setError(
            res.data.error === "user_to not found"
              ? __("Пользователь не найден")
              : res.data.error
          );
        } else {
          setError(__("Что-то пошло не так. Повторите попытку позже"));
        }
      })
      .catch(err => {
        setError(`${err}`);
      })
      .finally(() =>
        setLoadingType
          ? setLoadingType("squarify")
          : dispatch(onSetModals("loader", false))
      );
  };

  const closeModal = () => {
    close
      ? close()
      : dispatch(
          onSetModals("share", {
            ...share,
            open: false,
            fids: [],
            fid: undefined,
            action_type: ""
          })
        );
  };

  return (
    <PopUp set={closeModal}>
      {!displayStotagePeriod && !displayMessengers && !displaySetPassword && (
        <div className={styles.ShareFile_wrap}>
          <div className={classNames(styles.header, styles.border_bottom)}>
            <FileInfo
              file={
                data?.fids?.length > 1
                  ? { ext: "FILES", count: data.fids.length }
                  : file
              }
            />
            <div className={styles.buttons_wrap}>
              <div className={styles.close_wrap} onClick={close}>
                <span className={styles.close} />
              </div>
            </div>
          </div>
          <div className={styles.border} />
          <div className={classNames(styles.recipient, styles.border_bottom)}>
            <p className={styles.recipient_title}>{__("Кому:")}</p>
            <div className={styles.recipient_mail}>
              <input
                className={emptyField ? styles.empty : ""}
                onClick={() => setEmptyField(false)}
                onChange={e =>
                  setData(data => ({ ...data, user_to: e.target.value }))
                }
                value={data.user_to}
                placeholder={__("Эл.адрес или имя")}
                type="text"
              />
            </div>
            <div className={styles.recipient_messenger}>
              <span onClick={() => setDisplayMessengers(true)}>
                {__("Отправить через мессенджер")}
              </span>
            </div>
          </div>
          <div className={styles.border} />
          <div className={classNames(styles.comment, styles.border_bottom)}>
            <textarea
              onChange={e =>
                setData(data => ({ ...data, prim: e.target.value }))
              }
              value={data.prim}
              placeholder={__("Добавить комментарий к файлу")}
              type="text"
            />
            <div className={styles.border} />
          </div>
          <div className={classNames(styles.row_item, styles.border_bottom)}>
            <div className={styles.ico_wrap}>
              <Password className={styles.row_ico} />
            </div>
            <div className={styles.input_wrap}>
              <p className={styles.input_title}>Пароль</p>
              <input
                id={"input_pass"}
                value={__("Вы можете установить пароль на данный файл")}
                type="button"
              />
            </div>
            <span
              onClick={() => setDisplaySetPassword(true)}
              className={styles.set_btn}>
              {__("Установить")}
            </span>
          </div>
          <div className={styles.border} />
          <div className={classNames(styles.row_item, styles.border_bottom)}>
            <div className={styles.ico_wrap}>
              <Calendar className={styles.row_ico} />
            </div>
            <div className={styles.input_wrap}>
              <p className={styles.input_title}>
                {__("Срок хранения файла/папки")}
              </p>
              <input
                value={__(
                  "Установите срок хранения файла (после завершения файл будет удален)"
                )}
                type="button"></input>
            </div>
            <span
              onClick={() => setDisplayStotagePeriod(true)}
              className={styles.set_btn}>
              {__("Установить")}
            </span>
          </div>
          <div className={styles.buttonsWrap}>
            <div className={styles.cancel} onClick={closeModal}>
              {__("Отмена")}
            </div>
            <div
              className={styles.add}
              onClick={() => {
                data.user_to ? onShareFile() : setEmptyField(true);
              }}>
              {__("Отправить")}
            </div>
          </div>
        </div>
      )}
      {error && <Error error={error} set={closeModal} message={error} />}
      {displayStotagePeriod && (
        <StoragePeriod
          file={
            data.fids.length > 1
              ? { ext: "FILES", count: data.fids.length }
              : file
          }
          setDisplayStotagePeriod={setDisplayStotagePeriod}
          dateValue={dateValue}
          setDateValue={setDateValue}
          timeValue={timeValue}
          setTimeValue={setTimeValue}
        />
      )}
      {displayMessengers && (
        <ShareToMessengers
          setDisplayMessengers={setDisplayMessengers}
          close={closeModal}
          fid={file.fid}
          file={
            data.fids.length > 1
              ? { ext: "FILES", count: data.fids.length }
              : file
          }
          data={data}
        />
      )}
      {displaySetPassword && (
        <SetPassword
          file={
            data.fids.length > 1
              ? { ext: "FILES", count: data.fids.length }
              : file
          }
          setDisplaySetPassword={setDisplaySetPassword}
          password={password}
          setPassword={setPassword}
        />
      )}
    </PopUp>
  );
}

export default Share;

Share.propTypes = {
  files: fileProps,
  action_type: PropTypes.string,
  setShowSuccessMessage: PropTypes.func,
  setLoadingType: PropTypes.func
};
