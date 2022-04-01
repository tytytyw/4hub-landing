import React from "react";
import styles from "./Header.module.sass";
import { ReactComponent as TriangleIcon } from "../../../../../../../../assets/PrivateCabinet/play-grey.svg";
import { ReactComponent as SearchIcon } from "../../../../../../../../assets/PrivateCabinet/search.svg";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const Header = ({ setOption, title }) => {
  const { __ } = useLocales();
  return (
    <div className={styles.wrapper}>
      <div className={styles.backButton} onClick={() => setOption("main")}>
        <TriangleIcon title="" className={styles.triangleIcon} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.searchBtn}>
        <SearchIcon title={__("")} className={styles.searchIcon} />
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  setOption: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};
