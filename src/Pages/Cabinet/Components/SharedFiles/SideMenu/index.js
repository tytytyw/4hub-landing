import React from "react";
import { useSelector } from "react-redux";
import styles from "./SideMenu.module.sass";

import classNames from "classnames";
import { ReactComponent as SharedFilesIcon } from "../../../../../assets/PrivateCabinet/sharedFiles.svg";
import { ReactComponent as FolderIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import SideList from "../SideList";
import {useLocales} from "react-localized";

//TODO: заменить при получении сгрупированного на даты списка файлов
// import { months } from "../../../../../generalComponents/CalendarHelper";

const SideMenu = ({
	sideMenuCollapsed,
	setSideMenuCollapsed,
	sideMenuChosenItem,
	setSideMenuChosenItem,
	filesSharedMe,
	filesSharedI,
}) => {
	const { __ } = useLocales();
	const workElementsView = useSelector((state) => state.Cabinet.view);

	return (
		<div
			className={classNames({
				[styles.sideMenu]: true,
				[styles.sideMenuCollapsed]: sideMenuCollapsed,
			})}
		>
			<div className={styles.header}>
				<div className={styles.headerName}>
					<SharedFilesIcon id={styles.headerIcon} title="" />
					{sideMenuCollapsed ? null : <span>{ __('Расшаренные файлы') }</span>}
				</div>
				<FolderIcon
					onClick={() => setSideMenuCollapsed((value) => !value)}
					id={styles.headerArrow}
					title={sideMenuCollapsed ? __("развернуть") : __("свернуть")}
				/>
			</div>

			<div className={styles.menu}>
				<div
					onClick={() => setSideMenuChosenItem("sharedI")}
					className={classNames({
						[styles.menuItem]: true,
						[styles.active]: sideMenuChosenItem === "sharedI",
					})}
				>
					{!sideMenuCollapsed ? __("Файлы которые расшарил я") : __("Я")}
					<span className={styles.count}>
						({filesSharedI?.files?.length || "0"})
					</span>
				</div>
				<div
					onClick={() => setSideMenuChosenItem("sharedMe")}
					className={classNames({
						[styles.menuItem]: true,
						[styles.active]: sideMenuChosenItem === "sharedMe",
					})}
				>
					{!sideMenuCollapsed ? __("Файлы расшаренные мне") : __("Мне")}
					<span className={styles.count}>
						({filesSharedMe?.files?.length || "0"})
					</span>
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
