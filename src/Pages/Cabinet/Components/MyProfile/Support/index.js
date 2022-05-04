import React, { useState } from "react";

import styles from "./Support.module.sass";

import Accordion from "../../Accordion/Accordion";
import Button from "../Button";
import Input from "../Input";
import Textarea from "../Textarea";
import api from "../../../../../api";
import AlertPopup from "../AlertPopup";
import { formIsValid, isCorrectData } from "../Input/validation";
import { useSelector } from "react-redux";
import { useLocales } from "react-localized";

const Support = () => {
  const { __ } = useLocales();
  const uid = useSelector((state) => state.user.uid);

  const [errors, setErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState({});

  const [fields, setFields] = useState({});
  const [blur, setBlur] = useState({});
  const [success, setSuccess] = useState(false);

  const requiredInputs = ["subj", "text"];

  const resetForm = () => {
    setFields({});
    setBlur({});
    setErrors({});
    setSubmitErrors({});
  };

  const onBlurHandler = (event) => {
    const { name } = event.target;
    setBlur({ ...blur, [name]: true });
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

  const onSubmit = (event) => {
    event.preventDefault();

    if (formIsValid(fields, setSubmitErrors, requiredInputs)) {
      api
        .get(`/ajax/admin_send.php`, {
          params: {
            uid,
            ...fields,
          },
        })
        .then(() => {
          setSuccess(true);
          resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const isMistake = (name) =>
    (errors?.[name] && blur?.[name]) || submitErrors?.[name];

  return (
    <div className={styles.support}>
      <h2 className={styles.title}>{__("Часто задаваемые вопросы")}</h2>
      <Accordion />

      <h2 className={styles.title}>{__("Остались вопросы?")}</h2>
      {/*<QuestionForm/>*/}

      <form noValidate onSubmit={onSubmit} className={styles.wrapper}>
        <div className={styles.fields}>
          <div className={styles.row}>
            <div className={`${styles.field} ${styles.flex100}`}>
              <Input
                label={__("Введите тему")}
                name="subj"
                isMistake={isMistake("subj")}
                value={fields?.subj || ""}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={`${styles.field} ${styles.flex100}`}>
              <Textarea
                label={__("Задайте вопрос")}
                name="text"
                isMistake={isMistake("text")}
                value={fields?.text || ""}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
            </div>
          </div>

          <div className={styles.submitBlock}>
            <Button type="submit">{__("Отправить")}</Button>
          </div>
        </div>
      </form>

      {success && (
        <AlertPopup
          set={setSuccess}
          title={__("Запрос успешно отправлен")}
          text={__("Благодарим за обратную связь!")}
        />
      )}
    </div>
  );
};

export default Support;
