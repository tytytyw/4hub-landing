import React from "react";

import styles from "./ContactMenu.module.sass";
import classNames from "classnames";
import PropTypes from "prop-types";

const ContactMenu = ({ data, pageOption }) => {
  return (
    <ul className={styles.menuList}>
      {data.map((item, index) => (
        <li
          onClick={() => item.onClick && item.onClick(item)}
          className={classNames({
            [styles.menuItem]: true,
            [styles.menuItemActive]: pageOption === item.id,
          })}
          key={index}
        >
          <span className={styles.icon}>
            <img src={item.icon} alt={item.id} />
          </span>
          <p>{item.label}</p>
        </li>
      ))}
    </ul>
  );
};

export default ContactMenu;

ContactMenu.propTypes = {
  data: PropTypes.array,
  pageOption: PropTypes.string,
};
