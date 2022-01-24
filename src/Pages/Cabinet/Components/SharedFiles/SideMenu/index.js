import React from "react";
import styles from "./SideMenu.module.sass";

import classNames from "classnames";
import { ReactComponent as SharedFilesIcon } from "../../../../../assets/PrivateCabinet/sharedFiles.svg";
import { ReactComponent as FolderIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import { imageSrc } from "../../../../../generalComponents/globalVariables";

const SideMenu = ({
	sideMenuCollapsed,
	setSideMenuCollapsed,
	search,
	setSearch,
	sideMenuChosenItem,
	setSideMenuChosenItem,
    filesSharedMeCounter=0
}) => {
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
					{sideMenuCollapsed ? null : <span>Расшаренные файлы</span>}
				</div>
				<FolderIcon
					onClick={() => setSideMenuCollapsed((value) => !value)}
					id={styles.headerArrow}
					title={sideMenuCollapsed ? "развернуть" : "свернуть"}
				/>
			</div>

			{sideMenuCollapsed ? null : (
				<div className={styles.searchField}>
					<input
						placeholder="Введите имя файла"
						type="text"
						onChange={(e) => setSearch(e.target.value)}
						value={search}
					/>
					<img
						src={
							imageSrc +
							`assets/PrivateCabinet/${
								search ? "garbage.svg" : "magnifying-glass-2.svg"
							}`
						}
						alt="search"
						className={styles.searchGlass}
						onClick={() => setSearch("")}
					/>
				</div>
			)}
			<div
				className={styles.menu}
				style={{
					height: `calc(100% - 90px - ${sideMenuCollapsed ? "0" : "60"}px)`,
				}}
			>
				<div
                    onClick={() => setSideMenuChosenItem('sharedI')}
					className={classNames({
						[styles.menuItem]: true,
						[styles.active]: sideMenuChosenItem === "sharedI",
					})}
				>
					{!sideMenuCollapsed ? "Файлы которые расшарил я" : "Я"}
					<span className={styles.count}>({0})</span>
				</div>
				<div
                    onClick={() => setSideMenuChosenItem('sharedMe')}
					className={classNames({
						[styles.menuItem]: true,
						[styles.active]: sideMenuChosenItem === "sharedMe",
					})}
				>
					{!sideMenuCollapsed ? "Файлы расшаренные мне" : "Мне"}
					<span className={styles.count}>({filesSharedMeCounter})</span>
				</div>
			</div>
		</div>
	);
};

export default SideMenu;
