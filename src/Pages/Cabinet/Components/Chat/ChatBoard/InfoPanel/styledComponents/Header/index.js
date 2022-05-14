import React from "react";
import styles from "./Header.module.sass";
import { ReactComponent as TriangleIcon } from "../../../../../../../../assets/PrivateCabinet/play-grey.svg";
import { ReactComponent as SearchIcon } from "../../../../../../../../assets/PrivateCabinet/search.svg";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { MAIN, DARK } from "../../../../../../../../generalComponents/globalVariables";

const Header = ({ setActiveOption, title }) => {
  const { __ } = useLocales();
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles.darkTheme]: chatTheme.name === DARK
      })}
    >
      <div className={styles.backButton} onClick={() => setActiveOption({ name: MAIN })}>
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
  setActiveOption: PropTypes.func,
  title: PropTypes.string
};
