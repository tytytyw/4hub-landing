import React from "react";

import styles from "./SafeItem.module.sass";
import classNames from "classnames";
import SafeIcon from "../SafeIcon";
import { imageSrc } from "../../../../../generalComponents/globalVariables";

const SafeItem = ({ safe, chosen, setMouseParams, onClick, listSize, setSelectedSafe }) => {
  return (
    <>
      <div
        className={classNames({
          [styles.wrapper]: true,
          [styles.wrapperChosen]: !!chosen,
          [styles?.[`wrapper_${listSize}`]]: true
        })}
      >
        <div
          className={styles.menuWrap}
          onClick={(e) => {
            setMouseParams({
              x: e.clientX,
              y: e.clientY,
              width: 200,
              height: 25
            });
            setSelectedSafe(safe);
          }}
        >
          <span className={styles.menu} />
        </div>

        <div className={styles.topPart}>
          <div className={styles.icons}>
            {safe?.id_emo && (
              <img
                className={styles.symbols}
                src={`${imageSrc}/assets/PrivateCabinet/smiles/${safe.id_emo}.svg`}
                alt="emoji"
              />
            )}

            {safe?.id_fig && (
              <img
                className={styles.symbols}
                src={`${imageSrc}/assets/PrivateCabinet/signs/${safe.id_fig}.svg`}
                alt="emoji"
              />
            )}
          </div>
        </div>

        <div onClick={onClick} className={styles.content}>
          <SafeIcon type={safe?.id_color} className={styles.safeImg} />

          <div
            className={classNames({
              [styles.tagBlock]: true,
              [styles.ftag]: !!safe?.tags
            })}
          >
            {safe?.tags && `#${safe.tags}`}
          </div>

          <p>{safe?.name}</p>
        </div>
      </div>
    </>
  );
};

export default SafeItem;
