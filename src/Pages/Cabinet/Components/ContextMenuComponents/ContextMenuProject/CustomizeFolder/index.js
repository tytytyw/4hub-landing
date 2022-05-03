import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./CustomizeFolder.module.sass";
import api from "../../../../../../api";
import PopUp from "../../../../../../generalComponents/PopUp";
import { ReactComponent as FolderIcon } from "../../../../../../assets/PrivateCabinet/folder-2.svg";
import InputField from "../../../../../../generalComponents/InputField";
import {
  colors,
  useTags
} from "../../../../../../generalComponents/collections";
import { onGetProjectFolders } from "../../../../../../Store/actions/CabinetActions";
import Colors from "../../../../../../generalComponents/Elements/Colors";
import "../../../../../../generalComponents/colors.sass";
import Signs from "../../../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../../../generalComponents/Elements/Emoji";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { projectFolderStructure } from "../../../../../../types/Project";

const CustomizeFolder = ({
  nullifyAction,
  title,
  setError,
  projectId,
  folder,
  setGLoader
}) => {
  const { __ } = useLocales();
  const tags = useTags();
  const uid = useSelector(state => state.user.uid);
  const [name, setName] = useState(folder.name);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordCoincide, setPasswordCoincide] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [tagOption, setTagOption] = useState({
    chosen: folder.tags || "",
    count: 30
  });
  const [color, setColor] = useState(
    colors?.filter(el => el.name === folder?.color)[0]
  );
  const [fig, setFig] = useState(folder.fig || "");
  const [emoji, setEmoji] = useState(folder.emo || "");
  const [visibility, setVisibility] = useState("password");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const onSwitch = boolean => setShowRepeat(boolean);

  const renderTags = () => {
    return tags.map((tag, i) => {
      return (
        <div key={i} onClick={() => onChangeTag(tag)}>
          {tag}
        </div>
      );
    });
  };

  const addErrors = () => {
    setErrors({
      name: !name
    });
  };

  const formIsValid = () => {
    if (passwordRepeat && !passwordCoincide) return false;
    addErrors();
    return !!name;
  };

  const onCustomizeFolder = () => {
    if (formIsValid()) customizeFolder();
  };

  const customizeFolder = () => {
    setGLoader(true);
    //TODO: parent folder
    const params = `uid=${uid}&id_project=${projectId}&dir_name=${name}&tag=${
      tagOption.chosen
    }&pass=${passwordCoincide ? password : ""}&color=${color?.name ||
      "grey"}&symbol=${fig}&emoji=${emoji}`;
    api
      .post(`/ajax/project_folders_edit.php?${params}`)
      .then(res => {
        if (res.data.ok !== 1) {
          setError(__("Папка не добавлена"));
        }
      })
      .catch(() => {
        setError(__("Папка не добавлена"));
      })
      .finally(() => {
        setGLoader(false);
        dispatch(onGetProjectFolders(projectId));
      });
    nullifyAction();
  };

  const closeComponent = () => {
    nullifyAction();
    setError(false);
  };

  const onChangeTag = chosen => {
    const count = 30 - chosen.length;
    if (count >= 0) setTagOption({ ...tagOption, chosen, count });
  };

  const comparePass = val => {
    const pass = password.split("");
    const passRepeat = val.split("");
    let boolean = true;
    if (pass.length === passRepeat.length) {
      passRepeat.forEach((el, i) => {
        if (el !== pass[i]) boolean = false;
      });
    } else boolean = false;
    setPasswordCoincide(boolean);
  };

  return (
    <>
      <PopUp set={closeComponent}>
        <div className={styles.createFolderWrap}>
          <span className={styles.cross} onClick={() => nullifyAction()} />
          <span className={styles.title}>{title}</span>
          <div className={styles.folderIconWrap}>
            <div className={`${styles.folder}`}>
              <FolderIcon
                className={`${styles.folderIcon} ${
                  colors.filter(el => el.color === color.color)[0]?.name
                }`}
              />
            </div>
            <div className={styles.picPreview}>
              <div className={styles.folderName}>{name}</div>
              <div className={styles.folderOptions}>
                {tagOption.chosen && (
                  <div
                    className={`${styles.minitagWrap} ${styles.redCross}`}
                    onClick={() => setTagOption({ ...tagOption, chosen: "" })}>
                    <div className={`${styles.minitag}`}>
                      #{tagOption.chosen}
                    </div>
                  </div>
                )}
                <div
                  className={`${styles.colorWrap} ${
                    color.color !== "grey" ? styles.colorWrapTap : ""
                  } ${color.color !== "grey" ? styles.redCross : ""}`}
                  onClick={() => setColor(colors[0])}>
                  <div
                    className={styles.circle}
                    style={{
                      background: color.light,
                      border: `1px solid ${color.dark}`
                    }}
                  />
                </div>
                {fig && (
                  <div className={styles.redCross} onClick={() => setFig("")}>
                    <img
                      src={`${imageSrc}assets/PrivateCabinet/signs/${fig}.svg`}
                      alt="emoji"
                    />
                  </div>
                )}
                {emoji && (
                  <div className={styles.redCross} onClick={() => setEmoji("")}>
                    <img
                      src={`${imageSrc}assets/PrivateCabinet/smiles/${emoji}.svg`}
                      alt="emoji"
                    />
                  </div>
                )}
                {passwordCoincide &&
                  password.length === passwordRepeat.length &&
                  showRepeat && (
                    <img
                      className={styles.lock}
                      src={`${imageSrc}assets/PrivateCabinet/locked.svg`}
                      alt="lock"
                    />
                  )}
              </div>
            </div>
          </div>
          <div className={styles.inputFieldsWrap}>
            <div className={styles.inputWrap}>
              <InputField
                model="text"
                value={name}
                set={setName}
                placeholder={__("Имя папки")}
                mistake={errors?.name}
              />
            </div>
            <div className={styles.tagPicker}>
              <span>#</span>
              <input
                className={styles.inputField}
                type="text"
                placeholder={__("Добавте #Тег")}
                value={tagOption.chosen}
                onChange={e => onChangeTag(e.target.value)}
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
                value={password}
                set={setPassword}
                placeholder={__("Пароль")}
                onSwitch={onSwitch}
                isPass={showRepeat}
                visibility={visibility}
                setVisibility={setVisibility}
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
          <Signs sign={fig} setSign={setFig} />
          <Emoji emoji={emoji} setEmoji={setEmoji} />
          <div className={styles.buttonsWrap}>
            <div
              className={styles.cancel}
              onClick={() => closeComponent(false)}>
              {__("Отмена")}
            </div>
            <div className={styles.add} onClick={() => onCustomizeFolder()}>
              {__("Сохранить")}
            </div>
          </div>
        </div>
      </PopUp>
    </>
  );
};

export default CustomizeFolder;

CustomizeFolder.propTypes = {
  nullifyAction: PropTypes.func,
  title: PropTypes.string,
  setError: PropTypes.func,
  projectId: PropTypes.string,
  folder: projectFolderStructure,
  setGLoader: PropTypes.func
};
