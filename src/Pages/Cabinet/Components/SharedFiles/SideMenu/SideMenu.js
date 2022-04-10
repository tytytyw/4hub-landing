import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SideMenu.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as SharedFilesIcon } from "../../../../../assets/PrivateCabinet/sharedFiles.svg";
import { ReactComponent as FolderIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import SideList from "../SideList/SideList";
import { useLocales } from "react-localized";
import { onGetSharedFiles } from "../../../../../Store/actions/CabinetActions";
import { SHARED_FILES } from "../../../../../generalComponents/globalVariables";

//TODO: заменить при получении сгрупированного на даты списка файлов
// import { months } from "../../../../../generalComponents/CalendarHelper";

const SideMenu = ({
  sideMenuCollapsed,
  setSideMenuCollapsed,
  sideMenuChosenItem,
  setSideMenuChosenItem
}) => {
  const { __ } = useLocales();
  const workElementsView = useSelector(state => state.Cabinet.view);
  const dispatch = useDispatch();

  return (
    <div
      className={classNames({
        [styles.sideMenu]: true,
        [styles.sideMenuCollapsed]: sideMenuCollapsed
      })}
    >
      <div className={styles.header}>
        <div className={styles.headerName}>
          <SharedFilesIcon id={styles.headerIcon} title="" />
          {sideMenuCollapsed ? null : <span>{__("Расшаренные файлы")}</span>}
        </div>
        <FolderIcon
          onClick={() => setSideMenuCollapsed(value => !value)}
          id={styles.headerArrow}
          title={sideMenuCollapsed ? __("развернуть") : __("свернуть")}
        />
      </div>

      <div className={styles.menu}>
        <div
          onClick={() => {
            dispatch(onGetSharedFiles(SHARED_FILES.FILES_USER_SHARED, ""));
            setSideMenuChosenItem(SHARED_FILES.FILES_USER_SHARED);
          }}
          className={classNames({
            [styles.menuItem]: true,
            [styles.active]:
              sideMenuChosenItem === SHARED_FILES.FILES_USER_SHARED
          })}
        >
          {!sideMenuCollapsed ? __("Файлы которые расшарил я") : __("Я")}
          <span className={styles.count}>({"0"})</span>
        </div>
        <div
          onClick={() => {
            dispatch(onGetSharedFiles(SHARED_FILES.FILES_SHARED_TO_USER, ""));
            setSideMenuChosenItem(SHARED_FILES.FILES_SHARED_TO_USER);
          }}
          className={classNames({
            [styles.menuItem]: true,
            [styles.active]:
              sideMenuChosenItem === SHARED_FILES.FILES_SHARED_TO_USER
          })}
        >
          {!sideMenuCollapsed ? __("Файлы расшаренные мне") : __("Мне")}
          <span className={styles.count}>({"0"})</span>
        </div>
        {workElementsView === "workLinesPreview" && (
          <SideList>
            {/* {month
							? renderFilesGroup(months()[month - 1].name, 0)
							: months().map((item, i) => renderFilesGroup(item.name, i))} */}
          </SideList>
        )}
      </div>
    </div>
  );
};

export default SideMenu;

SideMenu.propTypes = {
  sideMenuCollapsed: PropTypes.bool,
  setSideMenuCollapsed: PropTypes.func,
  sideMenuChosenItem: PropTypes.string,
  setSideMenuChosenItem: PropTypes.func
};
