import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";

import styles from "./FormContact.module.sass";
import arrowImage from "../../../../../../assets/PrivateCabinet/signs-2.svg";
import calendarImage from "../../../../../../assets/PrivateCabinet/calendar-6.svg";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import AddSocials from "./AddSocials";
import PopUp from "../../../../../../generalComponents/PopUp";
import ProfileUpload from "../../UserForm/ProfileUpload";
import Calendar from "../../../../../StartPage/Components/Calendar";
import Button from "../../Button";

import { socialsIcons } from "../consts";
import Input from "../../Input";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const EditContact = ({ set }) => {
  const { __ } = useLocales();
  const [numbers, setNumbers] = useState([]);
  const [mails, setMails] = useState([]);

  const [socPopup, setSocPopup] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateValue, setDateValue] = useState("");

  const [socials, setSocials] = useState([]);

  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const formRef = useRef();

  const uploadImage = (event) => {
    const file = event.target.files[0] ?? null;
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);

    socials.forEach(({ type, link }) =>
      formData.append(`socials[${type}]`, link)
    );

    const formValues = {};
    for (let [name, value] of formData.entries()) {
      formValues[name] = value;
    }

    set(false);
  };

  return (
    <PopUp set={set}>
      <form
        ref={formRef}
        noValidate
        onSubmit={onSubmit}
        className={styles.wrapper}
      >
        <div className={styles.top}>
          <span className={styles.close} onClick={() => set(false)}>
            <span className={styles.times} />
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <p className={styles.title}>Добавить контакт</p>
            <div className={styles.uploadBlock}>
              <ProfileUpload
                name="profileImg"
                preview={preview}
                onChange={uploadImage}
              />
            </div>
          </div>

          <div className={styles.formContent}>
            <div className={styles.formItem}>
              <div className={styles.formBlock}>
                <span className={styles.info}>{__("Имя:")}</span>
                <input name="name" className={styles.input} />
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formBlock}>
                <span className={styles.info}>{__("Фамилия:")}</span>
                <input name="sname" className={styles.input} />
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formBlock}>
                <span className={styles.info}>{__("Компания:")}</span>
                <input name="company" className={styles.input} />
              </div>
            </div>

            <div className={styles.formItem}>
              {numbers.map((number, index) => (
                <div className={styles.formBlock} key={index}>
                  <span
                    onClick={() => {
                      numbers.splice(index, 1);
                      setNumbers([...numbers]);
                    }}
                    className={styles.minusBtn}
                  />
                  <span className={styles.info}>
                    {__("Введите номер телефона:")}
                  </span>
                  <Input
                    phone={true}
                    name="number[]"
                    onChange={(event) => {
                      numbers[index] = event.target.value;
                      setNumbers([...numbers]);
                    }}
                    custom={true}
                    className={styles.input}
                    value={number}
                  />
                </div>
              ))}
              <div
                className={classnames({
                  [styles.formBlock]: true,
                  [styles.clickable]: true,
                })}
                onClick={() => setNumbers([...numbers, ""])}
              >
                <img
                  className={styles.infoImg}
                  src={imageSrc + "assets/PrivateCabinet/plus-3.svg"}
                  alt="new_contact"
                />
                <span className={styles.info}>
                  {__("Добавить номер телефона:")}
                </span>
              </div>
            </div>

            <div className={styles.formItem}>
              {mails.map((mail, index) => (
                <div className={styles.formBlock} key={index}>
                  <span
                    onClick={() => {
                      mails.splice(index, 1);
                      setMails([...mails]);
                    }}
                    className={styles.minusBtn}
                  />
                  <span className={styles.info}>{__("Введите @mail:")}</span>
                  <input
                    name="email[]"
                    type="email"
                    onChange={(event) => {
                      mails[index] = event.target.value;
                      setMails([...mails]);
                    }}
                    className={styles.input}
                    value={mail}
                  />
                </div>
              ))}
              <div
                className={classnames({
                  [styles.formBlock]: true,
                  [styles.clickable]: true,
                })}
                onClick={() => setMails([...mails, ""])}
              >
                <img
                  className={styles.infoImg}
                  src={imageSrc + "assets/PrivateCabinet/plus-3.svg"}
                  alt="new_contact"
                />
                <span className={styles.info}>{__("Добавить @mail:")}</span>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formBlock}>
                <span className={styles.info}>
                  {__("Добавить день рождения:")}
                </span>
                <input
                  name="date_birth"
                  onChange={(event) => setDateValue(event.target.value)}
                  value={dateValue}
                  className={styles.input}
                />
                <div
                  onClick={() => setShowCalendar(true)}
                  className={styles.icon}
                >
                  <img src={calendarImage} alt="Calendar" />
                </div>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formBlock}>
                <span className={styles.info}>
                  {__("Добавить профиль соц.сети:")}
                </span>
                <ul className={styles.socialsList}>
                  {socials.map(
                    (item, index) =>
                      !!item.link && (
                        <li key={index}>
                          <a href={item.link} className={styles.socialsLink}>
                            <img
                              src={socialsIcons[item.type]}
                              alt={item.type}
                            />
                          </a>
                        </li>
                      )
                  )}
                </ul>
                <div onClick={() => setSocPopup(true)} className={styles.icon}>
                  <img src={arrowImage} alt="Arrow" />
                </div>
              </div>
            </div>

            <Input name="notes" placeholder="Заметки" />
          </div>
        </div>

        <div className={styles.submitBlock}>
          <Button className={styles.cancelBtn} onClick={() => set(false)}>
            {__("Отмена")}
          </Button>
          <Button type="submit" className={styles.submitBtn}>
            {__("Сохранить")}
          </Button>
        </div>
      </form>

      {socPopup && (
        <AddSocials values={socials} setValues={setSocials} set={setSocPopup} />
      )}

      {showCalendar && (
        <PopUp set={setShowCalendar} zIndex={102}>
          <Calendar
            setShowCalendar={setShowCalendar}
            setDateValue={setDateValue}
          />
        </PopUp>
      )}
    </PopUp>
  );
};

export default EditContact;
EditContact.propTypes = {
  set: PropTypes.func,
};
