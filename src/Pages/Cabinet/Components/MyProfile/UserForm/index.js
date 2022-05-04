import React, { useEffect, useRef, useState } from "react";

import styles from "./UserForm.module.sass";
import Input from "../Input";
import ProfileUpload from "./ProfileUpload";
import { useSelector, useDispatch } from "react-redux";
import api from "../../../../../api";
import Button from "../Button";
import AlertPopup from "../AlertPopup";
import CodePopup from "../CodePopup/index";
import { formIsValid, isCorrectData } from "../Input/validation";
import { onGetUserInfo } from "../../../../../Store/actions/startPageAction";
import { useLocales } from "react-localized";

const UserForm = () => {
  const { __ } = useLocales();
  const user = useSelector((state) => state.user.userInfo);
  const uid = useSelector((state) => state.user.uid);

  const [fields, setFields] = useState(user);

  const [errors, setErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState({});
  const [blur, setBlur] = useState({});
  const [formChanged, setFormChanged] = useState(true);

  const [editForm, setEditForm] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showCodePopup, setShowCodePopup] = useState(false);
  const [success, setSuccess] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();
  const dispatch = useDispatch();

  const fileInputRef = useRef();
  const formRef = useRef();

  const uploadImage = (event) => {
    const file = event.target.files[0] ?? null;
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => dispatch(onGetUserInfo()), [showCodePopup, success]); // eslint-disable-line

  useEffect(() => setFields(user), [user]);

  useEffect(() => {
    const profileImage = fields?.icon?.[0];
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(image);
    } else {
      fileInputRef.current.value = null;
      setPreview(profileImage);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, fields]);

  const requiredInputs = ["name", "sname", "email", "pass", "password_r"];

  const resetForm = (saved = false) => {
    if (!saved) {
      setImage(null);
      setFields(user);
    }

    setEditForm(false);
    //setFormChanged(false)

    setBlur({});
    setErrors({});
    setSubmitErrors({});
  };

  const onChangeHandler = (event) => {
    let { value, name } = event.target;

    if (!isCorrectData(value, name, fields, requiredInputs)) {
      setErrors({ ...errors, [name]: true });
    } else {
      setErrors({ ...errors, [name]: false });
      setSubmitErrors({ ...submitErrors, [name]: false });
    }

    setFields({ ...fields, [name]: value });
  };

  const onBlurHandler = (event) => {
    const { name } = event.target;
    setBlur({ ...blur, [name]: true });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (formChanged && formIsValid(fields, setSubmitErrors, requiredInputs)) {
      const formData = new FormData(formRef.current);
      formData.append("file", image);

      api
        .post(`/ajax/user_edit.php?uid=${uid}`, formData)
        .then(() => {
          setSuccess(true);
          resetForm(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const isMistake = (name) => (errors?.[name] && blur?.[name]) || submitErrors?.[name];

  return (
    <div className={styles.formWrap}>
      <div className={styles.uploadBlock}>
        <ProfileUpload inputRef={fileInputRef} preview={preview} onChange={uploadImage} disabled={!editForm} />
      </div>

      <form ref={formRef} noValidate onSubmit={onSubmit} onChange={() => setFormChanged(true)}>
        <div className={styles.fields}>
          <div className={styles.row}>
            <div className={`${styles.field} ${styles.flex50}`}>
              <Input
                label={__("Имя")}
                name="name"
                disabled={!editForm}
                isMistake={isMistake("name")}
                value={fields?.name || ""}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
            </div>
            <div className={`${styles.field} ${styles.flex50}`}>
              <Input
                label={__("Фамилия")}
                name="sname"
                disabled={!editForm}
                isMistake={isMistake("sname")}
                value={fields?.sname || ""}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={`${styles.field} ${styles.flex100}`}>
              <Input
                type="email"
                label={__("Email")}
                name="email"
                disabled={!editForm}
                isMistake={isMistake("email")}
                value={fields?.email || ""}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={`${styles.field} ${styles.flex100}`}>
              <Input
                type="password"
                label={__("Пароль")}
                name="pass"
                disabled={!editForm}
                isMistake={isMistake("pass")}
                value={fields?.pass || ""}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                showPass={showPass}
                setShowPass={setShowPass}
              />
            </div>
          </div>

          {editForm && (
            <div className={styles.row}>
              <div className={`${styles.field} ${styles.flex100}`}>
                <Input
                  type="password"
                  label={__("Повторите Пароль")}
                  name="password_r"
                  disabled={!editForm}
                  isMistake={isMistake("password_r")}
                  value={fields?.password_r || ""}
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                  showPass={showPass}
                  setShowPass={setShowPass}
                />
              </div>
            </div>
          )}

          <div className={styles.row}>
            <div className={`${styles.field} ${styles.flex100}`}>
              <Input
                label={__("Телефон")}
                name="tel"
                disabled={!editForm}
                value={fields?.tel || ""}
                phone={true}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
            </div>
          </div>

          <div className={styles.submitBlock}>
            {editForm && (
              <>
                <Button className={styles.cancelBtn} onClick={() => resetForm()}>
                  {__("Отмена")}
                </Button>
                <Button type="submit" className={styles.submitBtn}>
                  {__("Сохранить")}
                </Button>
              </>
            )}
            {!editForm && (
              <Button className={styles.editBtn} onClick={() => setEditForm(true)}>
                {__("Редактировать")}
              </Button>
            )}
          </div>
        </div>
      </form>

      {success && (
        <AlertPopup
          set={setSuccess}
          title={__("Данные успешно обновлены")}
          text={__("В целях безопасности, на Email Вашей учетной записи отправлено подтверждение этого изменения")}
          setShowCodePopup={setShowCodePopup}
          onGetUserInfo={onGetUserInfo}
        />
      )}
      {showCodePopup && <CodePopup setShowCodePopup={setShowCodePopup} />}
    </div>
  );
};

export default UserForm;
