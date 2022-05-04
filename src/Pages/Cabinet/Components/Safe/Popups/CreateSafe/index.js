import React, { useRef, useState, useEffect } from "react";

import styles from "./CreateSafe.module.sass";
import Colors from "../../../../../../generalComponents/Elements/Colors";
import Signs from "../../../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../../../generalComponents/Elements/Emoji";
import PopUp from "../../../../../../generalComponents/PopUp";
import Error from "../../../../../../generalComponents/Error";
import { colors, useTags } from "../../../../../../generalComponents/collections";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { onGetSafes } from "../../../../../../Store/actions/CabinetActions";
import Input from "../../../MyProfile/Input";
import SafeIcon from "../../SafeIcon";
import classNames from "classnames";
import api from "../../../../../../api";

import { useDispatch, useSelector } from "react-redux";
import { useLocales } from "react-localized";

const CreateSafe = ({ onCreate, setLoadingType }) => {
  const { __ } = useLocales();
  const tags = useTags();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [tagOption, setTagOption] = useState({ chosen: "", count: 30 });
  const [color, setColor] = useState(colors?.find((item) => item.name === "blue"));
  const [sign, setSign] = useState("");
  const [tel, setTel] = useState("");
  const [emoji, setEmoji] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  const codeToTel = useSelector((state) => state.Cabinet.safe.safeCodeToTel);

  const renderTags = () => {
    return tags.map((tag, i) => {
      return (
        <div key={i} onClick={() => onChangeTag(tag)}>
          {tag}
        </div>
      );
    });
  };

  const [errors, setErrors] = useState({});

  const addErrors = () => {
    setErrors({
      name: !name,
      password: !password,
      passwordRepeat: password !== passwordRepeat,
      tel: !tel && !codeToTel
    });
  };

  const formIsValid = () => {
    addErrors();
    return name && password && password === passwordRepeat && (tel || codeToTel);
  };

  const onCustomizeSafe = (name, pass, tag, color, fig, emo) => {
    setLoadingType("squarify");
    api
      .get(
        `/ajax/safe_add.php?uid=${uid}&name=${name}&pass=${pass}&tag=${tag}&color=${color}&symbol=${fig}&emoji=${emo}&tel=${tel}`
      )
      .then((res) => {
        if (res.data.ok) {
          onCreate(false);
          dispatch(onGetSafes());
        } else if (res.data.error === "name exists") {
          setError(__("Сейф с таким именем уже существует"));
          setErrors({ name: true });
        } else {
          setError(__("Что-то пошло не так. Повторите попытку позже"));
        }
      })
      .catch((error) => {
        console.log(error);
        setError(__("Что-то пошло не так. Повторите попытку позже"));
      })
      .finally(() => setLoadingType(""));
  };

  const customizeSafe = () => {
    if (formIsValid()) {
      const safeObj = {
        name,
        password,
        tag: tagOption?.chosen,
        color: color?.name,
        sign,
        emo: emoji
      };

      onCustomizeSafe(safeObj.name, safeObj.password, safeObj.tag, safeObj.color, safeObj.sign, safeObj.emo);
    }
  };

  const onChangeTag = (chosen) => {
    const count = 30 - chosen.length;
    if (count >= 0) setTagOption({ ...tagOption, chosen, count });
  };

  // AutoHide .tagList after file is chosen
  const tagRef = useRef(null);
  const handleChoose = () => {
    tagRef.current.style.display = "none";
    setTimeout(() => {
      tagRef.current.style.display = "";
    }, 0);
  };

  useEffect(() => {
    if (name) setErrors({ name: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <>
      <PopUp set={onCreate}>
        <div className={styles.createFolderWrap}>
          <span className={styles.cross} onClick={() => onCreate(false)} />

          <div className={styles.content}>
            <span className={styles.title}>{__("Создание сейфа")}</span>
            <div className={styles.folderIconWrap}>
              <div
                className={classNames({
                  [styles.folder]: true,
                  [styles.redCross]: color.color !== "grey"
                })}
                onClick={() => setColor(colors[0])}
              >
                <SafeIcon type={color?.name} className={styles.safeIcon} />
              </div>
              <div className={styles.picPreview}>
                <div className={styles.folderName}>{name}</div>
                <div className={styles.folderOptions}>
                  {tagOption.chosen && (
                    <div className={classNames(styles.minitagWrap, styles.redCross)}>
                      <div className={styles.minitag} onClick={() => setTagOption({ ...tagOption, chosen: "" })}>
                        # {tagOption.chosen}
                      </div>
                    </div>
                  )}

                  {sign && (
                    <div className={classNames(styles.sign, styles.redCross)} onClick={() => setSign("")}>
                      <img src={`${imageSrc}/assets/PrivateCabinet/signs/${sign}.svg`} alt="emoji" />
                    </div>
                  )}

                  {emoji && (
                    <div className={classNames(styles.redCross, styles.emodji)} onClick={() => setEmoji("")}>
                      <img src={`${imageSrc}/assets/PrivateCabinet/smiles/${emoji}.svg`} alt="emoji" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.inputFieldsWrap}>
              <div className={styles.inputWrap}>
                <Input
                  name="name"
                  placeholder={__("Имя сейфа")}
                  className={styles.input}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  isMistake={errors?.name}
                />
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

              <div className={styles.inputWrap}>
                <Input
                  type="password"
                  name="password"
                  placeholder={__("Установить пароль")}
                  showPass={showPass}
                  setShowPass={setShowPass}
                  className={styles.input}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  isMistake={errors?.password}
                />
              </div>

              <div className={styles.inputWrap}>
                <Input
                  autocomplete="off"
                  type="password"
                  name="passwordRepeat"
                  placeholder={__("Введите повторно пароль")}
                  showPass={showPass}
                  setShowPass={setShowPass}
                  className={styles.input}
                  value={passwordRepeat}
                  onChange={(event) => setPasswordRepeat(event.target.value)}
                  isMistake={errors?.passwordRepeat}
                />
              </div>

              {!codeToTel && (
                <div className={styles.inputWrap}>
                  <Input
                    autocomplete="off"
                    type="phone"
                    phone={1}
                    name="tel"
                    placeholder={__("Введите Ваш номер телефона")}
                    className={styles.input}
                    value={tel}
                    onChange={(event) => setTel(event.target.value)}
                    isMistake={errors?.tel}
                  />
                  <p className={styles.inputNote}>
                    {__(
                      "Примечание: на указанный контактный номер телефона будет отправлено код-пароль для доступа к сейфу"
                    )}
                  </p>
                </div>
              )}
            </div>
            <Colors color={color} setColor={setColor} />
            <Signs sign={sign} setSign={setSign} />
            <Emoji emoji={emoji} setEmoji={setEmoji} />
          </div>

          <div className={styles.buttonsWrap}>
            <div className={styles.cancel} onClick={() => onCreate(false)}>
              {__("Отмена")}
            </div>
            <div className={styles.add} onClick={() => customizeSafe()}>
              {__("Добавить")}
            </div>
          </div>
        </div>

        {error && <Error error={error} set={setError} message={error} />}
      </PopUp>
    </>
  );
};

export default CreateSafe;
