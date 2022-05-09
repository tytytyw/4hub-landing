import React from "react";

import styles from "./SearchList.module.sass";
import classnames from "classnames";
import { emptyProfileImage, getContactName } from "../../consts";
import PropTypes from "prop-types";
import { selectedItemProps } from "../../../../../../../types/Contacts";

const SearchList = ({ data, selectedItem, setSelectedItem }) => {
  return (
    <ul className={styles.menuList}>
      {data.map((item, index) => (
        <li
          onClick={() => setSelectedItem(item)}
          className={classnames({
            [styles.menuItem]: true,
            [styles.activeItem]: selectedItem?.id === item?.id
          })}
          key={index}
        >
          <span className={styles.icon}>
            <img src={item?.icon?.[0] || emptyProfileImage} alt={item.id} />
          </span>
          <p>{getContactName(item)}</p>
        </li>
      ))}
    </ul>
  );
};

export default SearchList;

SearchList.propTypes = {
  data: PropTypes.array,
  selectedItem: selectedItemProps,
  setSelectedItem: PropTypes.func
};
