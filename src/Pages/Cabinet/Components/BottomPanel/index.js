import React, { useState } from "react";

import styles from "./BottomPanel.module.sass";
import { themes } from "../SideMenu/themes";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { imageSrc } from "../../../../generalComponents/globalVariables";

const BottomPanel = () => {
  const images = [
    "mail.svg",
    "calendar-5.svg",
    "sms.svg",
    "round-webcam.svg",
    "calendar-4.svg",
    "picture-1.svg",
    "shopping-cart.svg"
  ];
  const links = ["", "/calendar", "/chat", "", "", "", "/programs"];

  const history = useHistory();
  const theme = useSelector(state => state.user.userInfo?.theme);

  const [notifications] = useState({
    "mail.svg": "14",
    "calendar-5.svg": "2",
    "sms.svg": "5"
  });

  const getThemeBg = () => {
    if (theme) {
      return themes?.[theme];
    }
    return themes?.["blue"];
  };

  const renderIcons = () => {
    return images.map((el, i) => {
      return (
        <div className={styles.notificationsWrap} key={el}>
          <img
            src={`${imageSrc}assets/PrivateCabinet/${el}`}
            alt="icon"
            onClick={() => history.push(links?.[i])}
          />
          {Object.keys(notifications).some(item => item === el) && (
            <span className={styles.counter}>{notifications[el]}</span>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={styles.buttomPanelWrap}
      style={{
        background: getThemeBg()
      }}
    >
      <div className={styles.curtain} />
      <div className={styles.icons}>{renderIcons()}</div>
    </div>
  );
};

export default BottomPanel;
