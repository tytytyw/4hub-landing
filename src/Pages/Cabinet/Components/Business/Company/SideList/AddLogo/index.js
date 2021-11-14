import React, { useState } from "react";
import styles from "./AddLogo.module.sass";
// import logoImg from "../../../../../../../assets/BusinessCabinet/logo.png";
import { ReactComponent as ArrowIcon } from "../../../../../../../assets/BusinessCabinet/SideList/arrow.svg";
import ContextMenu from "../../../../../../../generalComponents/ContextMenu";

const AddLogo = ({ mouseParams, setMouseParams, renderMenuItems, setAction, companyName, setCompanyName, companyLogo }) => {
	const [defaultTitle] = useState("Добавить лого компании")

	const contextMenuLogo = [
		{ name: "Загрузить Лого", img: "download-blue", type: "uploadLogo" },
		{ name: "Переименовать", img: "edit", type: "reName" },
	];

	const callbackArrMain = [
		{
			type: "uploadLogo",
			name: "Загрузить Лого",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
		{
			type: "reName",
			name: "Переименовать",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
	];

	return (
		<div className={styles.wrapper}>
			{companyLogo ? (
				<img className={styles.companyLogo} src={companyLogo.src} alt="Logo" />
			) : (
				<input type="text" placeholder={defaultTitle} value={companyName} className={styles.title} onChange={e => setCompanyName(e.target.value)} />
			)}
			<ArrowIcon
				className={styles.arrow}
				onClick={(e) => {
					setMouseParams({
						x: e.clientX,
						y: e.clientY,
						width: 158,
						height: 38,
					});
				}}
			/>
			{mouseParams !== null ? (
				<ContextMenu
					params={mouseParams}
					setParams={setMouseParams}
					tooltip={false}
				>
					<div className={styles.mainMenuItems}>
						{renderMenuItems(contextMenuLogo, callbackArrMain)}
					</div>
				</ContextMenu>
			) : null}
		</div>
	);
};

export default AddLogo;
