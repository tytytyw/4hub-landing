import React, { useState, useEffect } from "react";
import styles from "./Main.module.sass";
import Tariff from "../Tariff/Tariff";
import classNames from "classnames";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

function Main({ scrollTop }) {
  const { __ } = useLocales();
  const [count, setCount] = useState(null);
  let isScrolling = false;
  const SliderItemPic1 = document.querySelector("#slide-picture_1");
  const SliderItemPic2 = document.querySelector("#slide-picture_2");
  const SliderItemPic3 = document.querySelector("#slide-picture_3");
  const SliderItemPic4 = document.querySelector("#slide-picture_4");
  const SliderItemText1 = document.querySelector("#slide-text_1");
  const SliderItemText2 = document.querySelector("#slide-text_2");
  const SliderItemText3 = document.querySelector("#slide-text_3");
  const SliderItemText4 = document.querySelector("#slide-text_4");
  const sliderWrap = document.querySelector(`.${styles.presentation}`);
  SliderItemText1 && SliderItemText1.classList.add(styles.text_item_active);
  let layerYOld = null;
  let deltaYOld = null;
  const scrollHandler = (e) => {
    let scrollingTtimeOut = 700;
    if (
      !isScrolling &&
      (Math.abs(e.deltaY) < 100
        ? e.layerY !== layerYOld ||
          document.body.style.overflow === "visible" ||
          deltaYOld !== Math.sign(e.deltaY)
        : true)
    ) {
      if (e.deltaY > 0 && window.pageYOffset === 0) {
        setCount((count) => count + 1);
      }

      if (e.deltaY < 0 && window.pageYOffset < 201) {
        scrollTop();
        setCount((count) => count - 1);

        if (document.body.style.overflow === "visible") {
          scrollingTtimeOut += 800;
          document.body.style.overflow = "hidden";
          document.body.style.top = 0;
          setCount(3);
          setTimeout(() => (layerYOld = null), 100);
        }
      }
      isScrolling = true;
      setTimeout(() => (isScrolling = false), scrollingTtimeOut);
      layerYOld = e.layerY;
      deltaYOld = Math.sign(e.deltaY);
    }
  };
  useEffect(() => {
    if (count > 3) {
      setCount(4);
      setTimeout(() => (document.body.style.overflow = "visible"), 1000);
      document.body.style.position = "absolute";
      document.body.style.top = `-${
        sliderWrap.offsetHeight + sliderWrap.offsetTop
      }px`;
    }

    if (count < 0) {
      setCount(0);
    }

    if (SliderItemPic2)
      switch (count) {
        case 0:
          SliderItemText1.classList.add(styles.text_item_active);
          SliderItemText2.classList.remove(styles.text_item_active);
          SliderItemPic1.classList.add(styles.image_wrap_active);
          SliderItemPic2.classList.remove(styles.image_wrap_active);
          break;
        case 1:
          SliderItemPic2.classList.add(styles.image_wrap_active);
          SliderItemPic1.classList.remove(styles.image_wrap_active);
          SliderItemPic3.classList.remove(styles.image_wrap_active);
          SliderItemText2.classList.add(styles.text_item_active);
          SliderItemText1.classList.remove(styles.text_item_active);
          SliderItemText3.classList.remove(styles.text_item_active);
          break;
        case 2:
          SliderItemPic3.classList.add(styles.image_wrap_active);
          SliderItemPic2.classList.remove(styles.image_wrap_active);
          SliderItemPic4.classList.remove(styles.image_wrap_active);
          SliderItemText3.classList.add(styles.text_item_active);
          SliderItemText2.classList.remove(styles.text_item_active);
          SliderItemText4.classList.remove(styles.text_item_active);
          break;
        case 3:
          SliderItemPic4.classList.add(styles.image_wrap_active);
          SliderItemPic3.classList.remove(styles.image_wrap_active);
          SliderItemText4.classList.add(styles.text_item_active);
          SliderItemText3.classList.remove(styles.text_item_active);
          break;
        case 4:
          SliderItemText4.classList.remove(styles.text_item_active);
          SliderItemPic4.classList.remove(styles.image_wrap_active);
          break;
        default:
          break;
      }
    document.querySelector(
      `.${styles.presentation_wrap}`
    ).style.transform = `translateY(${count * -100}%)`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    setCount(0);
    window.addEventListener("wheel", scrollHandler);

    document.body.style.overflow = "hidden";
    return () => window.removeEventListener("wheel", scrollHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sliderWrapStyles = {};
  if (sliderWrap)
    sliderWrapStyles.height = window.innerHeight - sliderWrap.offsetTop;

  return (
    <div>
      <div
        className={classNames({
          [styles.presentation]: true,
        })}
        style={{ height: sliderWrapStyles.height }}
      >
        <div className={styles.presentation_wrap}>
          <section className={styles.slide}>
            <div
              id="slide-text_1"
              className={classNames(styles.text_item, styles.text_item_active)}
            >
              <h4 className={styles.presentation__title}>
                {__("Файлообменник")}
              </h4>
              <p className={styles.presentation__text}>
                {__("Cистематизация данных в одном пространстве")}
              </p>
              <p className={styles.presentation__text}>
                {__("Предоставление доступа к загруженным файлам")}
              </p>
              <p className={styles.presentation__text}>
                {__("Разграничение прав доступа к файлам")}
              </p>
            </div>

            <div id="slide-picture_1" className={classNames(styles.image_wrap)}>
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_1_1
                )}
                src={imageSrc + "assets/BusinessCabinet/slider_item_1_1.png"}
                alt={__("добавление файла")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_1_2
                )}
                src={imageSrc + "assets/BusinessCabinet/slider_item_1_2.png"}
                alt={__("добавление файла")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_1_3
                )}
                src={imageSrc + "assets/BusinessCabinet/slider_item_1_3.png"}
                alt={__("добавление файла")}
              />
            </div>
          </section>
          <section className={styles.slide}>
            <div id="slide-text_2" className={styles.text_item}>
              <h4 className={styles.presentation__title}>
                {__("Оптимизация командной работы")}
              </h4>
              <p className={styles.presentation__text}>
                {__("Возможность организации конференций")}
              </p>
              <p className={styles.presentation__text}>
                {__(
                  "Синхронизация совместной работы над проектами с использованием встроенных инструментов"
                )}
              </p>
              <p className={styles.presentation__text}>
                {__("Приватная работа с документами")}
              </p>
            </div>

            <div id="slide-picture_2" className={styles.image_wrap}>
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_2_1
                )}
                src={imageSrc + "assets/BusinessCabinet/slider_item_2_1.png"}
                alt={__("совместный проект")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_2_2
                )}
                src={imageSrc + "assets/BusinessCabinet/slider_item_2_2.png"}
                alt={__("совместный проект")}
              />
            </div>
          </section>
          <section className={styles.slide}>
            <div id="slide-text_3" className={styles.text_item}>
              <h4 className={styles.presentation__title}>
                {__("Конфиденциальность и безопасность")}
              </h4>
              <p className={styles.presentation__text}>
                {__("Надежная защита личных и корпоративных данных")}
              </p>
              <p className={styles.presentation__text}>
                {__("Шифрование файлов")}
              </p>
            </div>

            <div id="slide-picture_3" className={styles.image_wrap}>
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_3_1
                )}
                src={imageSrc + "assets/BusinessCabinet/slider_item_3_1.png"}
                alt={__("добавление файла")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_3_2
                )}
                src={imageSrc + "assets/BusinessCabinet/slider_item_3_2.png"}
                alt={__("добавление файла")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_3_3
                )}
                src={imageSrc + "assets/BusinessCabinet/slider_item_3_3.png"}
                alt={__("добавление файла")}
              />
            </div>
          </section>
          <section className={styles.slide}>
            <div id="slide-text_4" className={styles.text_item}>
              <h4 className={styles.presentation__title}>
                {__("Интеграция необходимых сервисов")}
              </h4>
              <p className={styles.presentation__text}>
                {__("Синхронизация со сторонними сервисами")}
              </p>
              <p className={styles.presentation__text}>
                {__("Встроенный магазин программного обеспечения")}
              </p>
            </div>

            <div id="slide-picture_4" className={styles.image_wrap}>
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_4
                )}
                src={imageSrc + "assets/BusinessCabinet/slider_item_4.png"}
                alt={__("синхронизация")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_4_youtube
                )}
                src={imageSrc + "assets/StartPage/youtube.svg"}
                alt={__("youtube")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_4_telegram
                )}
                src={imageSrc + "assets/StartPage/telegram.svg"}
                alt={__("telegram")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_4_google_calendar
                )}
                src={imageSrc + "assets/StartPage/google_calendar.svg"}
                alt={__("google calendar")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_4_google_drive
                )}
                src={imageSrc + "assets/StartPage/google_drive.svg"}
                alt={__("google drive")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_4_figma
                )}
                src={imageSrc + "assets/StartPage/figma.svg"}
                alt={__("figma")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_4_viber
                )}
                src={imageSrc + "assets/StartPage/viber.svg"}
                alt={__("viber")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_4_whatsapp
                )}
                src={imageSrc + "assets/StartPage/whatsapp.svg"}
                alt={__("whatsapp")}
              />
              <img
                className={classNames(
                  styles.presentation__image,
                  styles.image_4_skype
                )}
                src={imageSrc + "assets/StartPage/skype.svg"}
                alt={__("skype")}
              />
            </div>
          </section>
        </div>
      </div>
      <section className={styles.storage}>
        <h2 className={styles.storage_title}>{__("Хранилище")}</h2>
        <p className={styles.storage_subtitile}>
          {__(
            'Это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.'
          )}
        </p>
        <div className={styles.tariffs_list}>
          <Tariff name={"Free"} cost={0} currentPlan={true} promo={""} />
          <Tariff name={"Standart"} cost={30} currentPlan={false} promo={""} />
          <Tariff
            name={"Premium"}
            cost={100}
            discont={50}
            currentPlan={false}
            promo={__("Предложение дня")}
          />
          <Tariff
            name={__("Premium plus")}
            cost={120}
            currentPlan={false}
            promo={""}
          />
        </div>
      </section>
    </div>
  );
}

export default Main;

Main.propTypes = {
  scrollTop: PropTypes.func,
};
