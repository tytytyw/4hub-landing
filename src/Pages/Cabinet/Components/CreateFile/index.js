import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./CreateFile.module.sass";
import api from "../../../../api";
import PopUp from "../../../../generalComponents/PopUp";
import InputField from "../../../../generalComponents/InputField";
import SelectFolder from "../../../../generalComponents/SelectFolder/SelectFolder";
import { colors, useTags } from "../../../../generalComponents/collections";
import Error from "../../../../generalComponents/Error";
import Colors from "../../../../generalComponents/Elements/Colors";
import "../../../../generalComponents/colors.sass";
import Signs from "../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../generalComponents/Elements/Emoji";
import File from "../../../../generalComponents/Files";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import { onAddRecentFiles, onChooseFiles, onCustomizeFile } from "../../../../Store/actions/CabinetActions";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { blobProps, createFilesProps } from "../../../../types/CreateFile";
import { chosenFolderProps } from "../../../../types/CreateFolder";
import { loadingFileProps } from "../../../../types/LoadingFiles";

const CreateFile = ({
  title,
  loaded,
  setLoaded,
  blob,
  setBlob,
  onToggleSafePassword,
  setAwaitingFiles,
  awaitingFiles,
  loadingFile,
  fileErrors,
  setLoadingFile,
  create,
  setGLoader,
  menuItem,
  initFolder,
  showChoiceFolders,
  info
}) => {
  const { __ } = useLocales();
  const tags = useTags();
  const uid = useSelector((state) => state.user.uid);
  const fileList = useSelector((state) => state.Cabinet.fileList);
  const search = useSelector((state) => state.Cabinet.search);
  const [name, setName] = useState(
    blob?.options?.name
      ? blob.options.name.slice(0, blob.options.name.lastIndexOf("."))
      : blob.file.name.slice(0, blob.file.name.lastIndexOf("."))
  );
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordCoincide, setPasswordCoincide] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [color, setColor] = useState(
    blob?.options?.color ? colors.find((c) => c.color === blob.options.color) : colors[0]
  );
  const [tagOption, setTagOption] = useState({
    chosen: blob?.options?.tag ? blob.options.tag : "",
    count: 30
  });
  const [sign, setSign] = useState(blob?.options?.symbol ? blob.options.symbol : "");
  const [emoji, setEmoji] = useState(blob?.options?.emoji ? blob.options.emoji : "");
  const [error, setError] = useState(false);
  const [visibility, setVisibility] = useState("password");
  const dispatch = useDispatch();
  const [isSafe, setIsSafe] = useState(false);
  const [path, setPath] = useState(fileList?.path);

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

  const onAddFile = (open) => {
    let options = {
      name: `${name}.${getName(blob?.options?.name ? blob.options.name : blob.file.name).format}`,
      tag: tagOption.chosen,
      pass: passwordCoincide ? password : "",
      color: color.color,
      symbol: sign,
      emoji: emoji,
      destination: menuItem,
      dir: menuItem === "myFolders" || menuItem === "myFiles" ? (path ? path : "global/all") : info?.dir ?? ""
    };
    if (menuItem === "project") options["id_project"] = info.id;

    if (blob.file.fid) {
      if (password !== passwordRepeat) return setPasswordCoincide(false);

      const data = {
        uid,
        fids: [blob.file.fid],
        fName: options.name,
        tag: options.tag,
        pass: options.password,
        color: options.color,
        symbol: options.symbol,
        emoji: options.emoji
      };

      const newFile = {
        ...blob.file,
        name: options.name,
        tag: options.tag,
        color: options.color,
        emo: options.emoji,
        fig: options.symbol,
        is_pass: options.password ? 1 : 0,
        ext: options.name.slice(options.name.lastIndexOf("."))
      };
      api
        .post(`/ajax/${menuItem === "Safe" ? "safe_" : ""}file_edit.php`, data)
        .then((res) => {
          if (res.data.ok === 1) {
            dispatch(onCustomizeFile(newFile));
            dispatch(onAddRecentFiles());
            let files = loaded.map((el) => (el.file.fid === newFile.fid ? { file: newFile, options } : el));
            setLoaded(files);
          } else {
            setError(true);
          }
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => closeComponent());
    } else if (create) {
      const url = `/ajax/file_new.php/?uid=${uid}&fileName=${options.name.slice(
        0,
        options.name.lastIndexOf(".")
      )}&dir=${fileList.path}&tag=${options.tag}&pass=${options.pass}&color=${options.color}&symbol=${
        options.symbol
      }&emoji=${options.emoji}&ext=${options.name.slice(options.name.lastIndexOf(".") + 1)}`;
      api
        .post(url)
        .then((res) => {
          if (res.data.ok === 1) {
            if (open === true) window.open(res.data.edit_url);
            dispatch(onChooseFiles(fileList.path, search, 1, "", setGLoader));
          } else {
            setError(true);
          }
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => closeComponent());
    } else {
      if (loadingFile.length > 0) {
        setAwaitingFiles([...awaitingFiles, { ...blob, options }]);
      } else {
        setLoadingFile([{ ...blob, options }]);
      }
      if (loadingFile.length > 0 || loaded.length > 0 || fileErrors.length > 0) closeComponent();
    }
  };

  const closeComponent = () => {
    setBlob({ ...blob, file: null, show: false });
    setError(false);
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

  const onCloseTab = () => setBlob({ ...blob, file: null, show: false });

  const getName = (val) => {
    const i = val.lastIndexOf(".");
    return {
      name: val.substring(0, i),
      format: val.substring(i + 1)
    };
  };

  const setSize = () => {
    let size = blob.file?.size;
    if (size / 1000000000 > 1) size = `${(size / 1000000000).toFixed(2)} GB`;
    if (size / 1000000 > 1) size = `${(size / 1000000).toFixed(2)} MB`;
    if (size / 1000 > 1) size = `${(size / 1000).toFixed(2)} KB`;
    return `${size} KB`;
  };

  // AutoHide .tagList after file is chosen
  const tagRef = useRef(null);
  const handleChoose = () => {
    tagRef.current.style.display = "none";
    setTimeout(() => {
      tagRef.current.style.display = "";
    }, 0);
  };
  return (
    <div style={{ display: `block` }}>
      <PopUp set={onCloseTab}>
        <div className={styles.createFolderWrap}>
          <span className={styles.cross} onClick={() => setBlob({ ...blob, file: null, show: false })} />
          <span className={`${create ? styles.titleCreate : styles.title}`}>{title}</span>
          <div className={styles.fileIconWrap}>
            <div className={`${styles.fileWrap}`}>
              <div className={styles.file}>
                <File
                  color={color.light}
                  format={getName(blob?.options?.name ? blob.options.name : blob.file.name).format}
                />
              </div>
            </div>
            <div className={styles.picPreview}>
              <div className={styles.format}>
                {getName(blob?.options?.name ? blob.options.name : blob.file.name).format} {setSize()}
              </div>
              <div className={styles.name}>
                {getName(blob?.options?.name ? blob.options.name : blob.file.name).name}
              </div>
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
                  className={`${styles.colorWrap} ${color.color !== "grey" ? styles.colorWrapTap : undefined} ${
                    styles.redCross
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
                {sign && (
                  <div className={`${styles.signWrap} ${styles.redCross}`} onClick={() => setSign("")}>
                    <img src={`${imageSrc}assets/PrivateCabinet/signs/${sign}.svg`} alt="emoji" />
                  </div>
                )}
                {emoji && (
                  <div className={`${styles.signWrap} ${styles.redCross}`} onClick={() => setEmoji("")}>
                    <img src={`${imageSrc}assets/PrivateCabinet/smiles/${emoji}.svg`} alt="emoji" />
                  </div>
                )}
                {passwordCoincide && password.length === passwordRepeat.length && showRepeat && password.length > 0 && (
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
              <div className={styles.tagList} ref={tagRef} onClick={handleChoose}>
                {renderTags()}
              </div>
            </div>
            {showChoiceFolders && (
              <div className={styles.inputWrap}>
                <SelectFolder className={styles.select} path={path} setPath={setPath} initFolder={initFolder} />
              </div>
            )}
            <div className={styles.inputWrap}>
              <InputField
                model="password"
                switcher={true}
                value={password}
                set={setPassword}
                placeholder={__("Пароль")}
                onSwitch={onSwitch}
                isPass={showRepeat}
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
                  placeholder="Повторите пароль"
                  visibility={visibility}
                  setVisibility={setVisibility}
                  comparePass={comparePass}
                  mistake={!passwordCoincide}
                />
              </div>
            )}
          </div>
          <div className={styles.safeWrap}>
            <div className={styles.safe}>
              <div
                onClick={() => {
                  setIsSafe(!isSafe);
                  onToggleSafePassword(!isSafe);
                }}
              >
                {isSafe && <img src={`${imageSrc}assets/PrivateCabinet/tick-green.svg`} alt="tick" />}
              </div>
            </div>
            <div className={styles.safeText}>{__("Сохранить пароль во вкладку сейф с паролями")}</div>
          </div>
          <Colors title="Выберите цвет файла" color={color} setColor={setColor} />
          <Signs sign={sign} setSign={setSign} />
          <Emoji emoji={emoji} setEmoji={setEmoji} editableClass={create ? "create" : ""} />
          <div className={`${styles.buttonsWrap} ${create ? "" : styles.buttonsWrapSmall}`}>
            <div
              className={`${styles.cancel} ${create ? styles.onCreate : ""}`}
              onClick={() => setBlob({ ...blob, file: null, show: false })}
            >
              {__("Отмена")}
            </div>
            <div className={`${styles.add} ${create ? styles.onCreate : ""}`} onClick={onAddFile}>
              {create ? __("Создать") : __("Добавить")}
            </div>
            {create ? (
              <div className={`${styles.addOpen}`} onClick={() => onAddFile(true)}>
                {__("Создать и открыть в редакторе")}
              </div>
            ) : null}
          </div>
        </div>
      </PopUp>
      {error && <Error error={error} set={closeComponent} message={__("Файл не добавлен")} />}
    </div>
  );
};

export default CreateFile;

CreateFile.propTypes = {
  title: PropTypes.string,
  loaded: PropTypes.array,
  setLoaded: PropTypes.func,
  blob: blobProps,
  setBlob: PropTypes.func,
  onToggleSafePassword: PropTypes.func,
  setAwaitingFiles: PropTypes.func,
  awaitingFiles: PropTypes.array,
  loadingFile: PropTypes.oneOfType([PropTypes.arrayOf(loadingFileProps), PropTypes.array]),
  fileErrors: PropTypes.array,
  setLoadingFile: PropTypes.func,
  create: PropTypes.bool,
  setGLoader: PropTypes.func,
  menuItem: PropTypes.string,
  initFolder: PropTypes.oneOfType([chosenFolderProps, createFilesProps]),
  showChoiceFolders: PropTypes.bool,
  info: PropTypes.oneOfType([chosenFolderProps, createFilesProps])
};
