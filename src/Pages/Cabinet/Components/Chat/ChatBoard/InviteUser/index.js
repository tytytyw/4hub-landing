import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./InviteUser.module.sass";
import Popup from "../../../../../../generalComponents/PopUp";
import timesImg from "../../../../../../assets/BusinessCabinet/times.svg";
import classNames from "classnames";
import { messengersData } from "./consts";
import api from "../../../../../../api";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

function InviteUser({ contact, setShowSuccessPopup }) {
  const { __ } = useLocales();
  const [sentInvite, setSentInvite] = useState(false);
  const [selectedSoc, setSelectedSoc] = useState(null);
  const [messengers, setMessengers] = useState([]);
  const uid = useSelector((state) => state.user.uid);

  const onSendInvite = () => {
    if (selectedSoc === "email" || selectedSoc === "tel") {
      setSentInvite(false);
      api
        .get(`/ajax/user_invite.php?uid=${uid}&${selectedSoc}=${contact[selectedSoc][0]}`)
        .then((res) => {
          if (res.data.ok) {
            setShowSuccessPopup({
              title: __("Приглашение успешно отправлено"),
              text: __(`${contact.sname} ${contact.name} получил(а) приглашение на добавление в сеть 4Hub`)
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (selectedSoc) {
      const link = document.createElement("a");
      link.target = "_blank";
      link.rel = "noreferrer";
      link.setAttribute("href", messengers.filter((soc) => soc.type === selectedSoc)[0].link);
      link.click();
      setSentInvite(false);
    }
  };

  useEffect(() => {
    setMessengers(messengersData);
    if (!contact?.email?.length || !contact?.email[0]?.length)
      setMessengers((messengersData) => messengersData.filter((item) => item.type !== "email"));
    if (!contact?.tel?.length || !contact?.tel[0]?.length)
      setMessengers((messengersData) => messengersData.filter((item) => item.type !== "tel"));
  }, [contact]); //eslint-disable-line

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        {__("Данный контакт отсутсвует в системе 4Hub отправьте приглашения что бы Вы могли вести диалог в системе")}
      </p>
      <div onClick={() => setSentInvite(true)} className={styles.button}>
        {__("Пригласить")}
      </div>
      {sentInvite ? (
        <Popup set={setSentInvite}>
          <div className={styles.sendInvite}>
            <div className={styles.contentWrapper}>
              <img onClick={() => setSentInvite(false)} className={styles.close} src={timesImg} alt="Close" />
              <div className={styles.header}>
                <h4 className={styles.title}>{__("Выберите способ приглашения")}</h4>
              </div>
              <div className={styles.content}>
                <p className={styles.text}>
                  {__("При отправки через месенжер будет открыто выбранное приложение на Вашем устройстве")}
                </p>
                <div className={styles.socials}>
                  {messengers.map((item, index) => {
                    return (
                      <li
                        onClick={() => setSelectedSoc(item?.type)}
                        className={classNames({
                          [styles.socialsItem]: true,
                          [styles.active]: selectedSoc === item?.type
                        })}
                        key={index}
                      >
                        <img className={styles.socialIcon} src={item.icon} alt={item.label} />
                        <p>{item.label}</p>
                      </li>
                    );
                  })}
                </div>
                <div className={styles.actionBlock}>
                  <button
                    onClick={onSendInvite}
                    className={classNames({
                      [styles.completeBtn]: true,
                      [styles.disabledBtn]: !selectedSoc
                    })}
                  >
                    {__("Отправить")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      ) : (
        ""
      )}
    </div>
  );
}

export default InviteUser;

InviteUser.propTypes = {
  contact: PropTypes.object.isRequired,
  setShowSuccessPopup: PropTypes.func.isRequired
};
