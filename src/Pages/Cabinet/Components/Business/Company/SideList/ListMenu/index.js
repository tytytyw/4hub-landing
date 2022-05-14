import React from "react";

import styles from "./ListMenu.module.sass";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import { pageProps } from "types/Business/Page";
import { dataProps } from "types/Business/Data";

const ListMenu = ({ menuData, page, setPage, setPageOption }) => {
  const renderItems = (data, isSub = false) => {
    return data.map((item) => (
      <ListItem
        page={page}
        setPage={setPage}
        key={item.name}
        item={item}
        isSub={isSub}
        render={renderItems}
        setPageOption={setPageOption}
      />
    ));
  };

  return <div className={styles.wrapper}>{renderItems(menuData)}</div>;
};

export default ListMenu;

ListMenu.propTypes = {
  menuData: dataProps,
  page: pageProps,
  setPage: PropTypes.func,
  setPageOption: PropTypes.func
};

ListMenu.defaultProps = {
  menuData: []
};
