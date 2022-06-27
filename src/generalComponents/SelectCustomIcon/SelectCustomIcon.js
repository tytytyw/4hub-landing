import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocales } from "react-localized";
import classnames from "classnames";
import { imageSrc, LIBRARY_OWN_ICONS } from "generalComponents/globalVariables";
import { ReactComponent as PlayIcon } from "../../assets/PrivateCabinet/play-grey.svg";
import styles from "./SelectCustomIcon.module.sass";

const SelectCustomIcon = ({ icon, onChangeIcon }) => {
  const { __ } = useLocales();

  const [show, setShow] = useState(false);
  return (
    <div
      className={classnames({ [styles.select]: true, [styles.selectShow]: !show, [styles.selectHide]: show })}
      onClick={() => setShow((state) => !state)}
    >
      {icon ? (
        <img src={`${imageSrc}assets/PrivateCabinet/library/own/${icon}.svg`} alt="icon" />
      ) : (
        <span>{__("Выбирите иконку раздела")}</span>
      )}
      <PlayIcon className={classnames({ [styles.playButton]: true, [styles.playBattonShow]: show })} />
      <div
        className={classnames({
          [styles.optionsList]: true,
          [styles.optionsListHide]: !show,
          [styles.optionsListShow]: show
        })}
      >
        {LIBRARY_OWN_ICONS.map((i) => (
          <img
            key={i}
            src={`${imageSrc}assets/PrivateCabinet/library/own/${i}.svg`}
            alt="icon"
            className={styles.innerIcon}
            onClick={() => onChangeIcon(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectCustomIcon;

SelectCustomIcon.propTypes = {
  icon: PropTypes.string,
  onChangeIcon: PropTypes.func
};
