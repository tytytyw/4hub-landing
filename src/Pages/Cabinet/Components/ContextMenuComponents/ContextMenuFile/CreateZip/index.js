import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./CreateZip.module.sass";
import api from "../../../../../../api";
import PopUp from "../../../../../../generalComponents/PopUp";
import InputField from "../../../../../../generalComponents/InputField";
import { colors, useTags } from "../../../../../../generalComponents/collections";
import Error from "../../../../../../generalComponents/Error";
import Colors from "../../../../../../generalComponents/Elements/Colors";
import "../../../../../../generalComponents/colors.sass";
import Signs from "../../../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../../../generalComponents/Elements/Emoji";
import File from "../../../../../../generalComponents/Files";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { onChooseFiles, onGetSafeFileList, onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { useLocation } from "react-router";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { getDepartment } from "generalComponents/generalHelpers";

const CreateZip = ({ setLoadingType, nullifyFilePick }) => {
  const { __ } = useLocales();
  const tags = useTags();
  const { title, items, filesPage } = useSelector((s) => s.Cabinet.modals.contextMenuModals);
  const uid = useSelector((state) => state.user.uid);
  const fileList = useSelector((state) => state.Cabinet.fileList);
  const contextMenuModals = useSelector((s) => s.Cabinet.modals.contextMenuModals);
  const topMessage = useSelector((s) => s.Cabinet.modals.topMessage);
  const [name, setName] = useState(items.length === 1 ? items[0].fname.slice(0, items[0].fname.lastIndexOf(".")) : "");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordCoincide, setPasswordCoincide] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [color, setColor] = useState(colors[0]);
  const [tagOption, setTagOption] = useState({ chosen: "", count: 30 });
  const [sign, setSign] = useState("");
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState(false);
  const [visibility, setVisibility] = useState("password");
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const authorizedSafe = useSelector((state) => state.Cabinet.safe.authorizedSafe);

  const close = () => {
    dispatch(
      onSetModals("contextMenuModals", {
        ...contextMenuModals,
        type: "",
        items: [],
        title: "",
        filesPage: 0
      })
    );
  };

  const onSwitch = (boolean) => setShowRepeat(boolean);

  const renderTags = () => {
    return tags.map((tag, i) => {
      return (
        <div key={i} onClick={() => onChangeTag(tag)}>
          {tag}
        </div>
      );
    });
  };

  const onAddFileToZip = () => {
    const data = {
      uid,
      dir: pathname === "/safe" ? "" : fileList.path,
      zip_name: name ? name : "",
      tag: tagOption.chosen ? tagOption.chosen : "",
      pass: password && passwordCoincide ? password : "",
      color: color.color,
      emoji: emoji ? emoji : "",
      symbol: sign ? sign : "",
      fids: items.length === 1 ? [items[0].fid] : items,
      dep: getDepartment()
    };
    if (pathname === "/safe") data.id_safe = authorizedSafe.id_safe;

    setLoadingType("squarify");

    api
      .post(`/ajax/${pathname === "/safe" ? "safe_" : ""}file_zip.php`, data)
      .then(() => {
        dispatch(
          pathname === "/safe"
            ? onGetSafeFileList(
                authorizedSafe.code,
                authorizedSafe.id_safe,
                authorizedSafe.password,
                "",
                "",
                setLoadingType,
                "",
                filesPage,
                ""
              )
            : onChooseFiles(fileList.path)
        );
        dispatch(
          onSetModals("topMessage", {
            ...topMessage,
            open: true,
            type: "message",
            message: __("Выбранные файлы успешно сжато в Zip")
          })
        );
        onCancel();
      })
      .catch(() => setError(true))
      .finally(() => setLoadingType());
  };

  const onChangeTag = (chosen) => {
    const count = 30 - chosen.length;
    if (count >= 0) setTagOption({ ...tagOption, chosen, count });
  };

  const comparePass = (val) => {
    const pass = password.split("");
    const passRepeat = val.split("");
    let boolean = true;
    passRepeat.forEach((el, i) => {
      if (el !== pass[i]) boolean = false;
    });
    setPasswordCoincide(boolean);
  };

  const getName = (val) => {
    const i = val.lastIndexOf(".");
    return {
      name: val.substring(0, i),
      format: val.substring(i + 1)
    };
  };

  const onCancel = () => {
    nullifyFilePick();
    close();
  };

  return (
    <div style={{ display: `block` }}>
      <PopUp set={onCancel}>
        <div className={styles.createWrap}>
          <span className={styles.cross} onClick={close} />
          <span className={styles.title}>{title}</span>
          <div className={styles.fileIconWrap}>
            <div className={`${styles.fileWrap}`}>
              <div className={styles.file}>
                <File color={color.light} format="ZIP" />
              </div>
            </div>
            <div className={styles.picPreview}>
              <div className={styles.name}>{items.length === 1 ? getName(items[0].fname).name : ""}</div>
              <div className={styles.fileOptions}>
                {tagOption.chosen && (
                  <div
                    className={`${styles.minitagWrap} ${styles.redCross}`}
                    onClick={() => setTagOption({ ...tagOption, chosen: "" })}
                  >
                    <div className={`${styles.minitag}`}>#{tagOption.chosen}</div>
                  </div>
                )}
                <div
                  className={`${styles.colorWrap} ${color.color !== "grey" ? styles.colorWrapTap : ""} ${
                    color.color !== "grey" ? styles.redCross : ""
                  }`}
                  onClick={() => setColor(colors[0])}
                >
                  <div
                    className={styles.circle}
                    style={{
                      background: color.light,
                      border: `1px solid ${color.dark}`
                    }}
                  />
                </div>
                {/*<div className={styles.circle} style={{background: color.light, border: `1px solid ${color.dark}`}} />*/}
                {sign && (
                  <div className={styles.redCross} onClick={() => setSign("")}>
                    <img src={`${imageSrc}assets/PrivateCabinet/signs/${sign}.svg`} alt="emoji" />
                  </div>
                )}
                {emoji && (
                  <div className={styles.redCross} onClick={() => setEmoji("")}>
                    <img src={`${imageSrc}assets/PrivateCabinet/smiles/${emoji}.svg`} alt="emoji" />
                  </div>
                )}
                {passwordCoincide && password.length === passwordRepeat.length && showRepeat && (
                  <img className={styles.lock} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt="lock" />
                )}
              </div>
            </div>
          </div>
          <div className={styles.inputFieldsWrap}>
            <div className={styles.inputWrap}>
              <InputField model="text" value={name} set={setName} placeholder={__("Имя файла")} />
            </div>
            <div className={styles.tagPicker}>
              <span>#</span>
              <input
                className={styles.inputField}
                type="text"
                placeholder={__("Добавьте #Тег")}
                value={tagOption.chosen}
                onChange={(e) => onChangeTag(e.target.value)}
                onFocus={() => {
                  setTagOption({ ...tagOption, show: true });
                }}
              />
              <span>{tagOption.count}/30</span>
              <div className={styles.tagList}>{renderTags()}</div>
            </div>
            <div className={styles.inputWrap}>
              <InputField
                model="password"
                switcher={true}
                isPass={showRepeat}
                value={password}
                set={setPassword}
                placeholder={__("Пароль")}
                onSwitch={onSwitch}
                visibility={visibility}
                setVisibility={setVisibility}
                disabled={!showRepeat}
              />
            </div>
            {showRepeat && (
              <div className={styles.inputWrap}>
                <InputField
                  model="password"
                  switcher={false}
                  value={passwordRepeat}
                  set={setPasswordRepeat}
                  placeholder={__("Повторите пароль")}
                  visibility={visibility}
                  setVisibility={setVisibility}
                  comparePass={comparePass}
                  mistake={!passwordCoincide}
                />
              </div>
            )}
          </div>
          <Colors color={color} setColor={setColor} />
          <Signs sign={sign} setSign={setSign} />
          <Emoji emoji={emoji} setEmoji={setEmoji} />
          <div className={styles.buttonsWrap}>
            <div className={styles.cancel} onClick={onCancel}>
              {__("Отмена")}
            </div>
            <div className={`${styles.add}`} onClick={onAddFileToZip}>
              {__("Добавить")}
            </div>
          </div>
        </div>
      </PopUp>
      {error && <Error error={error} set={close} message={__("Файл не удалось сжать в ZIP архив")} />}
    </div>
  );
};

export default CreateZip;

CreateZip.propTypes = {
  nullifyFilePick: PropTypes.func,
  setLoadingType: PropTypes.func
};
CreateZip.defaultProps = {
  setLoadingType: () => {},
  nullifyFilePick: () => {}
};
