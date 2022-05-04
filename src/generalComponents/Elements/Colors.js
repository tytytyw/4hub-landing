import React from "react";

import styles from "./Colors.module.sass";
import { colors } from "../collections";
import { useLocales } from "react-localized";

const Colors = ({ color, setColor, title, editableClass }) => {
  const { __ } = useLocales();
  if (!title) {
    title = __("Выберите цвет");
  }

  const set = (el) => (color === el ? setColor("") : setColor(el));

  const renderColors = () => {
    return colors.map((el, i) => {
      return (
        <div
          className={`
                    ${styles.circleColorWrap} 
                    ${el.name === color.name ? styles.chosenColorWrap : ""}`}
          key={i}
        >
          <div
            className={styles.circleColor}
            style={{
              background: el.light,
              border: `1px solid ${el.dark}`,
              color: "black"
            }}
            onClick={() => set(el)}
          >
            {el.name === color.name && <span>&#10003;</span>}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={`${styles.colorWrap} ${editableClass ? styles[editableClass] : ""}`}>
      <span className={styles.title}>{title}</span>
      <div>{renderColors()}</div>
    </div>
  );
};

export default Colors;
