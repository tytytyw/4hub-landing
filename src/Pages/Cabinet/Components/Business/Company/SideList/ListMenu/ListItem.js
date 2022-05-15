import React, { useState } from "react";

import styles from "./ListMenu.module.sass";
import { ReactComponent as ArrowIcon } from "../../../../../../../assets/BusinessCabinet/SideList/arrow.svg";
import classNames from "classnames";
import PropTypes from "prop-types";
import { itemProps } from "../../../../../../../types/Company";
import { pageProps } from "types/Business/Page";

const ListItem = ({ item, page, setPage, isSub, render }) => {
  const [collapse, setCollapse] = useState(false);
  const hasChild = item.children?.length;
  const onClickHandler = () => {
    setPage(item.name === "get_info" && !collapse ? item.children[0] : item);
    if (hasChild) setCollapse(!collapse);
  };
  return (
    <div className={styles.itemWrap}>
      <div
        onClick={onClickHandler}
        className={classNames({
          [styles.item]: true,
          [styles.active]: collapse,
          [styles.activePage]: page.name === item.name,
          [styles.itemSub]: isSub
        })}
      >
        <div className={styles.info}>
          <div className={styles.icon}>{item.icon}</div>
          <p className={styles.text}>{item.label}</p>
        </div>

        {hasChild && <ArrowIcon className={styles.arrow} />}
      </div>

      {hasChild && (
        <div
          className={classNames({
            [styles.subItems]: true,
            [styles.active]: collapse
          })}
        >
          {render(item.children, true)}
        </div>
      )}
    </div>
  );
};

export default ListItem;

ListItem.propTypes = {
  item: itemProps,
  page: pageProps,
  setPage: PropTypes.func,
  isSub: PropTypes.bool,
  render: PropTypes.func
};
