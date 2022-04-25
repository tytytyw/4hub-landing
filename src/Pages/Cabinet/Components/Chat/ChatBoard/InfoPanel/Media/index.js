import React, { useState } from "react";
import styles from "./Media.module.sass";
import Header from "../styledComponents/Header";
import SubOptionButton from "../styledComponents/SubOptionButton";
import { imageSrc } from "../../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const Media = ({ setOption }) => {
  const { __ } = useLocales();
  const [subOption, setSubOption] = useState("photo");
  const options = [
    { name: __("Фото"), id: "photo" },
    { name: __("Видео"), id: "video" },
    { name: __("Gif"), id: "gif" }
  ];

  //TODO: temp
  const images = [
    "0.png",
    "a.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "11.png",
    "a.png",
    "11.png",
    "8.png"
  ];

  const renderImages = images => {
    return images.map((src, i) => {
      return (
        <div className={styles.miniPictureWrap} key={i}>
          <img src={`${imageSrc}assets/temp/${src}`} alt="pic"></img>
        </div>
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <Header setOption={setOption} title={__("Мультимедиа")} />
      <div className={styles.subOptions}>
        {options.map(item => {
          return (
            <SubOptionButton
              name={item.name}
              id={item.id}
              key={item.id}
              subOption={subOption}
              setSubOption={setSubOption}
            />
          );
        })}
      </div>
      {subOption === "photo" ? (
        <div className={styles.content}>
          <div className={styles.groupByDate}>
            <h5 className={styles.dateTitle}>{__("Сегодня")}</h5>
            <div className={styles.picturesWrap}>{renderImages(images)}</div>
          </div>
          <div className={styles.groupByDate}>
            <h5 className={styles.dateTitle}>{__("04.11.2021")}</h5>
            <div className={styles.picturesWrap}>
              {renderImages([images[2], images[4]])}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Media;

Media.propTypes = {
  setOption: PropTypes.func.isRequired
};
