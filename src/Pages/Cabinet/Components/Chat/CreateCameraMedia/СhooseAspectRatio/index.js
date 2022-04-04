import React from "react";
import PropTypes from "prop-types";
import styles from "./СhooseAspectRatio.module.sass";
import TextButton from "../../../../../../generalComponents/TextButton";
import { useLocales } from "react-localized";

const СhooseAspectRatio = ({ set, originalAspect, cancel }) => {
  const { __ } = useLocales();
  const values = [
    { label: __("Оригинал"), value: originalAspect },
    { label: __("Квадрат"), value: 1 },
    { label: "2:3", value: 2 / 3 },
    { label: "5:3", value: 5 / 3 },
    { label: "4:3", value: 4 / 3 },
    { label: "5:4", value: 5 / 4 },
    { label: "7:5", value: 7 / 5 },
    { label: "16:9", value: 16 / 9 }
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.valueItemsWrapper}>
        {values &&
          values.map(item => (
            <div
              className={styles.valueItem}
              key={item.label}
              onClick={() => set(item.value)}
            >
              {item.label}
            </div>
          ))}
      </div>
      <TextButton text={__("Отмена")} type="cancel" callback={cancel} />
    </div>
  );
};

export default СhooseAspectRatio;

СhooseAspectRatio.propTypes = {
  set: PropTypes.func.isRequired,
  originalAspect: PropTypes.number.isRequired,
  cancel: PropTypes.func.isRequired
};
