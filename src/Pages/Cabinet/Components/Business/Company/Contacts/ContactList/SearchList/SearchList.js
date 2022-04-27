import React from "react";

import styles from "./SearchList.module.sass";
import classnames from "classnames";
import { ReactComponent as PointerMenuImg } from "../../../../../../../../assets/BusinessCabinet/pointer-menu.svg";
import { imageSrc } from "../../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { businessSelectedItem } from "../../../../../../../../types/Business/SelectedItem";

const SearchList = ({
  data,
  selectedItem,
  setSelectedItem,
  getContactName,
  setMouseParams
}) => {
  return (
    <ul className={styles.menuList}>
      {data.map((item, index) => (
        <li
          onClick={() => setSelectedItem(item)}
          className={classnames({
            [styles.menuItem]: true,
            [styles.activeItem]: selectedItem?.id === item?.id
          })}
          key={index}>
          <div className={styles.info}>
            <span className={styles.icon}>
              <img
                src={
                  item?.icon?.[0] ||
                  `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
                }
                alt={item.id}
              />
            </span>
            <p>{getContactName(item)}</p>
          </div>
          <PointerMenuImg
            className={styles.contextMenuIcon}
            onClick={e =>
              setMouseParams({
                x: e.clientX,
                y: e.clientY,
                width: 158,
                height: 38,
                type: "contextMenuContact"
              })
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default SearchList;

SearchList.propTypes = {
  data: PropTypes.array,
  selectedItem: businessSelectedItem,
  setSelectedItem: PropTypes.func,
  getContactName: PropTypes.func,
  setMouseParams: PropTypes.func
};
