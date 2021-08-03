import React from 'react';

import styles from './SideMenu.module.sass';
import { menu } from './listHelper';
import {useHistory, useLocation} from "react-router";
import {useSelector} from "react-redux";
import {themes} from "./themes";

const SideMenu = ({collapsed, setCollapsed}) => {

    const {pathname} = useLocation()
    const history = useHistory()

    const personalSettings = useSelector(state => state.main.personalSettings)
    const previewTheme = useSelector(state => state.main.previewTheme)

    const getThemeBg = () => {
        if (previewTheme) {
            return themes?.[previewTheme]
        }
        return themes?.[personalSettings?.theme]
    }

    const renderMenuItems = () => {
      return menu.map(item => {

          return <div
              className={`
                ${styles.menuItem} 
                ${pathname === item.path ? styles.menuItemChosen : undefined} 
                ${collapsed ? styles.menuItemCollapsed : undefined}
              `}
              key={item.name}
              onClick={() => history.push(item.path)}
          >
              <img
                  className={`${styles.icons} ${collapsed ? styles.iconsCollapsed : undefined}`}
                  src={item.src}
                  alt='icon'
              />
              <span className={collapsed ? styles.hidden : undefined}>{item.name}</span>
          </div>
      })
    };

    return(
        <aside
            className={collapsed ? styles.collapsed : styles.asideWrap}
            style={{
                background: getThemeBg()
            }}
        >
            <img className={collapsed ? styles.minIcon : styles.hubIcon} src={`./assets/PrivateCabinet/${collapsed ? '4Hub-min.svg' : '4HUB.svg'}`} alt='4HUB' />
            <div className={`${styles.titleWrap} ${collapsed ? styles.titleWrapCollapsed : undefined}`}>
                <span className={collapsed ? styles.hidden : undefined}>МЕНЮ</span>
                <img
                    className={`${styles.collapseButton} ${collapsed ? styles.collapseButtonInvert : undefined}`}
                    src='./assets/PrivateCabinet/signs-2.svg'
                    alt='play'
                    onClick={() => setCollapsed(!collapsed)}
                />
            </div>
            <div className={styles.menuItemsWrap}>
                {renderMenuItems()}
            </div>
        </aside>
    )
}

export default SideMenu;
