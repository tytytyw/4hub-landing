import React from "react";
import styles from "./WelcomeCard.module.sass";
import successImg from "../../../../../../../assets/BusinessCabinet/WelcomePage/success.svg";
import { ReactComponent as PencilImg } from "../../../../../../../assets/BusinessCabinet/WelcomePage/pencil.svg";
import { ReactComponent as KeyImg } from "../../../../../../../assets/BusinessCabinet/WelcomePage/key.svg";
import { ReactComponent as ArrowImg } from "../../../../../../../assets/BusinessCabinet/WelcomePage/arrow.svg";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const WelcomeCard = ({ setPageOption }) => {
  const { __ } = useLocales();

  return (
    <div className={styles.centeredWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img src={successImg} alt="Success" />
          <p>{__("Верефикация прошла успешно")}</p>
        </div>

        <div className={styles.infoBlock}>
          <p>
            {__(
              "Заполните информацию о компании или предоставьте доступ для заполнения для комфортного пользования сервисом"
            )}
          </p>
        </div>

        <div className={styles.cards}>
          <div className={styles.cardItem}>
            <div className={styles.card}>
              <p>{__("Заполнить самостоятельно")}</p>
              <div className={styles.bgImg}>
                <PencilImg />
              </div>
            </div>

            <p className={styles.cardText}>
              {__(
                "Ввести все поля самостоятельно закерепив за собой все права администратора"
              )}
            </p>
          </div>

          <div
            onClick={() => setPageOption("give-access")}
            className={styles.cardItem}
          >
            <div className={styles.card}>
              <p>{__("Предоставить доступ")}</p>
              <div className={styles.bgImg}>
                <KeyImg />
              </div>
            </div>

            <p className={styles.cardText}>
              {__(
                "предоставления доступа дает возможность третим лицам заполнять данные о компании"
              )}
            </p>
          </div>

          <div className={styles.cardItem}>
            <div className={styles.card}>
              <p>{__("Пропустить")}</p>
              <div className={styles.bgImg}>
                <ArrowImg />
              </div>
            </div>

            <p className={styles.cardText}>
              {__(
                "Вы можите заполнить информацию позже но вы не сможете полноценно пользоваться всеми услузами сервиса"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;

WelcomeCard.propTypes = {
  setPageOption: PropTypes.func,
};
