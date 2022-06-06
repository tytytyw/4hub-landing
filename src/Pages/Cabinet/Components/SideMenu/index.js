import React from "react";
import "theme/theme.sass";
import styles from "./SideMenu.module.sass";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import { clearFileList, clearRecentFiles } from "../../../../Store/actions/CabinetActions";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import classNames from "classnames";

const SideMenu = ({ data, collapsed, setCollapsed }) => {
  const { __ } = useLocales();
  const { pathname } = useLocation();
  const history = useHistory();
  const { theme } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const renderMenuItems = () => {
    return data.map((item) => {
      return (
        <div
          className={classNames(styles.menuItem, `menuItem-${theme}`, {
            [styles.menuItemChosen]: pathname === item.path,
            [`menuItemChosen-${theme}`]: pathname === item.path,
            [styles.menuItemCollapsed]: collapsed
          })}
          key={item.name}
          onClick={() => {
            dispatch(clearFileList());
            dispatch(clearRecentFiles());
            setTimeout(() => {
              history.push(item.path);
            }, 0);
          }}
        >
          <img
            className={`${styles.icons} ${collapsed ? styles.iconsCollapsed : undefined}`}
            src={item.src}
            alt="icon"
          />
          <span className={collapsed ? styles.hidden : undefined}>{item.name}</span>
        </div>
      );
    });
  };

  return (
    <aside
      className={classNames(`linear-${theme}`, {
        [styles.collapsed]: collapsed,
        [styles.asideWrap]: !collapsed
      })}
    >
      <img
        className={collapsed ? styles.minIcon : styles.hubIcon}
        src={`${imageSrc}assets/PrivateCabinet/${collapsed ? "4Hub-min.svg" : "4HUB.svg"}`}
        alt="4HUB"
      />
      <div className={`${styles.titleWrap} ${collapsed ? styles.titleWrapCollapsed : undefined}`}>
        <span className={collapsed ? styles.hidden : undefined}>{__("МЕНЮ")}</span>
        <img
          className={`${styles.collapseButton} ${collapsed ? styles.collapseButtonInvert : undefined}`}
          src={`${imageSrc}assets/PrivateCabinet/signs-2.svg`}
          alt="play"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      <div className={styles.menuItemsWrap}>{renderMenuItems()}</div>
    </aside>
  );
};

export default SideMenu;

SideMenu.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      path: PropTypes.string,
      src: PropTypes.string
    })
  ),
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func
};

SideMenu.defaultTypes = {
  data: []
};
