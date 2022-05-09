import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Media.module.sass";
import Header from "../styledComponents/Header";
import SubOptionButton from "../styledComponents/SubOptionButton";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const Media = ({ setActiveOption, activeOption }) => {
  const { __ } = useLocales();
  const [activeSubOption, setActiveSubOption] = useState(activeOption?.subOptions[0]);
  const files = useSelector((state) => state.Cabinet.chat.files);

  const renderImages = () => {
    const images = files?.image?.files ?? [];
    return images.map((img, i) => {
      return (
        <div className={styles.miniPictureWrap} key={i}>
          <img src={img.link} alt="pic"></img>
        </div>
      );
    });
  };

  const renderSubOptions = () => {
    if (!activeOption) return null;
    return activeOption?.subOptions?.map((subOption) => (
      <SubOptionButton
        key={subOption.id}
        subOption={subOption}
        activeSubOption={activeSubOption}
        setActiveSubOption={setActiveSubOption}
      />
    ));
  };

  return (
    <div className={styles.wrapper}>
      <Header setActiveOption={setActiveOption} title={activeOption?.title} />
      <div className={styles.subOptions}>{renderSubOptions()}</div>
      {activeSubOption?.id === "photo" ? (
        <div className={styles.content}>
          <div className={styles.groupByDate}>
            <h5 className={styles.dateTitle}>{__("Сегодня")}</h5>
            <div className={styles.picturesWrap}>{renderImages()}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Media;

Media.propTypes = {
  setActiveOption: PropTypes.func,
  activeOption: PropTypes.object
};
